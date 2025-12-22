# Email Setup Guide

## Current Status
The booking form is now configured to use the API method, which will send emails automatically once you set up an email service.

## Option 1: Resend (Recommended - Free Tier Available)

Resend offers a free tier with 3,000 emails/month.

### Setup Steps:
1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Add domain** (optional but recommended for better deliverability)
4. **Add to Vercel Environment Variables:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your-api-key-here`
   - Redeploy your site

### Benefits:
- Free tier: 3,000 emails/month
- Easy setup
- Good deliverability
- Works great with Vercel

---

## Option 2: SendGrid (Free Tier Available)

SendGrid offers a free tier with 100 emails/day.

### Setup Steps:
1. **Sign up at [sendgrid.com](https://sendgrid.com)**
2. **Create an API key** in Settings → API Keys
3. **Add to Vercel Environment Variables:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `SENDGRID_API_KEY` = `your-api-key-here`
   - Redeploy your site

### Benefits:
- Free tier: 100 emails/day
- Reliable service
- Good for getting started

---

## Option 3: Use Form Service (No Code Required)

If you prefer not to set up an API, you can use a form service:

### Formspree (Free Tier)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form endpoint
3. Update `config/booking.ts` to use `method: 'custom'`
4. Set `custom.url` to your Formspree endpoint

### EmailJS (Free Tier)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Set up email service
3. Get your service ID and template ID
4. Update the booking form to use EmailJS

---

## Quick Setup (Resend - Recommended)

1. **Sign up**: https://resend.com/signup
2. **Get API key**: Dashboard → API Keys → Create
3. **Add to Vercel**:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. **Redeploy**: Vercel will automatically redeploy
5. **Test**: Submit a booking form to verify emails are sent

---

## Current Configuration

The booking form is configured to:
- Send emails to: `booking@nicaravanhire.co.uk`
- Include all booking details
- Reply-to customer's email address
- Fallback to logging if no email service is configured

---

## Testing

After setting up an email service:
1. Go to a caravan detail page
2. Select dates
3. Fill out the booking form
4. Submit
5. Check your email inbox at `booking@nicaravanhire.co.uk`

---

## Troubleshooting

**Emails not sending?**
- Check Vercel environment variables are set correctly
- Check API key is valid
- Check Vercel logs for errors
- Verify email service account is active

**Need help?**
- Check the email service's documentation
- Review Vercel function logs
- Test with a simple email first



