import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { CaravanSite } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'caravanSites.json');

// Ensure data file exists
const ensureDataFile = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  ensureDataFile();

  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const sites = JSON.parse(data);
      return res.status(200).json(sites);
    } catch (error) {
      console.error('Error reading sites:', error);
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    try {
      const sites: CaravanSite[] = req.body;
      
      if (!Array.isArray(sites)) {
        return res.status(400).json({ error: 'Data must be an array' });
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(sites, null, 2), 'utf8');
      
      return res.status(200).json({ 
        success: true, 
        message: 'Sites saved successfully',
        count: sites.length
      });
    } catch (error) {
      console.error('Error saving sites:', error);
      return res.status(500).json({ error: 'Failed to save sites' });
    }
  }
}

