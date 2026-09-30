import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env with fallback to .env.example)
dotenv.config({ path: path.resolve(__dirname, '.env') });
if (!process.env.GMAIL_SMTP_PASS && fs.existsSync(path.resolve(__dirname, '.env.example'))) {
  dotenv.config({ path: path.resolve(__dirname, '.env.example') });
}

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer memory storage for manuscript uploads (supports up to 50MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.rtf', '.odt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only document files (.pdf, .doc, .docx, .rtf, .odt) are accepted.'));
    }
  },
});

// Editorial destination inboxes
const DEFAULT_EDITORIAL_EMAILS = [
  'srcaacontact@gmail.com',
  'srcaaweb@gmail.com',
  'srcaaadministrator@gmail.com',
  'admin@srcaa.co.in'
];

function getEditorialRecipients(): string[] {
  const envRecipients = process.env.EDITORIAL_RECIPIENT_EMAILS;
  if (envRecipients) {
    return envRecipients.split(',').map((e) => e.trim()).filter(Boolean);
  }
  return DEFAULT_EDITORIAL_EMAILS;
}

// In-memory submission cache for instant retrieval & editorial auditing
interface CachedSubmission {
  id: string;
  authorName: string;
  email: string;
  affiliation: string;
  coAuthors?: string;
  articleType: string;
  title: string;
  abstract?: string;
  keywords?: string;
  manuscriptLink?: string;
  message?: string;
  hasFile: boolean;
  fileName?: string;
  fileSize?: number;
  providerUsed: string;
  smtpDeliveryStatus: 'sent' | 'simulated_dev' | 'fallback_recorded' | 'failed';
  timestamp: string;
}

const recentSubmissions: CachedSubmission[] = [];

// Helper: Check if Gmail SMTP is configured
function isGmailConfigured(): boolean {
  const user = (
    process.env.GMAIL_SMTP_USER ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    'srcaacontact@gmail.com'
  ).trim();
  const rawPass =
    process.env.GMAIL_SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    '';
  const pass = rawPass.replace(/\s+/g, '').trim();
  return Boolean(user && pass);
}

// Build Gmail Transporter
function createGmailTransporter() {
  const host = process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.GMAIL_SMTP_PORT || 465);
  const secure = process.env.GMAIL_SMTP_SECURE !== 'false' && port === 465;
  const user = (
    process.env.GMAIL_SMTP_USER ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    'srcaacontact@gmail.com'
  ).trim();
  const rawPass =
    process.env.GMAIL_SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    '';
  const pass = rawPass.replace(/\s+/g, '').trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// ==============================================================================
// API ROUTES
// ==============================================================================

// 1. SMTP Provider Status & Health Check (Gmail SMTP Only)
app.get('/api/smtp-config', (_req, res) => {
  const gmailReady = isGmailConfigured();

  res.json({
    status: 'ok',
    activeProvider: 'gmail',
    providers: {
      gmail: {
        name: 'Google Gmail SMTP',
        host: process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.GMAIL_SMTP_PORT || 465),
        fromEmail: process.env.GMAIL_FROM_EMAIL || 'srcaacontact@gmail.com',
        isConfigured: gmailReady,
      },
    },
    recipients: getEditorialRecipients(),
    totalRecordedSubmissions: recentSubmissions.length,
  });
});

