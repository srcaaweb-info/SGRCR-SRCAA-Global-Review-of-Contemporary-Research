/**
 * ==============================================================================
 * SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR) — GOOGLE APPS SCRIPT
 * PROJECT NAME: (SGRCR) submit form
 * ==============================================================================
 * This script runs in Google Apps Script (script.google.com).
 * It handles both:
 * 1. onFormSubmit(e) — Prevents the "Script function not found: onFormSubmit" error
 * 2. doPost(e) — Receives submissions directly from your GitHub live website,
 *    emails the editorial secretariat, and optionally saves to Google Drive/Sheets.
 * ==============================================================================
 */

// Editorial recipients who will receive manuscript submissions
var EDITORIAL_RECIPIENTS = [
  "admin@srcaa.co.in",
  "srcaacontact@gmail.com",
  "srcaaweb@gmail.com",
  "srcaaadministrator@gmail.com"
];

/**
 * 1. FIX FOR THE HOURLY TRIGGER ERROR:
 * This function satisfies the trigger that was failing in your screenshot.
 */
function onFormSubmit(e) {
  Logger.log("onFormSubmit trigger executed successfully at " + new Date().toISOString());
  if (e && e.values) {
    Logger.log("Form values: " + JSON.stringify(e.values));
  }
}

/**
 * 2. TEST FUNCTION (You can click 'Run' on this in Apps Script to verify permissions)
 */
function testMail() {
  var testEmail = EDITORIAL_RECIPIENTS[0];
  MailApp.sendEmail({
    to: testEmail,
    subject: "[SGRCR Test] Google Apps Script Gateway Verified",
    body: "This is a confirmation that your Google Apps Script (SGRCR) submit form is now active and working properly.\nTimestamp: " + new Date().toISOString()
  });
  Logger.log("Test email sent to " + testEmail);
}

/**
 * 3. WEB APP ENDPOINT FOR LIVE GITHUB WEBSITE:
 * When an author submits a manuscript on your GitHub Pages live site,
 * this function receives the data and dispatches the email to your Gmail.
 */
function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);

    var refId = data.submissionId || ("SGRCR-" + new Date().getFullYear() + "-" + Math.random().toString(36).substring(2, 7).toUpperCase());
    var authorName = data.authorName || "Anonymous Author";
    var email = data.email || "No email";
    var affiliation = data.affiliation || "Not provided";
    var coAuthors = data.coAuthors || "None";
    var articleType = data.articleType || "Original research article";
    var title = data.title || "Untitled Manuscript";
    var abstractText = data.abstract || "";
    var keywords = data.keywords || "";
    var message = data.message || "";
    var timestamp = data.submittedAt || data.timestamp || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // Build the formatted email
    var subject = "[SGRCR Submission Ref: " + refId + "] " + title + " — " + authorName;

    var emailBody = "====================================================================\n" +
      "SRCAA GLOBAL REVIEW OF CONTEMPORARY RESEARCH (SGRCR)\n" +
      "MANUSCRIPT SUBMISSION DOSSIER (LIVE WEB GATEWAY)\n" +
      "====================================================================\n\n" +
      "OFFICIAL REFERENCE ID: " + refId + "\n" +
      "SUBMISSION TIMESTAMP:  " + timestamp + " (IST)\n\n" +
      "AUTHOR INFORMATION:\n" +
      "• Corresponding Author: " + authorName + "\n" +
      "• Institutional Email:  " + email + "\n" +
      "• Affiliation:          " + affiliation + "\n" +
      "• Co-Author(s):         " + coAuthors + "\n\n" +
      "MANUSCRIPT DETAILS:\n" +
      "• Category:             " + articleType + "\n" +
      "• Article Title:        " + title + "\n" +
      "• Keywords:             " + keywords + "\n\n" +
      "ABSTRACT:\n" + abstractText + "\n\n" +
      "COVER LETTER / REMARKS:\n" + message + "\n\n" +
      "====================================================================\n" +
      "Forwarded automatically by SGRCR Google Apps Script Gateway.\n";

    var mailOptions = {
      to: EDITORIAL_RECIPIENTS.join(", "),
      replyTo: email,
      subject: subject,
      body: emailBody
    };

    // If an attached file was sent as Base64, convert and attach to the email
    if (data.fileData && data.fileData.base64) {
      try {
        var decoded = Utilities.base64Decode(data.fileData.base64);
        var blob = Utilities.newBlob(decoded, data.fileData.type || "application/pdf", data.fileData.name || "manuscript.pdf");
        mailOptions.attachments = [blob];
      } catch (fileErr) {
        Logger.log("Could not attach file: " + fileErr.toString());
      }
    }

    // Send email using official Google MailApp (Free, no activation needed)
    MailApp.sendEmail(mailOptions);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      referenceId: refId,
      message: "Manuscript successfully delivered to editorial inbox via Google Apps Script.",
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error processing doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 4. GET HEALTH CHECK (Allows testing in browser)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "SGRCR Editorial Submission Gateway (Google Apps Script)",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
