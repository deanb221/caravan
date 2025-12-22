import { CaravanSite } from '@/types';

export const caravanSites: CaravanSite[] = [
  {
    id: '1',
    name: 'Giant\'s Causeway Caravan Park',
    location: 'Bushmills, County Antrim',
    description: 'Stunning coastal location with direct access to the Giant\'s Causeway World Heritage Site. Modern facilities and breathtaking views.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    website: 'https://www.nationaltrust.org.uk/giants-causeway',
    features: [
      'Coastal views',
      'Modern facilities',
      'Near Giant\'s Causeway',
      'Family friendly',
    ],
    rating: 4.8,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'Laundry facilities',
      'Shop',
      'Playground',
    ],
  },
  {
    id: '2',
    name: 'Ballyness Caravan Park',
    location: 'Bushmills, County Antrim',
    description: 'Peaceful park set in beautiful countryside, perfect for exploring the Causeway Coast. Excellent facilities and friendly atmosphere.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    website: 'https://www.ballynesscaravanpark.com',
    features: [
      'Countryside setting',
      'Peaceful location',
      'Great facilities',
      'Pet friendly',
    ],
    rating: 4.7,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'WiFi',
      'Dogs welcome',
      'Near beaches',
    ],
  },
  {
    id: '3',
    name: 'Carnfunnock Country Park',
    location: 'Larne, County Antrim',
    description: 'Family-friendly park with extensive facilities including a maze, adventure playground, and beautiful coastal walks.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    website: 'https://www.midandeastantrim.gov.uk/carnfunnock',
    features: [
      'Family activities',
      'Adventure playground',
      'Coastal walks',
      'Events & entertainment',
    ],
    rating: 4.6,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'Playground',
      'Maze',
      'Cafe',
    ],
  },
  {
    id: '4',
    name: 'Drum Manor Forest Park',
    location: 'Cookstown, County Tyrone',
    description: 'Beautiful forest park setting with woodland walks, fishing lakes, and excellent touring facilities.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    website: 'https://www.daera-ni.gov.uk/forests',
    features: [
      'Forest setting',
      'Woodland walks',
      'Fishing lakes',
      'Nature trails',
    ],
    rating: 4.5,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'Fishing',
      'Walking trails',
      'Picnic areas',
    ],
  },
  {
    id: '5',
    name: 'Castle Ward Caravan Park',
    location: 'Strangford, County Down',
    description: 'Historic estate setting with access to Castle Ward National Trust property. Stunning views over Strangford Lough.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    website: 'https://www.nationaltrust.org.uk/castle-ward',
    features: [
      'Historic setting',
      'Lough views',
      'National Trust access',
      'Coastal location',
    ],
    rating: 4.7,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'Shop',
      'Restaurant',
      'Walking trails',
    ],
  },
  {
    id: '6',
    name: 'Gosford Forest Park',
    location: 'Markethill, County Armagh',
    description: 'Spacious park in beautiful forest surroundings. Perfect for families with excellent facilities and nature activities.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    website: 'https://www.daera-ni.gov.uk/forests',
    features: [
      'Forest park',
      'Spacious pitches',
      'Family facilities',
      'Nature activities',
    ],
    rating: 4.6,
    facilities: [
      'Electric hookups',
      'Shower blocks',
      'Playground',
      'Walking trails',
      'BBQ areas',
    ],
  },
];

export function getCaravanSiteById(id: string): CaravanSite | undefined {
  return caravanSites.find(site => site.id === id);
}