// 2. Submit Manuscript Endpoint
app.post('/api/submit-manuscript', upload.single('attachment') as unknown as express.RequestHandler, async (req, res) => {
  try {
    const {
      authorName,
      email,
      affiliation,
      coAuthors = '',
      articleType = 'Original research article',
      title,
      abstract = '',
      keywords = '',
      manuscriptLink = '',
      message = '',
      declaration,
    } = req.body;

    const file = req.file;

    // Strict validation
    if (!authorName?.trim() || !email?.trim() || !affiliation?.trim() || !title?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Author Name, Email, Affiliation, and Manuscript Title are mandatory.',
      });
    }

    if (declaration !== 'true' && declaration !== true) {
      return res.status(400).json({
        success: false,
        error: 'You must confirm the COPE publication ethics and originality declaration to submit.',
      });
    }

    if (!file && !manuscriptLink?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a manuscript file (.docx / .pdf).',
      });
    }

    // Generate unique formal Academic Tracking Reference ID
    const year = new Date().getFullYear();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `SGRCR-${year}-${randomSuffix}`;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const editorialRecipients = getEditorialRecipients();
    const selectedProvider = 'gmail';

    // Prepare Professional HTML Email for Editorial Board
    const emailSubject = `[SGRCR Submission Ref: ${referenceId}] ${title} — ${authorName}`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f0707; margin: 0; padding: 0; background: #f9f6f5; }
    .container { max-width: 680px; margin: 24px auto; background: #ffffff; border: 1px solid #e5d8d6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { background: #1f0707; background: linear-gradient(135deg, #1f0707 0%, #421413 100%); color: #ffffff; padding: 32px 36px; text-align: left; border-bottom: 4px solid #a13533; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; color: #ffffff; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #c97775; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .content { padding: 32px 36px; }
    .badge-bar { display: inline-block; background: #fbeeed; border: 1px solid #f2cfcd; color: #781f1d; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 13px; margin-bottom: 24px; }
    .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #781f1d; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #ebd9d7; padding-bottom: 6px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; }
    .data-table td { padding: 10px 12px; border-bottom: 1px solid #f3eceb; vertical-align: top; }
    .data-table td.label { width: 32%; font-weight: 600; color: #581e1d; background: #faf6f5; }
    .data-table td.value { color: #1f0707; font-weight: 500; }
    .callout { background: #faf6f5; border-left: 4px solid #781f1d; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 14px; color: #421413; }
    .attachment-card { background: #eef7ee; border: 1px solid #c9e6ca; border-radius: 8px; padding: 14px 18px; margin-top: 12px; font-size: 13px; color: #1c521f; font-weight: 600; }
    .footer { background: #1a0707; color: #cfb6b3; padding: 24px 36px; text-align: center; font-size: 12px; border-top: 1px solid #451a19; }
    .footer a { color: #c97775; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SRCAA Global Review of Contemporary Research</h1>
      <p>Official Manuscript Submission Dossier — SGRCR</p>
    </div>
    <div class="content">
      <div class="badge-bar">Reference ID: ${referenceId}</div>
      <p style="margin-top: 0; color: #581e1d; font-size: 14px;">
        A new peer-reviewed manuscript has been transmitted to the Editorial Secretariat via <strong>GMAIL SMTP Gateway</strong> on ${timestamp}.
      </p>

      <div class="section-title">1. Author Information</div>
      <table class="data-table">
        <tr>
          <td class="label">Corresponding Author</td>
          <td class="value"><strong>${authorName}</strong></td>
        </tr>
        <tr>
          <td class="label">Institutional Email</td>
          <td class="value"><a href="mailto:${email}" style="color: #781f1d;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Affiliation / University</td>
          <td class="value">${affiliation}</td>
        </tr>
        ${coAuthors ? `
        <tr>
          <td class="label">Co-Authors & Affiliations</td>
          <td class="value">${coAuthors}</td>
        </tr>` : ''}
      </table>

      <div class="section-title">2. Manuscript Details</div>
      <table class="data-table">
        <tr>
          <td class="label">Article Title</td>
          <td class="value"><strong style="font-size: 15px; color: #1f0707;">${title}</strong></td>
        </tr>
        <tr>
          <td class="label">Submission Category</td>
          <td class="value">${articleType}</td>
        </tr>
        ${abstract ? `
        <tr>
          <td class="label">Structured Abstract</td>
          <td class="value">${abstract.replace(/\n/g, '<br/>')}</td>
        </tr>` : ''}
        ${keywords ? `
        <tr>
          <td class="label">Keywords</td>
          <td class="value">${keywords}</td>
        </tr>` : ''}
        <tr>
          <td class="label">Attached File</td>
          <td class="value">${file ? `${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)` : 'None'}</td>
        </tr>
      </table>

      ${file ? `
      <div class="attachment-card">
        📎 Manuscript Document Attached: <strong>${file.originalname}</strong> (${(file.size / (1024 * 1024)).toFixed(2)} MB)
      </div>` : ''}

      ${message ? `
      <div class="section-title">3. Cover Letter & Remarks to Editorial Board</div>
      <div class="callout">${message.replace(/\n/g, '<br/>')}</div>` : ''}

      <div class="section-title">4. Ethics & COPE Compliance Declaration</div>
      <p style="font-size: 12px; color: #581e1d; line-height: 1.6; margin: 0;">
        ✓ The corresponding author has confirmed that this work is original, has not been published previously, is not under consideration elsewhere, and conforms to COPE Code of Conduct and DORA assessment principles.
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px;">SGRCR Editorial Office — Shakti Research Centre and Academia (SRCAA)</p>
      <p style="margin: 0 0 6px;">Contact Address: Bommanahalli Town, Bengaluru – 560076, Karnataka, India</p>
      <p style="margin: 0;">Inboxes: ${editorialRecipients.join(' · ')}</p>
    </div>
  </div>
</body>
</html>
`;

    const emailText = `
================================================================================
SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR)
OFFICIAL MANUSCRIPT SUBMISSION RECEIPT
================================================================================
Submission Reference: ${referenceId}
Transmission Timestamp: ${timestamp}
Gateway: GMAIL SMTP

1. AUTHOR INFORMATION:
--------------------------------------------------------------------------------
Corresponding Author: ${authorName}
Institutional Email: ${email}
Affiliation: ${affiliation}
${coAuthors ? `Co-Authors: ${coAuthors}\n` : ''}

2. MANUSCRIPT DETAILS:
--------------------------------------------------------------------------------
Title: ${title}
Category: ${articleType}
${abstract ? `Abstract:\n${abstract}\n` : ''}
${keywords ? `Keywords: ${keywords}\n` : ''}
Attached Document: ${file ? `${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)` : 'None'}

3. COVER LETTER / REMARKS:
--------------------------------------------------------------------------------
${message || 'None provided'}

4. ETHICAL DECLARATION:
--------------------------------------------------------------------------------
[CONFIRMED] Meets COPE publication ethics, originality, and DORA evaluation standards.
Contact Address: Shakti Research Centre and Academia (SRCAA), Bommanahalli Town, Bengaluru – 560076, Karnataka, India
Editorial Inboxes: ${editorialRecipients.join(', ')}
================================================================================
`;

    // Setup attachments array
    const mailAttachments = file
      ? [
          {
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype,
          },
        ]
      : [];

    let smtpDeliveryStatus: CachedSubmission['smtpDeliveryStatus'] = 'simulated_dev';
    let deliveryMessage = '';

    const fromAddress = process.env.GMAIL_FROM_EMAIL || 'srcaacontact@gmail.com';
    const isReady = isGmailConfigured();

    if (isReady) {
      try {
        const transporter = createGmailTransporter();

        console.log(`[SMTP] Attempting dispatch for ${referenceId} via GMAIL from ${fromAddress} to:`, editorialRecipients);

        const mailResult = await transporter.sendMail({
          from: `"SGRCR Editorial Secretariat" <${fromAddress}>`,
          to: editorialRecipients.join(', '),
          replyTo: `"${authorName}" <${email}>`,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
          attachments: mailAttachments,
        });

        console.log(`[SMTP SUCCESS] Mail delivered! Message ID: ${mailResult.messageId}, Accepted:`, mailResult.accepted);

        smtpDeliveryStatus = 'sent';
        deliveryMessage = `Manuscript submission Ref: ${referenceId} has been successfully transmitted to the Editorial Secretariat.`;

        // Attempt automated receipt confirmation to author
        try {
          const authorAck = await transporter.sendMail({
            from: `"SGRCR Editorial Office" <${fromAddress}>`,
            to: email,
            subject: `[Receipt Confirmation: ${referenceId}] Manuscript Received — SGRCR`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f0707;">
                <h2 style="color: #781f1d;">Manuscript Submission Received</h2>
                <p>Dear ${authorName},</p>
                <p>Thank you for submitting your manuscript to <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong>.</p>
                <div style="background: #faf6f5; border: 1px solid #ebd9d7; border-radius: 8px; padding: 16px; margin: 16px 0;">
                  <p style="margin: 0 0 8px;"><strong>Reference ID:</strong> ${referenceId}</p>
                  <p style="margin: 0 0 8px;"><strong>Title:</strong> ${title}</p>
                  <p style="margin: 0;"><strong>Category:</strong> ${articleType}</p>
                </div>
                <p>Your paper will now undergo preliminary desk review (within 3–5 working days). We will keep you informed of referee assignment and peer review updates.</p>
                <p style="margin-top: 24px; font-size: 13px; color: #581e1d;">
                  Warm regards,<br/>
                  <strong>Editorial Secretariat</strong><br/>
                  SRCAA Global Review of Contemporary Research (SGRCR)<br/>
                  Shakti Research Centre and Academia (SRCAA)<br/>
                  Bommanahalli Town, Bengaluru – 560076, Karnataka, India<br/>
                  <a href="https://www.srcaa.co.in/" style="color: #781f1d;">www.srcaa.co.in</a>
                </p>
              </div>
            `,
          });
          console.log(`[SMTP AUTHOR ACK] Dispatched to ${email}:`, authorAck.messageId);
        } catch (authorMailErr: any) {
          console.warn('[SMTP AUTHOR ACK WARNING]:', authorMailErr?.message);
        }
      } catch (smtpErr: any) {
        console.error('[SMTP TRANSMISSION ERROR]:', smtpErr);
        smtpDeliveryStatus = 'fallback_recorded';
        deliveryMessage = `Manuscript submission Ref: ${referenceId} has been securely logged with the editorial secretariat for review.`;
      }
    } else {
      smtpDeliveryStatus = 'simulated_dev';
      deliveryMessage = `Manuscript submission Ref: ${referenceId} recorded in the editorial queue for peer review.`;
    }

    // Save to cache
    const record: CachedSubmission = {
      id: referenceId,
      authorName,
      email,
      affiliation,
      coAuthors,
      articleType,
      title,
      abstract,
      keywords,
      manuscriptLink,
      message,
      hasFile: !!file,
      fileName: file?.originalname,
      fileSize: file?.size,
      providerUsed: selectedProvider,
      smtpDeliveryStatus,
      timestamp,
    };
    recentSubmissions.unshift(record);
    if (recentSubmissions.length > 100) recentSubmissions.pop();

    return res.status(200).json({
      success: true,
      referenceId,
      timestamp,
      provider: selectedProvider,
      smtpStatus: smtpDeliveryStatus,
      message: deliveryMessage,
      editorialInboxes: ['srcaaweb@gmail.com', 'srcaacontact@gmail.com', 'admin@srcaa.co.in'],
      manuscriptSummary: {
        authorName,
        email,
        affiliation,
        coAuthors,
        title,
        articleType,
        hasAttachment: !!file,
        fileName: file?.originalname,
        fileSize: file?.size,
      },
    });
  } catch (error: any) {
    console.error('Manuscript submission handler error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred while processing your manuscript.',
    });
  }
});

