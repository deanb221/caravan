// API Route for handling bookings and sending emails
import type { NextApiRequest, NextApiResponse } from 'next';

const BOOKING_EMAIL = 'booking@nicaravanhire.co.uk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookingData = req.body;
    const { caravanName, startDate, endDate, name, email, phone, totalPrice } = bookingData;

    // Create email content
    const emailSubject = `New Caravan Booking Request - ${caravanName}`;
    const emailBody = `
New Caravan Booking Request

Booking Details:
- Caravan: ${caravanName}
- Check-in: ${startDate} (3:00 PM - 4:00 PM)
- Check-out: ${endDate} (10:00 AM - 12:00 PM)
- Total Price: £${totalPrice}

Customer Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Please contact the customer to confirm this booking and arrange the deposit payment.

---
This booking was submitted through the NI Caravan Hire website.
    `.trim();

    // Try to send email using multiple methods
    let emailSent = false;

    // Method 1: Use Resend API (if API key is set)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'NI Caravan Hire <noreply@nicaravanhire.co.uk>',
            to: [BOOKING_EMAIL],
            reply_to: email,
            subject: emailSubject,
            text: emailBody,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
        }
      } catch (error) {
        console.error('Resend API error:', error);
      }
    }

    // Method 2: Use SendGrid API (if API key is set)
    if (!emailSent && process.env.SENDGRID_API_KEY) {
      try {
        const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: BOOKING_EMAIL }],
              subject: emailSubject,
            }],
            from: { email: 'noreply@nicaravanhire.co.uk', name: 'NI Caravan Hire' },
            reply_to: { email: email, name: name },
            content: [{
              type: 'text/plain',
              value: emailBody,
            }],
          }),
        });

        if (sendgridResponse.ok) {
          emailSent = true;
        }
      } catch (error) {
        console.error('SendGrid API error:', error);
      }
    }

    // Method 3: Use mailto link as fallback (log for manual sending)
    if (!emailSent) {
      const mailtoLink = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      console.log('Email service not configured. Use this mailto link:', mailtoLink);
      console.log('Booking details:', bookingData);
    }

    // Log booking for reference
    console.log('Booking received:', {
      ...bookingData,
      receivedAt: new Date().toISOString(),
      emailSent,
    });

    res.status(200).json({
      success: true,
      message: emailSent 
        ? 'Booking request submitted and email sent successfully!' 
        : 'Booking request received. We will contact you shortly.',
      bookingId: `booking-${Date.now()}`,
      emailSent,
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing booking. Please try again or contact us directly.' 
    });
  }
}






