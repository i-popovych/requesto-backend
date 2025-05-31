import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES ?? '30d',
  expiresInActiveAccount: process.env.JWT_EXPIRES_ACTIVE_ACCOUNT ?? '7d',
  s3: {
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  whiteLabel: process.env.WHITE_LABEL,
  adminPanelPass: process.env.ADMIN_PANEL_PASSWORD,
}));
