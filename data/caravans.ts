import { Caravan } from '@/types';
import caravansData from './caravans.json';

// Fallback data if JSON is empty
const fallbackCaravans: Caravan[] = [
  {
    id: '1',
    name: 'Luxury Family Caravan',
    slug: 'luxury-family-caravan',
    description: 'Spacious and modern touring caravan, perfect for families looking to explore Northern Ireland in comfort. This touring caravan features a fully equipped kitchen, comfortable sleeping arrangements, and is ready to tow. Ideal for touring adventures across Northern Ireland.',
    shortDescription: 'Spacious family touring caravan with modern amenities',
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
      'Ready to tow',
      'Tow bar included',
      'Outdoor awning',
    ],
    petFriendly: true,
    pricing: {
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
    description: 'Ideal for couples seeking a romantic touring getaway. This cozy touring caravan offers all the essentials in a compact, well-designed space, perfect for touring Northern Ireland\'s beautiful countryside.',
    shortDescription: 'Cozy touring caravan perfect for couples',
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
      'Ready to tow',
      'Lightweight design',
      'Easy towing',
    ],
    petFriendly: false,
    pricing: {
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
    shortDescription: 'Luxury 8-berth touring caravan for large groups',
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
      'Ready to tow',
      'Tow bar & stabilizer',
      'Large awning included',
    ],
    petFriendly: true,
    pricing: {
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
    description: 'Perfect for coastal touring adventures. This well-appointed touring caravan offers easy access to Northern Ireland\'s stunning coastline and beaches, ready to tow to your perfect coastal spot.',
    shortDescription: 'Coastal touring caravan perfect for beach adventures',
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
      'Ready to tow',
      'Tow bar included',
      'Beach-friendly design',
    ],
    petFriendly: true,
    pricing: {
      weekend: 110,
      weekly: 450,
      peakSeason: 130,
    },
    availability: {
      bookedDates: ['2024-12-25', '2024-12-26', '2024-12-27'],
    },
  },
];

// Export the data from JSON file, with fallback to original data
export const caravans: Caravan[] = Array.isArray(caravansData) && caravansData.length > 0 
  ? caravansData 
  : fallbackCaravans;

export function getCaravanBySlug(slug: string): Caravan | undefined {
  return caravans.find(caravan => caravan.slug === slug);
}

export function getCaravanById(id: string): Caravan | undefined {
  return caravans.find(caravan => caravan.id === id);
}
