import nodemailer from 'nodemailer';

export interface LeadNotificationPayload {
  name: string;
  email: string;
  phone?: string;
  serviceNeeded: string;
  monthlyBudget?: string;
  websiteUrl?: string;
  message: string;
}

export const sendLeadNotification = async (leadData: LeadNotificationPayload): Promise<boolean> => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log('ℹ️ SMTP credentials not configured. Lead logged safely:');
    console.log(`📩 [NEW LEAD ALERT] ${leadData.name} (${leadData.email}) - Service: ${leadData.serviceNeeded}`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user, pass },
    });

    const recipient = process.env.NOTIFICATION_EMAIL_TO || 'alex@apexconsulting.com';

    await transporter.sendMail({
      from: `"Lead Alert System" <${user}>`,
      to: recipient,
      subject: `🔥 New Lead Received: ${leadData.name} (${leadData.serviceNeeded})`,
      html: `
        <h2>New High-Intent Client Inquiry</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
        <p><strong>Phone:</strong> ${leadData.phone || 'N/A'}</p>
        <p><strong>Website:</strong> ${leadData.websiteUrl || 'N/A'}</p>
        <p><strong>Service Needed:</strong> ${leadData.serviceNeeded}</p>
        <p><strong>Budget:</strong> ${leadData.monthlyBudget || 'Unspecified'}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${leadData.message}</blockquote>
        <br/>
        <p>View all leads in your <a href="/admin/leads">Admin Dashboard</a>.</p>
      `,
    });

    console.log('✅ Lead alert email sent successfully to', recipient);
    return true;
  } catch (error) {
    console.error('⚠️ Failed to send email alert:', error);
    return false;
  }
};
