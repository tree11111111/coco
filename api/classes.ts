import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const classes = await storage.getClasses();
      return res.json(classes);
    }
    
    if (req.method === 'POST') {
      const cls = await storage.addClass(req.body);
      return res.json(cls);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

