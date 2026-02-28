// Email service utility for SilverCare Connect
// This simulates email functionality in the browser environment
// In production, replace with actual email service API calls (SendGrid, Resend, etc.)
// Note: Removed process.env dependency for browser compatibility

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface BookingNotificationData {
  userEmail: string
  userName: string
  lovedOneName: string
  lovedOneLocation: string
  date: string
  time: string
  additionalNotes?: string
  adminEmail: string
}

class EmailService {
  private readonly apiKey: string = 'demo-key' // In production, this would be configured server-side
  private readonly fromEmail: string = 'noreply@silvercaretech.com'

  // Simulate sending email (replace with actual email service in production)
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate input data
      if (!emailData.to || !emailData.subject) {
        throw new Error('Email validation failed: Missing required fields (to, subject)')
      }

      console.log('📧 Email Service - Sending email:', {
        to: emailData.to,
        subject: emailData.subject,
        preview: emailData.text?.substring(0, 100) + '...'
      })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In production, replace this with actual email service API call:
      /*
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: emailData.to }],
            subject: emailData.subject
          }],
          from: { email: this.fromEmail, name: 'SilverCare Connect' },
          content: [
            { type: 'text/plain', value: emailData.text || '' },
            { type: 'text/html', value: emailData.html }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`Email service error: ${response.status}`)
      }
      */

