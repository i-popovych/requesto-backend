import { registerAs } from '@nestjs/config';

export default registerAs('openAi', () => ({
  apiKey: process.env.OPENAI_API_KEY,
  organizationId: process.env.OPENAI_API_ORGANIZATION_ID,
}));
