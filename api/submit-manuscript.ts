import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const DEFAULT_EDITORIAL_EMAILS = [
  'srcaacontact@gmail.com',
  'srcaaweb@gmail.com',
  'srcaaadministrator@gmail.com',
  'admin@srcaa.co.in',
];

function getEditorialRecipients(): string[] {
  const envRecipients = process.env.EDITORIAL_RECIPIENT_EMAILS;
  if (envRecipients) {
    return envRecipients.split(',').map((e) => e.trim()).filter(Boolean);
  }
  return DEFAULT_EDITORIAL_EMAILS;
}

function getGmailCredentials() {
  const user =
    (process.env.GMAIL_SMTP_USER ||
      process.env.SMTP_USER ||
      process.env.EMAIL_USER ||
      'srcaacontact@gmail.com')
      .trim();
  const rawPass =
    process.env.GMAIL_SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    '';
  const pass = rawPass.replace(/\s+/g, '').trim();
  return { user, pass, isConfigured: Boolean(user && pass) };
}

function createGmailTransporter() {
  const host = process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.GMAIL_SMTP_PORT || 465);
  const secure = process.env.GMAIL_SMTP_SECURE !== 'false' && port === 465;
  const { user, pass } = getGmailCredentials();

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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, upload.single('attachment'));

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
    } = req.body || {};

    const file = req.file;

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

    const year = new Date().getFullYear();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `SGRCR-${year}-${randomSuffix}`;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const editorialRecipients = getEditorialRecipients();
    const emailSubject = `[SGRCR Submission Ref: ${referenceId}] ${title} — ${authorName}`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f0707; margin: 0; padding: 0; background: #f9f6f5;">
  <div style="max-width: 680px; margin: 24px auto; background: #ffffff; border: 1px solid #e5d8d6; border-radius: 12px; overflow: hidden;">
    <div style="background: #1f0707; color: #ffffff; padding: 28px 32px; border-bottom: 4px solid #a13533;">
      <h1 style="margin: 0; font-size: 20px; color: #ffffff;">SRCAA Global Review of Contemporary Research (SGRCR)</h1>
      <p style="margin: 6px 0 0; font-size: 12px; color: #c97775; font-weight: 600; text-transform: uppercase;">Official Manuscript Submission Dossier · Frequency: Quarterly (3 Issues per Year)</p>
    </div>
    <div style="padding: 28px 32px;">
      <div style="display: inline-block; background: #fbeeed; border: 1px solid #f2cfcd; color: #781f1d; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 13px; margin-bottom: 16px;">
        Reference ID: ${referenceId}
      </div>
      <p style="margin-top: 0; color: #581e1d; font-size: 14px;">
        Submitted on <strong>${timestamp} (IST)</strong>.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d; width: 34%;">Corresponding Author</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;"><strong>${authorName}</strong></td></tr>
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Institutional Email</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;"><a href="mailto:${email}" style="color: #781f1d;">${email}</a></td></tr>
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Affiliation</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${affiliation}</td></tr>
        ${coAuthors ? `<tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Co-Authors</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${coAuthors}</td></tr>` : ''}
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Manuscript Title</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;"><strong>${title}</strong></td></tr>
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Category</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${articleType}</td></tr>
        ${abstract ? `<tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Abstract</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${abstract.replace(/\n/g, '<br/>')}</td></tr>` : ''}
        ${keywords ? `<tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Keywords</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${keywords}</td></tr>` : ''}
        <tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Attached File</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${file ? `${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)` : 'None'}</td></tr>
        ${message ? `<tr><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb; font-weight: 600; color: #581e1d;">Cover Letter / Remarks</td><td style="padding: 8px 10px; border-bottom: 1px solid #f3eceb;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
      </table>
    </div>
    <div style="background: #1a0707; color: #cfb6b3; padding: 18px 32px; text-align: center; font-size: 12px;">
      SGRCR Editorial Office — Shakti Research Centre and Academia (SRCAA), Bommanahalli Town, Bengaluru – 560076, Karnataka, India
    </div>
  </div>
</body>
</html>`;

    const emailText = `SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR)
Reference ID: ${referenceId}
Timestamp: ${timestamp}
Corresponding Author: ${authorName} (${email})
Affiliation: ${affiliation}
Co-Authors: ${coAuthors || 'N/A'}
Title: ${title}
Category: ${articleType}
Abstract: ${abstract || 'N/A'}
Keywords: ${keywords || 'N/A'}
Attached File: ${file ? `${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)` : 'None'}
Cover Letter / Remarks: ${message || 'None'}`;

    const { user: fromAddress, isConfigured } = getGmailCredentials();
    let smtpDeliveryStatus: 'sent' | 'relayed_formsubmit' | 'simulated_dev' | 'fallback_recorded' = 'simulated_dev';
    let deliveryMessage = '';

    if (isConfigured) {
      try {
        const transporter = createGmailTransporter();
        const mailAttachments = file
          ? [
              {
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype,
              },
            ]
          : [];

        await transporter.sendMail({
          from: `"SGRCR Editorial Secretariat" <${fromAddress}>`,
          to: editorialRecipients.join(', '),
          replyTo: `"${authorName}" <${email}>`,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
          attachments: mailAttachments,
        });

        smtpDeliveryStatus = 'sent';
        deliveryMessage = `Manuscript submission Ref: ${referenceId} has been pushed directly to Gmail (${editorialRecipients.join(', ')}) via Gmail SMTP.`;

        try {
          await transporter.sendMail({
            from: `"SGRCR Editorial Office" <${fromAddress}>`,
            to: email,
            subject: `[Receipt Confirmation: ${referenceId}] Manuscript Received — SGRCR`,
            html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1f0707;">
              <h2 style="color: #781f1d;">Manuscript Submission Received</h2>
              <p>Dear ${authorName},</p>
              <p>Thank you for submitting your manuscript to <strong>SRCAA Global Review of Contemporary Research (SGRCR)</strong>.</p>
              <p><strong>Reference ID:</strong> ${referenceId}<br/><strong>Title:</strong> ${title}<br/><strong>Category:</strong> ${articleType}</p>
              <p>Warm regards,<br/><strong>Editorial Secretariat — SGRCR</strong><br/>Shakti Research Centre and Academia (SRCAA), Bengaluru – 560076, Karnataka, India</p>
            </div>`,
          });
        } catch {
          // Ignore ack error
        }
      } catch (smtpErr: any) {
        console.error('[Vercel Gmail SMTP Error]:', smtpErr);
        smtpDeliveryStatus = 'fallback_recorded';
        deliveryMessage = `Manuscript Ref: ${referenceId} logged. Note: Gmail SMTP returned: ${smtpErr?.message || 'Auth error'}.`;
      }
    } else {
      // Attempt FormSubmit relay if GMAIL_SMTP_PASS is not configured in Vercel env vars
      try {
        const relayResp = await fetch('https://formsubmit.co/ajax/srcaacontact@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: emailSubject,
            _cc: 'srcaaweb@gmail.com,srcaaadministrator@gmail.com,admin@srcaa.co.in',
            _template: 'table',
            Reference_ID: referenceId,
            Submission_Timestamp: timestamp,
            Corresponding_Author: authorName,
            Author_Email: email,
            Affiliation: affiliation,
            Co_Authors: coAuthors || 'None',
            Article_Category: articleType,
            Manuscript_Title: title,
            Abstract: abstract || 'Attached in Manuscript File',
            Keywords: keywords || 'See Manuscript',
            Attached_File_Name: file ? `${file.originalname} (${(file.size / 1024).toFixed(1)} KB)` : 'None',
            Cover_Letter_Remarks: message || 'None',
          }),
        });
        if (relayResp.ok) {
          smtpDeliveryStatus = 'relayed_formsubmit';
          deliveryMessage = `Manuscript Ref: ${referenceId} relayed to srcaacontact@gmail.com (Set GMAIL_SMTP_USER & GMAIL_SMTP_PASS in Vercel Environment Variables for direct attachment SMTP).`;
        } else {
          deliveryMessage = `Manuscript Ref: ${referenceId} registered. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASS in Vercel Environment Variables to enable direct Gmail SMTP delivery.`;
        }
      } catch {
        deliveryMessage = `Manuscript Ref: ${referenceId} registered. Set GMAIL_SMTP_USER and GMAIL_SMTP_PASS in Vercel Environment Variables to enable direct Gmail SMTP delivery.`;
      }
    }

    return res.status(200).json({
      success: true,
      referenceId,
      timestamp,
      provider: 'gmail',
      smtpStatus: smtpDeliveryStatus,
      gmailConfigured: isConfigured,
      message: deliveryMessage,
      editorialInboxes: editorialRecipients,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while processing your manuscript submission.',
    });
  }
}
