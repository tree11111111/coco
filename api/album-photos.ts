import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const photos = await storage.getAlbumPhotos();
      return res.status(200).json(photos);
    }

    if (req.method === "POST") {
      if (!req.body || !req.body.title || !req.body.url) {
        return res.status(400).json({ error: "title and url are required" });
      }
      const photo = await storage.addAlbumPhoto(req.body);
      return res.status(200).json(photo);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("[API] Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
