import dotenv from 'dotenv';

dotenv.config();

export const DB_NAME = process.env.DB_NAME ?? '';
export const PORT = process.env.PORT ?? 3000;
export const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ?? '';
export const AWS_ACESS_KEY_ID = process.env.AWS_ACESS_KEY_ID ?? '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? '';
export const AWS_REGION = process.env.AWS_REGION ?? '';
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? '';
