import { Caravan } from '@/types';

export const caravans: Caravan[] = [
  {
    id: '1',
    name: 'Luxury Family Caravan',
    slug: 'luxury-family-caravan',
    description: 'Spacious and modern, perfect for families looking to explore Northern Ireland in comfort. This caravan features a fully equipped kitchen, comfortable sleeping arrangements, and stunning views.',
    shortDescription: 'Spacious family caravan with modern amenities',
    sleeps: 6,
    berths: 6,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
    features: [
      'Fully equipped kitchen',
      'Central heating',
      'TV & WiFi',
      'Shower & toilet',
      'Outdoor seating area',
      'Parking space',
    ],
    petFriendly: true,
    pricing: {
      weekday: 80,
      weekend: 120,
      weekly: 500,
      peakSeason: 150,
    },
    availability: {
      bookedDates: ['2024-12-20', '2024-12-21', '2024-12-22'],
    },
  },
  {
    id: '2',
    name: 'Compact Couples Retreat',
    slug: 'compact-couples-retreat',
    description: 'Ideal for couples seeking a romantic getaway. This cozy caravan offers all the essentials in a compact, well-designed space with beautiful countryside views.',
    shortDescription: 'Cozy caravan perfect for couples',
    sleeps: 2,
    berths: 2,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    ],
    features: [
      'Compact kitchenette',
      'Heating',
      'TV',
      'Shower & toilet',
      'Private deck area',
      'Parking space',
    ],
    petFriendly: false,
    pricing: {
      weekday: 60,
      weekend: 90,
      weekly: 400,
      peakSeason: 110,
    },
    availability: {
      bookedDates: ['2024-12-15', '2024-12-16'],
    },
  },
  {
    id: '3',
    name: 'Premium 8-Berth',
    slug: 'premium-8-berth',
    description: 'Our largest and most luxurious option, perfect for extended families or groups. Features multiple bedrooms, spacious living areas, and premium amenities.',
    shortDescription: 'Luxury 8-berth caravan for large groups',
    sleeps: 8,
    berths: 8,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1568605117035-2c2d001ba755?w=800',
    ],
    features: [
      'Full kitchen with dishwasher',
      'Central heating',
      'Smart TV & WiFi',
      'En-suite bathrooms',
      'Large outdoor area',
      'BBQ facilities',
      'Parking for 2 cars',
    ],
    petFriendly: true,
    pricing: {
      weekday: 120,
      weekend: 180,
      weekly: 750,
      peakSeason: 220,
    },
    availability: {
      bookedDates: [],
    },
  },
  {
    id: '4',
    name: 'Coastal Explorer',
    slug: 'coastal-explorer',
    description: 'Perfectly positioned for coastal adventures. This well-appointed caravan offers easy access to Northern Ireland\'s stunning coastline and beaches.',
    shortDescription: 'Coastal caravan with sea views',
    sleeps: 4,
    berths: 4,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    ],
    features: [
      'Fully equipped kitchen',
      'Heating',
      'TV & WiFi',
      'Shower & toilet',
      'Sea view deck',
      'Beach access nearby',
      'Parking space',
    ],
    petFriendly: true,
    pricing: {
      weekday: 75,
      weekend: 110,
      weekly: 450,
      peakSeason: 130,
    },
    availability: {
      bookedDates: ['2024-12-25', '2024-12-26', '2024-12-27'],
    },
  },
];

export function getCaravanBySlug(slug: string): Caravan | undefined {
  return caravans.find(caravan => caravan.slug === slug);
}

export function getCaravanById(id: string): Caravan | undefined {
  return caravans.find(caravan => caravan.id === id);
}

