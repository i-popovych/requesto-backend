import { registerAs } from '@nestjs/config';

export default registerAs('notifications', () => ({
  url: process.env.NOTIFICATION_MICROSERVICE_URL,
  apiKey: process.env.NOTIFICATION_MICROSERVICE_API_KEY,
}));
