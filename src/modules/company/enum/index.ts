export enum CompanyActivationStatus {
  ACTIVE = 'active',
  DEACTIVATED = 'deactivated',
  IN_TRIAL = 'in-trial',
}

export enum ONBOARDING_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum PlatformMetadataConfigureKeys {
  INBOX_ENABLE = 'inboxEnable',
  CAMPAIGN_ENABLE = 'campaignEnable',
  INBOUND_GOOGLE_ENABLED = 'inboundGoogleEnabled',
  INBOUND_MICROSOFT_ENABLED = 'inboundMicrosoftEnabled',
  INBOUND_CUSTOM_DOMAIN_ENABLED = 'inboundCustomDomainEnabled',
  CAMPAIGN_GOOGLE_ENABLED = 'campaignGoogleEnabled',
  CAMPAIGN_MICROSOFT_ENABLED = 'campaignMicrosoftEnabled',
  CAMPAIGN_CUSTOM_DOMAIN_ENABLED = 'campaignCustomDomainEnabled',
  EMAIL_WARMUP_ENABLE = 'emailWarmupEnable',
  EMAIL_WARMUP_GOOGLE_ENABLED = 'emailWarmupGoogleEnabled',
  EMAIL_WARMUP_MICROSOFT_ENABLED = 'emailWarmupMicrosoftEnabled',
  EMAIL_WARMUP_CUSTOM_DOMAIN_ENABLED = 'emailWarmupCustomDomainEnabled',
}

export enum typeOfCompany {
  franchise = 'franchise',
  frandev = 'frandev',
}
