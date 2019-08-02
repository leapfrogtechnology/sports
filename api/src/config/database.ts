import dynamoose from 'dynamoose';
import * as dotenv from 'dotenv';

export const bootstrap = async (): Promise<void> => {
  dotenv.config();

  const environment = (process.env && process.env.NODE_ENV) || 'development';

  if (environment === 'production') {
    dynamoose.AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  } else {
    dynamoose.local();
  }
};
