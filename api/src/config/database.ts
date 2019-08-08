import dynamoose from 'dynamoose';
import * as dotenv from 'dotenv';

export const bootstrap = async (): Promise<void> => {
  dotenv.config();
  const environment = (process.env && process.env.NODE_ENV) || 'development';
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

  dynamoose.AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  });

  if (environment !== 'production') {
    dynamoose.local(`http://db:8000`);
  }
};
