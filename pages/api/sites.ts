import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { CaravanSite } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Try to get from Supabase
      if (supabase) {
        const { data, error } = await supabase
          .from('caravan_sites')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Transform database format to app format
          const sites: CaravanSite[] = data.map((row: any) => ({
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

          return res.status(200).json(sites);
        }
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
    }

    // Fallback to JSON file
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'data', 'caravanSites.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const sites = JSON.parse(data);
      
      if (Array.isArray(sites) && sites.length > 0) {
        return res.status(200).json(sites);
      }
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }

    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    const sites: CaravanSite[] = req.body;

    if (!Array.isArray(sites)) {
      return res.status(400).json({ error: 'Data must be an array' });
    }

    // Try to save to Supabase
    try {
      if (supabase) {
        const dbRows = sites.map((site) => ({
          id: site.id,
          name: site.name,
          location: site.location,
          description: site.description,
          image: site.image,
          website: site.website,
          features: site.features,
          rating: site.rating,
          facilities: site.facilities,
          updated_at: new Date().toISOString(),
        }));

        await supabase.from('caravan_sites').delete().neq('id', '');
        const { error } = await supabase.from('caravan_sites').insert(dbRows);

        if (!error) {
          return res.status(200).json({ 
            success: true, 
            message: 'Sites saved to database',
            count: sites.length
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
      const filePath = path.join(process.cwd(), 'data', 'caravanSites.json');
      fs.writeFileSync(filePath, JSON.stringify(sites, null, 2), 'utf8');
      return res.status(200).json({ 
        success: true, 
        message: 'Sites saved to file',
        count: sites.length
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save sites' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

