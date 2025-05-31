import { Expose, Type } from 'class-transformer';

export class DnsRecordDto {
  @Expose({ name: 'is_active' })
  isActive: boolean;

  @Expose()
  cached: string[];

  @Expose()
  priority?: string;

  @Expose({ name: 'record_type' })
  recordType: string;

  @Expose()
  valid: string;

  @Expose()
  value: string;

  @Expose()
  name?: string;
}

export class DomainDto {
  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose()
  id: string;

  @Expose({ name: 'is_disabled' })
  isDisabled: boolean;

  @Expose()
  name: string;

  @Expose({ name: 'require_tls' })
  requireTls: boolean;

  @Expose({ name: 'skip_verification' })
  skipVerification: boolean;

  @Expose({ name: 'smtp_login' })
  smtpLogin: string;

  @Expose({ name: 'spam_action' })
  spamAction: string;

  @Expose()
  state: string;

  @Expose()
  type: string;

  @Expose({ name: 'use_automatic_sender_security' })
  useAutomaticSenderSecurity: boolean;

  @Expose({ name: 'web_prefix' })
  webPrefix: string;

  @Expose({ name: 'web_scheme' })
  webScheme: string;

  @Expose()
  wildcard: boolean;
}

export class MailgunResponseDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => DomainDto)
  domain: DomainDto;

  @Expose({ name: 'receiving_dns_records' })
  @Type(() => DnsRecordDto)
  receivingDnsRecords: DnsRecordDto[];

  @Expose({ name: 'sending_dns_records' })
  @Type(() => DnsRecordDto)
  sendingDnsRecords: DnsRecordDto[];
}

export class DomainItem {
  @Expose({ name: 'created_at' })
  createdAt: Date;

  id: string;

  @Expose({ name: 'is_disabled' })
  isDisabled: boolean;

  name: string;

  @Expose({ name: 'require_tls' })
  requireTls: boolean;

  @Expose({ name: 'skip_verification' })
  skipVerification: boolean;

  @Expose({ name: 'smtp_login' })
  smtpLogin: string;

  @Expose({ name: 'spam_action' })
  spamAction: string;

  state: string;

  type: string;

  @Expose({ name: 'use_automatic_sender_security' })
  useAutomaticSenderSecurity: boolean;

  @Expose({ name: 'web_prefix' })
  webPrefix: string;

  @Expose({ name: 'web_scheme' })
  webScheme: string;

  wildcard: boolean;
}

export class MailgunDomainResponseDto {
  @Expose({ name: 'total_count' })
  totalCount: number;

  @Type(() => DomainItem)
  items: DomainItem[];
}

export class MailgunWebhookRequest {
  @Expose({ name: 'Content-Type' })
  contentType: string;

  @Expose({ name: 'Date' })
  date: string;

  @Expose({ name: 'Dkim-Signature' })
  dkimSignature: string;

  @Expose({ name: 'From' })
  from: string;

  @Expose({ name: 'In-Reply-To' })
  inReplyTo: string;

  @Expose({ name: 'Message-Id' })
  messageId: string;

  @Expose({ name: 'Mime-Version' })
  mimeVersion: string;

  @Expose({ name: 'Received' })
  received: string;

  @Expose({ name: 'References' })
  references: string;

  @Expose({ name: 'Subject' })
  subject: string;

  @Expose({ name: 'To' })
  to: string;

  @Expose({ name: 'X-Envelope-From' })
  xEnvelopeFrom: string;

  @Expose({ name: 'X-Gm-Message-State' })
  xGmMessageState: string;

  @Expose({ name: 'X-Google-Dkim-Signature' })
  xGoogleDkimSignature: string;

  @Expose({ name: 'X-Google-Smtp-Source' })
  xGoogleSmtpSource: string;

  @Expose({ name: 'X-Mailgun-Incoming' })
  xMailgunIncoming: string;

  @Expose({ name: 'X-Received' })
  xReceived: string;

  @Expose({ name: 'body-html' })
  bodyHtml: string;

  @Expose({ name: 'body-plain' })
  bodyPlain: string;

  @Expose({ name: 'domain' })
  domain: string;

  @Expose({ name: 'message-headers' })
  messageHeaders: string;

  @Expose({ name: 'message-url' })
  messageUrl: string;

  @Expose({ name: 'recipient' })
  recipient: string;

  @Expose({ name: 'sender' })
  sender: string;

  @Expose({ name: 'signature' })
  signature: string;

  @Expose({ name: 'stripped-html' })
  strippedHtml: string;

  @Expose({ name: 'stripped-signature' })
  strippedSignature: string;

  @Expose({ name: 'stripped-text' })
  strippedText: string;

  @Expose({ name: 'timestamp' })
  timestamp: string;

  @Expose({ name: 'token' })
  token: string;
}

export class RouteItems {
  @Expose()
  actions: string[];

  @Expose({ name: 'created_at' })
  createdAt: string;

