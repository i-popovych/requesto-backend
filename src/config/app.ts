import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  versioning: {
    prefix: 'v',
    version: process.env.HTTP_VERSION ?? '1',
  },
  http: {
    port: process.env.HTTP_PORT ?? '8000',
  },
  feClientUrl: process.env.FE_CLIENT_URL,
  feClientPricingUrl: process.env.FE_CLIENT_PRICING_URL,
  feAdminUrl: process.env.FE_ADMIN_URL,
  beUrl: process.env.BE_URL,
  isProd: process.env.NODE_ENV === 'prod',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
  linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  linkedinUrlAccessToken: process.env.LINKEDIN_URL_ACCESS_TOKEN,
  freshProfileXRapidAPIKey: process.env.FRESH_PROFILE_XRAPID_API_KEY,
  profileXRapidAPIKey: process.env.PROFILE_XRAPID_API_KEY,
  googleUrlInfoContact: process.env.GOOGLE_URL_INFO_CONTACT,
  googleCalendarUrl: process.env.GOOGLEAPIS_CALENDAR_URL,
  googleContentCalendarUrl: process.env.GOOGLEAPIS_CONTENT_CALENDAR_URL,
  googleContentGmailUrl: process.env.GOOGLEAPIS_CONTENT_GMAIL_URL,
  whiteListSubdomains: process.env.WHITE_LIST_SUBDOMAINS,
  previewSubdomainWildcard: process.env.PREVIEW_SUBDOMAIN_WILDCARD,
  frameAncestorsList: process.env.FRAME_ANCESTORS_LIST,
  googleV3BaseUrl: process.env.GOOGLE_OAUTH_V3_API_BASE_URL,
  companyDetailsFlowName: process.env.COMPANY_DETAILS_FLOW_NAME,
}));
