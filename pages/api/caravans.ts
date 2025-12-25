import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { Caravan } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Try to get from Supabase
      if (supabase) {
        const { data, error } = await supabase
          .from('caravans')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Transform database format to app format
          const caravans: Caravan[] = data.map((row: any) => ({
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

          return res.status(200).json(caravans);
        }
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
    }

    // Fallback to JSON file
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'caravans.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const caravans = JSON.parse(data);
      
      // If JSON has data, return it; otherwise return empty array
      if (Array.isArray(caravans) && caravans.length > 0) {
        return res.status(200).json(caravans);
      }
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }

    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    try {
      const caravans: Caravan[] = req.body;

      if (!Array.isArray(caravans)) {
        return res.status(400).json({ error: 'Data must be an array' });
      }

      // Try to save to Supabase
      if (supabase) {
        // Transform app format to database format
        const dbRows = caravans.map((caravan) => ({
          id: caravan.id,
          name: caravan.name,
          slug: caravan.slug,
          description: caravan.description,
          short_description: caravan.shortDescription,
          sleeps: caravan.sleeps,
          berths: caravan.berths,
          images: caravan.images,
          features: caravan.features,
          pet_friendly: caravan.petFriendly,
          pricing: caravan.pricing,
          availability: caravan.availability,
          updated_at: new Date().toISOString(),
        }));

        // Delete all existing and insert new
        await supabase.from('caravans').delete().neq('id', '');
        const { error } = await supabase.from('caravans').insert(dbRows);

        if (!error) {
          return res.status(200).json({ 
            success: true, 
            message: 'Caravans saved to database',
            count: caravans.length
          });
        }
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }

    // Fallback to JSON file
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'caravans.json');
      fs.writeFileSync(filePath, JSON.stringify(caravans, null, 2), 'utf8');
      return res.status(200).json({ 
        success: true, 
        message: 'Caravans saved to file',
        count: caravans.length
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save caravans' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

