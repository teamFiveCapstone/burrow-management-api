import dotenv from 'dotenv';

dotenv.config();

export const DB_NAME = process.env.DB_NAME ?? '';
export const PORT = process.env.PORT ?? 3000;
export const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ?? '';
