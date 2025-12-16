import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const posts = await storage.getPosts();
      return res.json(posts);
    }
    
    if (req.method === 'POST') {
      if (!req.body || !req.body.title || !req.body.content) {
        return res.status(400).json({ error: 'title and content are required' });
      }
      const post = await storage.addPost(req.body);
      return res.json(post);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API] Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

