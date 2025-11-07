import { DB_NAME, MONGODB_CONNECTION_STRING, PORT } from './config/config';
import { AppRepository } from './repository/app.repository';
import { AppService } from './service/app.service';
import express from 'express';
const app = express();

// TODO: Set up real logger (Winston or Pino)

const appRepository = new AppRepository(MONGODB_CONNECTION_STRING, DB_NAME);
const appService = new AppService(appRepository);

app.get('/v1/api/bucketconfig/:id', async (req, res) => {
  const bucketName = req.params.id;
  const result = await appService.getConfigForBucket(bucketName);

  if (!result) {
    res.status(404).send('Resource not found');
  }

  res.json(result);
});

app.listen(PORT, async () => {
  await appRepository.connect();
  console.log('Listening to port 3000.');
});
