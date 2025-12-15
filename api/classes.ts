import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const classes = await storage.getClasses();
      return res.status(200).json(classes);
    }

    if (req.method === "POST") {
      if (!req.body || !req.body.name) {
        return res.status(400).json({ error: "name is required" });
      }
      const newClass = await storage.addClass(req.body);
      return res.status(200).json(newClass);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("[API] Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
