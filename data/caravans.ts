import { Caravan } from '@/types';
import caravansData from './caravans.json';

// Export the data from JSON file, with fallback to empty array
export const caravans: Caravan[] = Array.isArray(caravansData) && caravansData.length > 0 
  ? caravansData 
  : [];

export function getCaravanBySlug(slug: string): Caravan | undefined {
  return caravans.find(caravan => caravan.slug === slug);
}

export function getCaravanById(id: string): Caravan | undefined {
  return caravans.find(caravan => caravan.id === id);
}
