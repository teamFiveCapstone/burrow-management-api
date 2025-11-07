import { Db, MongoClient } from 'mongodb';

export class AppRepository {
  private client: MongoClient;
  private db: Db;

  constructor(connection_string: string, db_name: string) {
    this.client = new MongoClient(connection_string);
    this.db = this.client.db(db_name);
  }

  async connect() {
    await this.client.connect();

    console.log('Successfully connected to MongoDB Cloud!');
  }

  async getBucketConfig(folderPath: string) {
    const configsCollection = this.db.collection('configs');

    const config = await configsCollection.findOne({
      folder_path: folderPath,
    });

    return config;
  }
}
