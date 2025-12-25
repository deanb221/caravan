import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Caravan } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'caravans.json');

// Ensure data directory exists
const ensureDataFile = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Initialize with empty array if file doesn't exist
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST for updates
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  ensureDataFile();

  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const caravans = JSON.parse(data);
      return res.status(200).json(caravans);
    } catch (error) {
      console.error('Error reading caravans:', error);
      return res.status(200).json([]); // Return empty array on error
    }
  }

  if (req.method === 'POST') {
    try {
      const caravans: Caravan[] = req.body;
      
      // Validate data
      if (!Array.isArray(caravans)) {
        return res.status(400).json({ error: 'Data must be an array' });
      }

      // Write to file
      fs.writeFileSync(DATA_FILE, JSON.stringify(caravans, null, 2), 'utf8');
      
      return res.status(200).json({ 
        success: true, 
        message: 'Caravans saved successfully',
        count: caravans.length
      });
    } catch (error) {
      console.error('Error saving caravans:', error);
      return res.status(500).json({ error: 'Failed to save caravans' });
    }
  }
}

