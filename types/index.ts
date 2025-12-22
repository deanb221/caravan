export interface Caravan {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sleeps: number;
  berths: number;
  images: string[];
  features: string[];
  petFriendly: boolean;
  pricing: {
    weekend: number;
    weekly: number;
    peakSeason: number;
  };
  availability: {
    bookedDates: string[]; // ISO date strings
  };
}

export interface Booking {
  id: string;
  caravanId: string;
  caravanName: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  startDate: Date | null;
  endDate: Date | null;
  caravanId: string;
}

export interface CaravanSite {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  website: string;
  features: string[];
  rating?: number;
  facilities: string[];
}
