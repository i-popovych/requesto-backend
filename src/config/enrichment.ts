import { registerAs } from '@nestjs/config';

export default registerAs('enrichment', () => ({
  token: process.env.ENRICHMENT_TOKEN,
  baseUrl: process.env.ENRICHMENT_BASE_URL,
}));
