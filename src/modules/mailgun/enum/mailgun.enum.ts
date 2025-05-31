export enum StatResolution {
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
}

export enum DomainState {
  Active = 'active',
  Unverified = 'unverified',
  Disabled = 'disabled',
}

export enum EventState {
  accepted = 'accepted',
  clicked = 'clicked',
  opened = 'opened',
  unsubscribed = 'unsubscribed',
  delivered = 'delivered',
  permanent_fail = 'permanent_fail',
  temporary_fail = 'temporary_fail',
  complained = 'complained',
}

export enum WebhookEvent {
  failed = 'failed',
  opened = 'opened',
}

export enum DomainPurpose {
  WEB_VISITOR_PIXEL_OR_EMAIL_CAMPAIGN = 'web_visitor_pixel_or_email_campaign',
  EMAIL_WARMUP = 'email_warmup',
}