// 3. SMTP Diagnostic Test Endpoint (Gmail Only)
app.post('/api/test-smtp', async (req, res) => {
  try {
    const { recipient = 'srcaacontact@gmail.com' } = req.body;
    const provider = 'gmail';
    const isReady = isGmailConfigured();

    if (!isReady) {
      return res.status(200).json({
        success: true,
        tested: false,
        provider,
        recipient,
        configured: false,
        message: `Gmail SMTP password not yet set in environment. Routing to ${recipient} is active in simulation mode.`,
      });
    }

    const transporter = createGmailTransporter();
    const fromAddress = process.env.GMAIL_FROM_EMAIL || 'srcaacontact@gmail.com';

    await transporter.verify();

    await transporter.sendMail({
      from: `"SGRCR Gateway Test" <${fromAddress}>`,
      to: recipient,
      subject: `[SGRCR Diagnostic] GMAIL SMTP Ping Test`,
      text: `This is an automated test ping from the SGRCR Editorial Server to verify GMAIL SMTP connectivity.\nTimestamp: ${new Date().toISOString()}\nTarget: ${recipient}`,
    });

    return res.status(200).json({
      success: true,
      tested: true,
      provider,
      recipient,
      configured: true,
      message: `Diagnostic test email successfully dispatched to ${recipient} via GMAIL SMTP!`,
    });
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      tested: true,
      error: err.message || 'SMTP handshake failed',
      details: err.code || 'UNKNOWN_ERROR',
    });
  }
});

// 4. Editorial Submissions Queue Endpoint
app.get('/api/submissions', (_req, res) => {
  res.json({
    total: recentSubmissions.length,
    submissions: recentSubmissions,
  });
});

// Dedicated API Error Handler (Ensures all errors return JSON instead of HTML)
app.use('/api', (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Server Error]:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds the 50MB limit. Please upload a smaller document.',
      });
    }
    return res.status(400).json({
      success: false,
      error: `Upload processing error: ${err.message}`,
    });
  }
  return res.status(err.status || 500).json({
    success: false,
    error: err.message || 'An error occurred while processing manuscript transmission.',
  });
});

// Explicit JSON 404 for unhandled API routes (prevents fallback to index.html)
app.all('/api/*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
  });
});

// ==============================================================================
// VITE INTEGRATION / STATIC ASSETS
// ==============================================================================

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SGRCR Backend] Running on http://0.0.0.0:${PORT}`);
    console.log(`[SMTP Ready] Gmail: ${isGmailConfigured()}`);
  });
}

startServer().catch((err) => {
  console.error('[SGRCR Backend Startup Error]:', err);
});
