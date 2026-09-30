import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { recipient = 'srcaacontact@gmail.com' } = req.body || {};
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
    const isReady = Boolean(user && pass);

    if (!isReady) {
      return res.status(200).json({
        success: false,
        tested: false,
        provider: 'gmail',
        recipient,
        configured: false,
        message:
          'GMAIL_SMTP_PASS is not set in environment variables yet. In Vercel Dashboard -> Settings -> Environment Variables, add GMAIL_SMTP_USER=srcaacontact@gmail.com and GMAIL_SMTP_PASS=<16-digit Google App Password> and redeploy.',
      });
    }

    const host = process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.GMAIL_SMTP_PORT || 465);
    const secure = process.env.GMAIL_SMTP_SECURE !== 'false' && port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"SGRCR Gateway Test" <${process.env.GMAIL_FROM_EMAIL || user}>`,
      to: recipient,
      subject: `[SGRCR Live Diagnostic] GMAIL SMTP Ping Verified`,
      text: `This is an automated test email from the SGRCR Editorial Server verifying live GMAIL SMTP connectivity.\nTimestamp: ${new Date().toISOString()}\nTarget: ${recipient}`,
    });

    return res.status(200).json({
      success: true,
      tested: true,
      provider: 'gmail',
      recipient,
      configured: true,
      message: `Live diagnostic email successfully delivered to ${recipient} via GMAIL SMTP!`,
    });
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      tested: true,
      error: err.message || 'SMTP handshake failed',
      message: `Gmail SMTP error: ${err.message || 'Handshake failed'}. Please verify your 16-character Google App Password in GMAIL_SMTP_PASS.`,
      details: err.code || 'UNKNOWN_ERROR',
    });
  }
}