      return { success: true }
    } catch (error) {
      console.error('Email service error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown email error' 
      }
    }
  }

  // Send booking confirmation to admin
  async sendBookingNotificationToAdmin(data: BookingNotificationData): Promise<{ success: boolean; error?: string }> {
    const subject = `New Booking Request - ${data.lovedOneName}`
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Booking Request</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a90e2, #357abd); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f8faff; padding: 30px; border-radius: 0 0 12px 12px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .detail-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: 600; color: #4a90e2; display: inline-block; width: 140px; }
          .value { color: #333; }
          .cta-button { background: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🤍 New Connection Request</h1>
          <p>SilverCare Connect - Connecting Generations</p>
        </div>
        
        <div class="content">
          <p>Hello SilverCare Admin,</p>
          
          <p>A new booking request has been submitted and requires your review:</p>
          
          <div class="booking-details">
            <h3>📅 Appointment Details</h3>
            <div class="detail-row">
              <span class="label">Date & Time:</span>
              <span class="value">${data.date} at ${data.time}</span>
            </div>
            <div class="detail-row">
              <span class="label">Loved One:</span>
              <span class="value">${data.lovedOneName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Location:</span>
              <span class="value">${data.lovedOneLocation}</span>
            </div>
            
            <h3 style="margin-top: 25px;">👤 Contact Information</h3>
            <div class="detail-row">
              <span class="label">Family Member:</span>
              <span class="value">${data.userName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${data.userEmail}</span>
            </div>
            
            ${data.additionalNotes ? `
            <h3 style="margin-top: 25px;">📝 Additional Notes</h3>
            <div class="detail-row">
              <span class="value">${data.additionalNotes}</span>
            </div>
            ` : ''}
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Log into the admin dashboard to review and approve this booking</li>
            <li>Contact ${data.userName} at ${data.userEmail} if you need additional information</li>
            <li>Coordinate technical setup with the care facility</li>
          </ul>
          
          <p>Please review this request promptly to confirm the connection time.</p>
          
          <div class="footer">
            <p>This email was automatically generated by SilverCare Connect.</p>
            <p>© 2024 SilverCare Connect - Connecting Generations, One Call at a Time</p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
New Booking Request - ${data.lovedOneName}

Appointment Details:
- Date & Time: ${data.date} at ${data.time}
- Loved One: ${data.lovedOneName}
- Location: ${data.lovedOneLocation}

Contact Information:
- Family Member: ${data.userName}
- Email: ${data.userEmail}

${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}` : ''}

Please review this request in the admin dashboard and contact the family member to confirm the connection time.

SilverCare Connect - Connecting Generations, One Call at a Time
    `

    return this.sendEmail({
      to: data.adminEmail,
      subject,
      html,
      text
    })
  }

  // Send booking confirmation to user
  async sendBookingConfirmationToUser(data: BookingNotificationData): Promise<{ success: boolean; error?: string }> {
    const subject = `Booking Confirmation - ${data.lovedOneName}`
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4a90e2, #357abd); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f8faff; padding: 30px; border-radius: 0 0 12px 12px; }
          .booking-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .highlight { background: #e8f2ff; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #4a90e2; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🤍 Booking Confirmed!</h1>
          <p>SilverCare Connect - Connecting Generations</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.userName},</p>
          
          <p>Thank you for choosing SilverCare Connect! Your connection request for <strong>${data.lovedOneName}</strong> has been received and will be reviewed shortly.</p>
          
          <div class="booking-summary">
            <h3>📅 Your Appointment</h3>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Location:</strong> ${data.lovedOneLocation}</p>
          </div>
          
          <div class="highlight">
            <h4>🛠️ What Happens Next?</h4>
            <p>Our team will contact you within 24 hours to:</p>
            <ul>
              <li>Confirm your appointment time</li>
              <li>Coordinate technical setup with the care facility</li>
              <li>Provide connection instructions</li>
            </ul>
          </div>
          
          <p><strong>Remember:</strong> We handle all the technology setup - your loved one just needs to bring their beautiful smile! 😊</p>
          
          <p>If you have any questions, please don't hesitate to reach out to us.</p>
          
          <p>Thank you for trusting us to help connect your family.</p>
          
          <p>Warm regards,<br>The SilverCare Connect Team</p>
          
          <div class="footer">
            <p>© 2024 SilverCare Connect - Connecting Generations, One Call at a Time</p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
Booking Confirmation - ${data.lovedOneName}

Dear ${data.userName},

Thank you for choosing SilverCare Connect! Your connection request for ${data.lovedOneName} has been received.

Your Appointment:
- Date: ${data.date}
- Time: ${data.time}
- Location: ${data.lovedOneLocation}

What Happens Next?
Our team will contact you within 24 hours to confirm your appointment time and coordinate technical setup.

Remember: We handle all the technology setup - your loved one just needs to bring their beautiful smile!

Thank you for trusting us to help connect your family.

The SilverCare Connect Team
    `

    return this.sendEmail({
      to: data.userEmail,
      subject,
      html,
      text
    })
  }

  // Send booking status update
  async sendBookingStatusUpdate(
    userEmail: string, 
    userName: string, 
    lovedOneName: string, 
    status: 'confirmed' | 'cancelled',
    date: string,
    time: string
  ): Promise<{ success: boolean; error?: string }> {
    const isConfirmed = status === 'confirmed'
    const subject = `Booking ${isConfirmed ? 'Confirmed' : 'Cancelled'} - ${lovedOneName}`
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking ${isConfirmed ? 'Confirmed' : 'Cancelled'}</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${isConfirmed ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'}; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f8faff; padding: 30px; border-radius: 0 0 12px 12px; }
          .status-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${isConfirmed ? '✅' : '❌'} Booking ${isConfirmed ? 'Confirmed' : 'Cancelled'}</h1>
          <p>SilverCare Connect</p>
        </div>
        
        <div class="content">
          <p>Dear ${userName},</p>
          
          <div class="status-box">
            <h3>Your appointment for <strong>${lovedOneName}</strong> has been <strong>${status}</strong></h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          
          ${isConfirmed ? `
            <p>Great news! Your connection session is confirmed. Our technical team will arrive 15 minutes early to ensure everything is set up perfectly.</p>
            <p>We're excited to help you connect with ${lovedOneName}!</p>
          ` : `
            <p>We apologize, but your appointment has been cancelled. Please contact us to reschedule.</p>
          `}
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The SilverCare Connect Team</p>
          
          <div class="footer">
            <p>© 2024 SilverCare Connect - Connecting Generations, One Call at a Time</p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
Booking ${isConfirmed ? 'Confirmed' : 'Cancelled'} - ${lovedOneName}

Dear ${userName},

Your appointment for ${lovedOneName} has been ${status}.

Date: ${date}
Time: ${time}

${isConfirmed ? 
  `Great news! Your connection session is confirmed. Our technical team will arrive 15 minutes early to ensure everything is set up perfectly.` :
  `We apologize, but your appointment has been cancelled. Please contact us to reschedule.`
}

Best regards,
The SilverCare Connect Team
    `

    return this.sendEmail({
      to: userEmail,
      subject,
      html,
      text
    })
  }
}

export const emailService = new EmailService()

// Setup instructions for production deployment:
export const EMAIL_SETUP_INSTRUCTIONS = `
# Email Service Setup Instructions

## Option 1: SendGrid (Recommended)
1. Create account at https://sendgrid.com
2. Get API key from Settings > API Keys
3. Set environment variable: SENDGRID_API_KEY=your_api_key_here
4. Verify sender domain in SendGrid dashboard

## Option 2: Nodemailer with SMTP
1. Install: npm install nodemailer
2. Configure SMTP settings (Gmail, Outlook, etc.)
3. Set environment variables:
   - SMTP_HOST=smtp.gmail.com
   - SMTP_PORT=587
   - SMTP_USER=your_email@gmail.com
   - SMTP_PASS=your_app_password

## Option 3: Resend (Modern alternative)
1. Create account at https://resend.com
2. Get API key from dashboard
3. Set environment variable: RESEND_API_KEY=your_api_key_here

## Environment Variables Needed:
- EMAIL_SERVICE_PROVIDER=sendgrid|nodemailer|resend
- FROM_EMAIL=noreply@yourdomain.com
- ADMIN_EMAIL=admin@yourdomain.com

## Production Considerations:
- Enable email authentication (SPF, DKIM, DMARC)
- Set up proper error handling and retry logic
- Monitor email delivery rates
- Implement rate limiting to prevent spam
- Use email templates for consistency
- Add unsubscribe functionality for marketing emails
`