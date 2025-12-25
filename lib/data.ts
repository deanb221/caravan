import { Caravan } from '@/types';
import { CaravanSite } from '@/types';
import { supabase } from './supabase';

// Shared data fetching function that works in both server and client
export async function getCaravans(): Promise<Caravan[]> {
  // Try Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('caravans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching caravans:', error);
      } else if (data && data.length > 0) {
        console.log(`✅ Fetched ${data.length} caravans from Supabase`);
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description || '',
          shortDescription: row.short_description || '',
          sleeps: row.sleeps || 0,
          berths: row.berths || 0,
          images: row.images || [],
          features: row.features || [],
          petFriendly: row.pet_friendly || false,
          pricing: row.pricing || { weekend: 0, weekly: 0, peakSeason: 0 },
          availability: row.availability || { bookedDates: [] },
        }));
      } else {
        console.log('⚠️ Supabase returned empty data for caravans');
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
    }
  } else {
    console.warn('⚠️ Supabase client not initialized');
  }

  // Fallback to JSON file
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'data', 'caravans.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const caravans = JSON.parse(data);
    if (Array.isArray(caravans) && caravans.length > 0) {
      return caravans;
    }
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  // Final fallback: return empty array (let pages use their fallback data)
  // This ensures we don't return placeholder data if JSON is empty
  return [];
}

export async function getCaravanSites(): Promise<CaravanSite[]> {
  // Try Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('caravan_sites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching sites:', error);
      } else if (data && data.length > 0) {
        console.log(`✅ Fetched ${data.length} sites from Supabase`);
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          location: row.location || '',
          description: row.description || '',
          image: row.image || '',
          website: row.website || '',
          features: row.features || [],
          rating: row.rating || 0,
          facilities: row.facilities || [],
        }));
      } else {
        console.log('⚠️ Supabase returned empty data for sites');
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
    }
  } else {
    console.warn('⚠️ Supabase client not initialized');
  }

  // Fallback to JSON file
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'data', 'caravanSites.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const sites = JSON.parse(data);
    if (Array.isArray(sites) && sites.length > 0) {
      return sites;
    }
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  return [];
}

