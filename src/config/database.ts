import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbUri: process.env.DB_URI,
}));
