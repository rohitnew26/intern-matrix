const ADMIN_EMAIL = 'update@internmatrix.com';
const DEFAULT_UPI = '9288075422@yescred';

function doGet(e) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('DevSkills-Certificates');
  
  // If not found, try the first sheet
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
  }
  
  if (!sheet) {
    const allSheets = spreadsheet.getSheets().map(s => s.getName());
    return buildResponse({
      verified: false,
      message: 'Sheet not found',
      availableSheets: allSheets
    });
  }
  
  const srno = e.parameter.srno;
  const dob = e.parameter.dob;
  
  if (!srno || !dob) {
    return buildResponse({
      verified: false,
      message: 'Missing parameters'
    });
  }
  
  // Get all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // Skip header row and search for matching certificate
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const sheetSrNo = row[0] ? row[0].toString().trim().toUpperCase() : '';
    const sheetDOB = row[2] ? formatDate(row[2]) : '';
    
    // Debug logging (will appear in Apps Script logs)
    Logger.log('Comparing - Sheet SrNo: ' + sheetSrNo + ' | Input SrNo: ' + srno.toUpperCase());
    Logger.log('Comparing - Sheet DOB: ' + sheetDOB + ' | Input DOB: ' + dob);
    
    // Compare SrNo and DOB
    if (sheetSrNo === srno.toUpperCase() && sheetDOB === dob) {
      return buildResponse({
        verified: true,
        name: row[1] || '',
        position: row[3] || '',
        status: row[4] || 'Active',
        issueDate: sheetDOB
      });
    }
  }
  
  // No match found - return debug info
  return buildResponse({
    verified: false,
    message: 'Certificate not found or DOB mismatch',
    debug: {
      receivedSrNo: srno,
      receivedDOB: dob,
      totalRows: data.length - 1
    }
  });
}

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);
    const action = (payload.action || (e.parameter && e.parameter.action)) || '';

    if (action === 'enrollment_notification') {
      return handleEnrollmentNotification(payload);
    }

    return buildResponse({ success: false, message: 'Unsupported action' });
  } catch (error) {
    Logger.log('doPost error: ' + error);
    return buildResponse({ success: false, message: error.message || 'Unknown error' });
  }
}

function handleEnrollmentNotification(payload) {
  const adminEmail = payload.admin_email || ADMIN_EMAIL;
  const learnerName = payload.learnerName || payload.fullName || 'Learner';
  const learnerEmail = payload.learnerEmail || payload.email || 'Not provided';
  const learnerPhone = payload.learnerPhone || payload.phone || 'Not provided';
  const college = payload.collegeName || 'Not provided';
  const courseTitle = payload.courseTitle || 'Course';
  const courseSlug = payload.courseSlug || '';
  const amountDisplay = payload.amountDisplay || payload.amount || 'N/A';
  const invoiceNumber = payload.invoiceNumber || ('INV-' + new Date().getTime());
  const startDate = payload.joiningDateReadable || payload.joiningDate || 'Not provided';
  const paymentNotes = payload.paymentInstructions || ('UPI ' + DEFAULT_UPI);
  const submissionTime = payload.submittedAt || new Date().toISOString();
  const enrollmentId = payload.enrollmentId || 'Not persisted yet';
  const userId = payload.userId || 'anonymous';

  const subject = `[Enrollment] ${courseTitle} - ${learnerName} - ${invoiceNumber}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New enrollment initiated</h2>
      <p>The learner clicked enroll and submitted payment details.</p>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Learner</strong></td><td>${learnerName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${learnerEmail}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${learnerPhone}</td></tr>
        <tr><td><strong>College / Org</strong></td><td>${college}</td></tr>
        <tr><td><strong>Course</strong></td><td>${courseTitle}</td></tr>
        <tr><td><strong>Course Slug</strong></td><td>${courseSlug}</td></tr>
        <tr><td><strong>Invoice #</strong></td><td>${invoiceNumber}</td></tr>
        <tr><td><strong>Amount</strong></td><td>${amountDisplay}</td></tr>
        <tr><td><strong>Requested Start Date</strong></td><td>${startDate}</td></tr>
        <tr><td><strong>Enrollment ID</strong></td><td>${enrollmentId}</td></tr>
        <tr><td><strong>User ID</strong></td><td>${userId}</td></tr>
        <tr><td><strong>Payment Instructions</strong></td><td>${paymentNotes}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${submissionTime}</td></tr>
      </table>
    </div>
  `;

  const invoiceHtml = buildInvoiceHtml({
    invoiceNumber,
    learnerName,
    learnerEmail,
    learnerPhone,
    college,
    courseTitle,
    courseSlug,
    amountDisplay,
    startDate,
    paymentNotes,
    submissionTime,
  });

  const pdfBlob = Utilities.newBlob(invoiceHtml, 'text/html', `${invoiceNumber}.html`).getAs('application/pdf');
  pdfBlob.setName(`${invoiceNumber}.pdf`);

  const mailOptions = {
    to: adminEmail,
    subject: subject,
    htmlBody,
    name: 'InternMatrix Enrollment Bot',
    replyTo: learnerEmail !== 'Not provided' ? learnerEmail : undefined,
    attachments: [pdfBlob],
  };

  if (learnerEmail && learnerEmail !== 'Not provided') {
    mailOptions.cc = learnerEmail;
  }

  MailApp.sendEmail(mailOptions);

  return buildResponse({ success: true, message: 'Enrollment notification sent.' });
}

// Helper function to format date as MM/DD/YYYY
function formatDate(dateValue) {
  if (!dateValue) return '';
  
  let date;
  if (dateValue instanceof Date) {
    date = dateValue;
  } else if (typeof dateValue === 'string') {
    date = new Date(dateValue);
  } else {
    return '';
  }
  
  if (isNaN(date.getTime())) return '';
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
}   

function buildResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function buildInvoiceHtml(data) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #111; }
          .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; max-width: 540px; }
          .meta { font-size: 13px; color: #6b7280; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          td { padding: 6px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
          td:first-child { color: #6b7280; width: 45%; }
          h1 { font-size: 20px; margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Invoice ${data.invoiceNumber}</h1>
          <p class="meta">Generated ${data.submissionTime}</p>
          <table>
            <tr><td>Learner</td><td>${data.learnerName}</td></tr>
            <tr><td>Email</td><td>${data.learnerEmail}</td></tr>
            <tr><td>Phone</td><td>${data.learnerPhone}</td></tr>
            <tr><td>College / Org</td><td>${data.college}</td></tr>
            <tr><td>Course</td><td>${data.courseTitle}</td></tr>
            <tr><td>Slug</td><td>${data.courseSlug}</td></tr>
            <tr><td>Amount</td><td>${data.amountDisplay}</td></tr>
            <tr><td>Requested Start</td><td>${data.startDate}</td></tr>
            <tr><td>Payment Method</td><td>${data.paymentNotes}</td></tr>
          </table>
        </div>
      </body>
    </html>
  `;
}
