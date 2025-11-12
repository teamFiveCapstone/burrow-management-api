import { AppRepository } from '../repository/app.repository';
import { S3Repository } from '../repository/s3.repository';

export class AppService {
  private appRepository: AppRepository;
  // private s3Repository: S3Repository;

  constructor(appRepository: AppRepository, s3Repository: S3Repository) {
    this.appRepository = appRepository;
    // this.s3Repository = s3Repository;
  }

  async getConfigForBucket(bucketName: string) {
    console.log(`Getting config for bucket: ${bucketName}`);

    const config = await this.appRepository.getBucketConfig(bucketName);

    return config;
  }

  // async uploadDocument(fileName: string, fileBuffer: Buffer, contentType: string) {
  //   console.log(`Uploading document: ${fileName}`);

  //   const uploadResult = await this.s3Repository.uploadDocument(fileName, fileBuffer, contentType);

  //   return uploadResult;
  // }
}
