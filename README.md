# NI Caravan Hire - Booking Website

A modern, mobile-first caravan hire booking website for NI Caravan Hire, built with Next.js, React, and Tailwind CSS.

## Features

- 🏕️ **Caravan Showcase**: Beautiful display of available caravans with images, features, and pricing
- 📅 **Interactive Booking Calendar**: Check availability and book dates with dynamic pricing
- 📱 **Mobile-First Design**: Fully responsive across all devices
- 🎨 **Modern UI**: Clean, professional design with green/blue color palette inspired by Northern Ireland landscapes
- ⚡ **Fast Performance**: Optimized for speed and SEO
- 🔍 **SEO-Friendly**: Server-side rendering with Next.js

## Tech Stack

- **Next.js 14** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React DatePicker** - Interactive date selection
- **date-fns** - Date manipulation utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── components/          # Reusable React components
│   ├── Header.tsx       # Site navigation
│   ├── Footer.tsx        # Site footer
│   ├── CaravanCard.tsx  # Caravan listing card
│   └── BookingCalendar.tsx # Booking date picker
├── data/                # Mock data
│   └── caravans.ts      # Caravan data
├── pages/               # Next.js pages
│   ├── index.tsx        # Homepage
│   ├── caravans/        # Caravan pages
│   ├── about.tsx        # About page
│   └── contact.tsx      # Contact page
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS
└── types/               # TypeScript types
    └── index.ts         # Type definitions
```

## Pages

- **Homepage** (`/`) - Hero section, featured caravans, quick availability checker
- **Caravans** (`/caravans`) - Grid view of all available caravans
- **Caravan Detail** (`/caravans/[slug]`) - Detailed view with gallery, pricing, and booking
- **About** (`/about`) - Company information and story
- **Contact** (`/contact`) - Contact form and information

## Booking System

The booking system includes:
- Date picker with availability checking
- Dynamic pricing based on weekday/weekend/weekly rates
- Booking form with validation
- Prevention of double bookings

## Customization

### Adding Caravans

Edit `data/caravans.ts` to add or modify caravan listings.

### Styling

The color palette is defined in `tailwind.config.js`:
- Primary (green): `primary-*`
- Secondary (blue): `secondary-*`

Modify `styles/globals.css` for custom component styles.

## Future Enhancements

- Online payment integration (Stripe)
- Admin dashboard for managing bookings
- Email notifications
- Reviews and testimonials
- Seasonal pricing rules
- Booking calendar management

## License

This project is created for NI Caravan Hire.

