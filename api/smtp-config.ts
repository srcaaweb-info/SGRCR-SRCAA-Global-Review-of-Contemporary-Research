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

export default function handler(_req: any, res: any) {
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
  const gmailReady = Boolean(user && pass);

  res.status(200).json({
    status: 'ok',
    activeProvider: 'gmail',
    providers: {
      gmail: {
        name: 'Google Gmail SMTP',
        host: process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.GMAIL_SMTP_PORT || 465),
        fromEmail: process.env.GMAIL_FROM_EMAIL || user || 'srcaacontact@gmail.com',
        isConfigured: gmailReady,
      },
    },
    recipients: getEditorialRecipients(),
    totalRecordedSubmissions: 0,
  });
}
