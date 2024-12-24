import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ImageRoutes from './routes/image.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json({ limit: `${process.env.FILE_MAX_SIZE || '10mb'}` }));

app.use('/api/uploaded', express.static(path.join(__dirname, 'storage')));
app.use('/api/images/', ImageRoutes.router);

export default app;
