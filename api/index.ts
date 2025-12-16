import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore - no types available
import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { registerRoutes } from '../server/routes.ts';
import { createServer } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let handler: any = null;

export default async function(req: VercelRequest, res: VercelResponse) {
  if (!handler) {
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    handler = serverless(app);
  }
  return handler(req, res);
}

