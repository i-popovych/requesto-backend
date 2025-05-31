import { registerAs } from '@nestjs/config';

export default registerAs('emails', () => ({
  mailgunBaseUrl: process.env.MAILGUN_BASE_URL,
  mailgunAPIKey: process.env.MAILGUN_API_KEY,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
}));
