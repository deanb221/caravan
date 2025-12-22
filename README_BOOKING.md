# Booking Integration Guide

This guide explains how to connect the booking form to various calendar and booking systems.

## Configuration

Edit `config/booking.ts` to choose your booking method:

```typescript
export const bookingConfig = {
  method: 'email', // Change to: 'email' | 'calendly' | 'google-calendar' | 'api' | 'custom'
  // ... other settings
};
```

## Available Booking Methods

### 1. Email Booking (Default)
**Best for:** Simple setup, manual processing

- Opens user's email client with pre-filled booking details
- No additional setup required
- Update `email.to` with your booking email address

**Setup:**
```typescript
email: {
  to: 'bookings@yourdomain.com',
  subject: 'New Caravan Booking Request',
}
```

### 2. Calendly Integration
**Best for:** Automated scheduling, calendar management

- Redirects to your Calendly booking page
- Can pre-fill customer name and email
- Requires Calendly account (free tier available)

**Setup:**
1. Create a Calendly account: https://calendly.com
2. Create an event type for caravan bookings
3. Update the URL in `config/booking.ts`:
```typescript
calendly: {
  url: 'https://calendly.com/your-username/caravan-booking',
  prefill: true,
}
```

### 3. Google Calendar
**Best for:** Quick calendar event creation

- Opens Google Calendar with pre-filled event details
- Customer can add to their calendar
- No account required for customers

**Setup:**
```typescript
googleCalendar: {
  calendarEmail: 'bookings@yourdomain.com',
}
```

### 4. API Integration
**Best for:** Custom booking systems, databases

- Sends booking data to your API endpoint
- Full control over booking processing
- Requires backend API

**Setup:**
1. Create API endpoint (see `pages/api/bookings.ts`)
2. Connect to your database/booking system
3. Update endpoint URL:
```typescript
api: {
  endpoint: '/api/bookings',
  method: 'POST',
}
```

### 5. Custom URL
**Best for:** Third-party booking systems (Booking.com, etc.)

- Redirects to external booking system
- Can pass booking parameters in URL

**Setup:**
```typescript
custom: {
  url: 'https://your-booking-system.com/book',
  includeParams: true,
}
```

## Recommended Services

### For Small Businesses:
- **Calendly** - Free tier, easy setup, automated scheduling
- **Email** - Simple, no cost, manual processing

### For Growing Businesses:
- **Calendly Pro** - Advanced features, payment integration
- **Acuity Scheduling** - More customization options
- **Square Appointments** - Includes payment processing

### For Enterprise:
- **Custom API** - Full control, integrate with CRM/ERP
- **Booking.com API** - If using Booking.com
- **Stripe + Custom** - Payment + booking management

## Implementation Steps

1. **Choose your method** - Edit `config/booking.ts`
2. **Configure settings** - Update the relevant configuration section
3. **Test the booking flow** - Submit a test booking
4. **Set up notifications** - Configure email/SMS alerts
5. **Monitor bookings** - Set up admin dashboard (see `/admin`)

## Example: Setting up Calendly

1. Sign up at https://calendly.com
2. Create event type: "Caravan Booking Consultation"
3. Set duration (e.g., 15 minutes)
4. Copy your Calendly link
5. Update `config/booking.ts`:
   ```typescript
   method: 'calendly',
   calendly: {
     url: 'https://calendly.com/your-username/caravan-booking',
     prefill: true,
   }
   ```

## Example: Setting up API Integration

1. Create database table for bookings
2. Set up email service (SendGrid, Resend, etc.)
3. Update `pages/api/bookings.ts` with your logic
4. Test the API endpoint
5. Set `method: 'api'` in `config/booking.ts`

## Need Help?

- Check the configuration file: `config/booking.ts`
- Review the API route: `pages/api/bookings.ts`
- Test each method to see which works best for your needs