  @Expose()
  description: string;

  @Expose()
  expression: string;

  @Expose()
  id: string;

  @Expose()
  priority: number;
}

export class MailgunRoutes {
  @Expose()
  @Type(() => RouteItems)
  items: RouteItems[];

  @Expose({ name: 'total_count' })
  totalCount: number;
}

export class MessageHeaders {
  @Expose()
  name: string;

  @Expose()
  value: string;
}

export class EmailMessageContent {
  @Expose({ name: 'Content-Transfer-Encoding' })
  contentTransferEncoding: string;

  @Expose({ name: 'Content-Type' })
  contentType: string;

  @Expose()
  from: string;

  @Expose({ name: 'Message-Id' })
  messageId: string;

  @Expose({ name: 'Mime-Version' })
  mimeVersion: string;

  @Expose()
  subject: string;

  @Expose()
  to: string;

  @Expose()
  sender: string;

  @Expose()
  recipients: string;

  @Expose({ name: 'body-html' })
  bodyHtml: string;

  @Expose({ name: 'body-plain' })
  bodyPlain: string;

  @Expose()
  attachments: any[];

  @Expose({ name: 'content-id-map' })
  contentIdMap: object;

  @Expose({ name: 'message-headers' })
  @Type(() => MessageHeaders)
  messageHeaders: MessageHeaders[];

  @Expose({ name: 'stripped-html' })
  strippedHtml: string;

  @Expose({ name: 'stripped-text' })
  strippedText: string;

  @Expose({ name: 'stripped-signature' })
  strippedSignature: string;
}

export class SignatureDto {
  @Expose()
  token: string;

  @Expose()
  timestamp: string;

  @Expose()
  signature: string;
}

export class FlagsDto {
  @Expose({ name: 'is-authenticated' })
  isAuthenticated: boolean;

  @Expose({ name: 'is-routed' })
  isRouted: boolean;

  @Expose({ name: 'is-big' })
  isBig: boolean;

  @Expose({ name: 'is-system-test' })
  isSystemTest: boolean;

  @Expose({ name: 'is-test-mode' })
  isTestMode: boolean;
}

export class HeadersDto {
  @Expose({ name: 'message-id' })
  messageId: string;

  @Expose()
  from: string;

  @Expose()
  to: string;

  @Expose()
  subject: string;
}

export class MessageDto {
  @Expose()
  attachments: any[];

  @Expose()
  @Type(() => HeadersDto)
  headers: HeadersDto;

  @Expose()
  size: number;
}

export class StorageDto {
  @Expose()
  key: string;

  @Expose()
  url: string;
}

export class DeliveryStatusDto {
  @Expose({ name: 'attempt-no' })
  attemptNo: number;

  @Expose()
  code: number;

  @Expose()
  message: string;

  @Expose()
  description: string;

  @Expose({ name: 'session-seconds' })
  sessionSeconds: number;

  @Expose({ name: 'enhanced-code' })
  enhancedCode: string;

  @Expose({ name: 'first-delivery-attempt-seconds' })
  firstDeliveryAttemptSeconds: number;

  @Expose({ name: 'bounce-type' })
  bounceType: string;
}

export class EnvelopeDto {
  @Expose()
  sender: string;

  @Expose()
  targets: string;

  @Expose()
  transport: string;

  @Expose({ name: 'sending-ip' })
  sendingIp: string;
}

export class EventDataDto {
  @Expose()
  event: string;

  @Expose()
  id: string;

  @Expose()
  timestamp: number;

  @Expose()
  @Type(() => FlagsDto)
  flags: FlagsDto;

  @Expose()
  @Type(() => MessageDto)
  message: MessageDto;

  @Expose()
  @Type(() => StorageDto)
  storage: StorageDto;

  @Expose({ name: 'log-level' })
  logLevel: string;

  @Expose()
  recipient: string;

  @Expose({ name: 'recipient-domain' })
  recipientDomain: string;

  @Expose({ name: 'primary-dkim' })
  primaryDkim: string;

  @Expose()
  tags: string[];

  @Expose()
  reason: string;

  @Expose()
  severity: string;

  @Expose()
  campaigns: string[];

  @Expose({ name: 'delivery-status' })
  @Type(() => DeliveryStatusDto)
  deliveryStatus: DeliveryStatusDto;

  @Expose()
  @Type(() => EnvelopeDto)
  envelope: EnvelopeDto;

  @Expose({ name: 'user-variables' })
  userVariables: Map<string, string>;
}

export class WebhookEventDto {
  @Expose()
  @Type(() => SignatureDto)
  signature: SignatureDto;

  @Expose({ name: 'event-data' })
  @Type(() => EventDataDto)
  eventData: EventDataDto;
}

export class AttachmentDto {
  @Expose()
  name: string;

  @Expose({ name: 'content-type' })
  contentType: string;

  @Expose()
  size: number;

  @Expose()
  url: string;
}
