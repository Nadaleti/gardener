import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || 'dev';
const envFilePath = path.join(process.cwd(), `src/database/environment/db.${env}.env`);
const envConfig = dotenv.parse(fs.readFileSync(envFilePath))

module.exports = {
  type: envConfig.TYPEORM_CONNECTION,
  host: envConfig.TYPEORM_HOST,
  port: envConfig.TYPEORM_PORT,
  username: envConfig.TYPEORM_USERNAME,
  password: envConfig.TYPEORM_PASSWORD,
  database: envConfig.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    envConfig.TYPEORM_ENTITIES
  ],
  migrations: [
    envConfig.TYPEORM_MIGRATIONS
  ]
};
