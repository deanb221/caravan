// Booking Integration Configuration
// Choose your preferred booking method by setting the 'method' field

export const bookingConfig = {
  // Choose: 'email' | 'calendly' | 'google-calendar' | 'api' | 'custom'
  method: 'api' as 'email' | 'calendly' | 'google-calendar' | 'api' | 'custom',
  
  // Email Configuration
  email: {
    to: 'booking@nicaravanhire.co.uk', // Your booking email
    subject: 'New Caravan Booking Request',
  },
  
  // Calendly Configuration
  calendly: {
    // Get your Calendly link from: https://calendly.com/your-username
    url: 'https://calendly.com/your-username/caravan-booking',
    // Optional: Pre-fill customer name and email
    prefill: true,
  },
  
  // Google Calendar Configuration
  googleCalendar: {
    // Your Google Calendar email for bookings
    calendarEmail: 'booking@nicaravanhire.co.uk',
  },
  
  // API Configuration (for custom booking systems)
  api: {
    endpoint: '/api/bookings', // Your booking API endpoint
    method: 'POST',
  },
  
  // Custom URL (for other booking systems like Booking.com, etc.)
  custom: {
    url: 'https://your-booking-system.com/book',
    // Optional: Add booking parameters to URL
    includeParams: true,
  },
};

// Helper function to generate booking links
export function generateBookingLink(bookingData: {
  caravanName: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}): string {
  const { method } = bookingConfig;
  
  switch (method) {
    case 'email':
      return generateEmailLink(bookingData);
    
    case 'calendly':
      return generateCalendlyLink(bookingData);
    
    case 'google-calendar':
      return generateGoogleCalendarLink(bookingData);
    
    case 'api':
      return bookingConfig.api.endpoint;
    
    case 'custom':
      return generateCustomLink(bookingData);
    
    default:
      return generateEmailLink(bookingData);
  }
}

function generateEmailLink(data: {
  caravanName: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}): string {
  const subject = encodeURIComponent(bookingConfig.email.subject);
  const body = encodeURIComponent(`
New Caravan Booking Request

Caravan: ${data.caravanName}
Check-in: ${data.startDate} (3:00 PM - 4:00 PM)
Check-out: ${data.endDate} (10:00 AM - 12:00 PM)
Total Price: £${data.totalPrice}

Customer Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Please confirm this booking.
  `.trim());
  
  return `mailto:${bookingConfig.email.to}?subject=${subject}&body=${body}`;
}

function generateCalendlyLink(data: {
  caravanName: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}): string {
  let url = bookingConfig.calendly.url;
  
  if (bookingConfig.calendly.prefill) {
    const params = new URLSearchParams({
      name: data.name,
      email: data.email,
    });
    url += `?${params.toString()}`;
  }
  
  return url;
}

function generateGoogleCalendarLink(data: {
  caravanName: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}): string {
  // Format dates for Google Calendar (YYYYMMDDTHHmmss)
  const startDateTime = new Date(data.startDate + 'T15:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateTime = new Date(data.endDate + 'T12:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Caravan Booking: ${data.caravanName}`,
    dates: `${startDateTime}/${endDateTime}`,
    details: `Caravan: ${data.caravanName}\nCustomer: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nTotal Price: £${data.totalPrice}`,
    location: 'NI Caravan Hire',
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function generateCustomLink(data: {
  caravanName: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}): string {
  if (!bookingConfig.custom.includeParams) {
    return bookingConfig.custom.url;
  }
  
  const params = new URLSearchParams({
    caravan: data.caravanName,
    start: data.startDate,
    end: data.endDate,
    name: data.name,
    email: data.email,
    phone: data.phone,
    price: data.totalPrice.toString(),
  });
  
  return `${bookingConfig.custom.url}?${params.toString()}`;
}






