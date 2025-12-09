import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { beforeAll, expect, test } from 'vitest';
import request from 'supertest';
import { app, appService } from '../main.ts';
import { mockClient } from 'aws-sdk-client-mock';
import { INGESTION_API_TOKEN } from '../config/config.ts';
import { DocumentData } from '../service/types.ts';

beforeAll(async () => {
  await appService.createAdminUser();
  mockClient(S3Client)
    .on(DeleteObjectCommand)
    .resolves({
      $metadata: { httpStatusCode: 200 },
    });
});

test('should delete a document successfully', async () => {
  await appService.createDocument(
    { fileName: 'Lion', size: 50, mimetype: 'pdf', createdAt: '12-3-2025' },
    '18903458904'
  );

  const initialDoc = await appService.fetchDocument('18903458904');
  expect(initialDoc.status).toBe('pending');

  await request(app)
    .delete(`/api/documents/18903458904`)
    .set('x-api-token', INGESTION_API_TOKEN);

  const updatedDoc = await appService.fetchDocument('18903458904');

  expect(updatedDoc.status).toBe('deleting');
});
