import {
  AWS_REGION,
  DB_NAME,
  MONGODB_CONNECTION_STRING,
  PORT,
  S3_BUCKET_NAME,
} from './config/config';
import { AppRepository } from './repository/app.repository';
// import { AppService } from './service/app.service';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
const app = express();

// Create S3 client for multer-s3
const s3Client = new S3Client({ region: AWS_REGION });

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: S3_BUCKET_NAME,
    key: (req, file, cb) => {
      // Use original filename as S3 key
      cb(null, file.originalname);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// TODO: Set up real logger (Winston or Pino)

// const appRepository = new AppRepository(MONGODB_CONNECTION_STRING, DB_NAME);
// const appService = new AppService(appRepository);

// app.get('/v1/api/bucketconfig/:id', async (req, res) => {
//   const bucketName = req.params.id;
//   const result = await appService.getConfigForBucket(bucketName);

//   if (!result) {
//     res.status(404).send('Resource not found');
//   }

//   res.json(result);
// });

app.post('/api/documents', upload.single('file'), async (req, res) => {
  try {
    const file = req.file as any;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // File is already uploaded to S3 by multer-s3
    // req.file contains S3 metadata instead of buffer
    const result = {
      key: file.key,
      location: file.location,
      etag: file.etag,
      size: file.size,
    };

    res.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(PORT, async () => {
  // await appRepository.connect();
  console.log('Listening to port 3000.');
});
