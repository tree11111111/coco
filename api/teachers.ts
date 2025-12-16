import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const teachers = await storage.getTeachers();
      return res.json(teachers);
    }
    
    if (req.method === 'POST') {
      if (!req.body || !req.body.name || !req.body.username || !req.body.password || !req.body.classId) {
        return res.status(400).json({ error: 'name, username, password, and classId are required' });
      }
      const teacher = await storage.addTeacher(req.body);
      return res.json(teacher);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

