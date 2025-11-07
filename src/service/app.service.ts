import { AppRepository } from '../repository/app.repository';

export class AppService {
  private appRepository: AppRepository;

  constructor(appRepository: AppRepository) {
    this.appRepository = appRepository;
  }

  async getConfigForBucket(bucketName: string) {
    console.log(`Getting config for bucket: ${bucketName}`);

    const config = await this.appRepository.getBucketConfig(bucketName);

    return config;
  }
}
