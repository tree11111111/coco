import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const posts = await storage.getPosts();
      return res.status(200).json(posts);
    }

    if (req.method === "POST") {
      if (!req.body || !req.body.title || !req.body.content) {
        return res.status(400).json({ error: "title and content are required" });
      }
      const post = await storage.addPost(req.body);
      return res.status(200).json(post);
    }

    if (req.method === "PUT") {
      const id = req.query.id as string;
      const post = await storage.updatePost(id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json(post);
    }

    if (req.method === "DELETE") {
      const id = req.query.id as string;
      const success = await storage.deletePost(id);
      if (!success) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("[API] Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
