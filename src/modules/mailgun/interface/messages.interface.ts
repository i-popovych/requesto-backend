export interface IMailgunMessage {
  from?: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: any[];
  inlineAttachments?: any[];
  headers?: Record<string, string>;
  inReplyTo?: string;
  references?: string;
  isTrackingClicks?: boolean;
  isTrackingOpens?: boolean;
}
