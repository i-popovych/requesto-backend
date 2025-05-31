import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { plainToInstance } from 'class-transformer';
import * as R from 'ramda';
import { CommonResponse } from 'src/modules/common/interface/common.interface';
import {
  AttachmentDto,
  EmailMessageContent,
} from '../dto/mailgun-response.dto';
import { IMailgunMessage } from '../interface/messages.interface';
import { getBasicAuth, processInternalError } from '../mailgun.utils';

@Injectable()
export class MailgunMessageService {
  private readonly accountUsername = 'api';
  private accountPassword: string;
  private mailgunHttpInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.accountPassword = this.configService.get<string>(
      'emails.mailgunAPIKey',
    );
    this.mailgunHttpInstance = axios.create({
      baseURL: this.configService.get<string>('emails.mailgunBaseUrl'),
      headers: {
        Authorization: getBasicAuth(this.accountUsername, this.accountPassword),
      },
    });
  }

  // Note: In mailgun emails, html and text both not work together, [high priority on html]
  async sendMessage(payload: IMailgunMessage): Promise<CommonResponse> {
    try {
      const {
        from = this.configService.get<string>('emails.mailgunDomain'),
        to,
        subject,
        html = '',
        text = '',
        attachments = [],
        inlineAttachments = [],
        headers = {},
        inReplyTo = null,
        references = null,
        isTrackingClicks = false,
        isTrackingOpens = false,
      } = payload;

      const domain = 'sandboxf443ecc04d684a90acf240c8a098863f.mailgun.org';

      const formRequest = new FormData();
      formRequest.append('to', to);
      formRequest.append('from', from);
      formRequest.append('subject', subject);

      if (text) formRequest.append('text', text);
      if (html) formRequest.append('html', html);

      Object.entries(headers).forEach(([key, value]) =>
        formRequest.append(`${key}`, `${value}`),
      );

      // Regular attachments
      attachments.forEach((attachment: Express.Multer.File) => {
        formRequest.append(
          'attachment',
          new Blob([attachment.buffer], { type: attachment.mimetype }),
          attachment.originalname,
        );
      });

      // Inline attachments
      inlineAttachments.forEach((attachment: Express.Multer.File) => {
        formRequest.append(
          'inline',
          new Blob([attachment.buffer], { type: attachment.mimetype }),
          attachment.originalname,
        );
      });

      // Tracking options
      if (isTrackingClicks) formRequest.append('o:tracking-clicks', 'yes');
      if (isTrackingOpens) formRequest.append('o:tracking-opens', 'yes');

      // Reply message options
      if (inReplyTo) formRequest.append('h:In-Reply-To', inReplyTo);
      if (references) formRequest.append('h:References', references);

      for (const [key, value] of formRequest.entries()) {
        // Check if the value is a Blob or a string
        if (value instanceof Blob) {
          console.log(`FormRequest -> ${key}: [Blob object]`);
        } else {
          console.log(`FormRequest -> ${key}: ${value}`);
        }
      }

      const response = await this.mailgunHttpInstance.post(
        `/v3/${domain}/messages`,
        formRequest,
      );

      return { success: true, data: { ...response.data } };
    } catch (error) {
      processInternalError(error);
    }
  }

  /**
   *
   * @param messageId Mailgun Message Id
   * @param domain Sender domain
   * @returns EmailMessageContent (parsed response object from message apis)
   */
  async retrieveMessage(
    messageId: string,
    domain: string,
  ): Promise<EmailMessageContent> {
    try {
      let storageKey;
      let parsedMessageId = messageId.replace(`<`, '');
      parsedMessageId = parsedMessageId.replace(`>`, '');

      const events = await this.mailgunHttpInstance.get(
        `/v3/${domain}/events?message-id=${parsedMessageId}`,
      );

      const itemWithStorageKey = R.find(
        R.path(['storage', 'key']),
        events.data?.items || [],
      );

      storageKey = itemWithStorageKey?.storage?.key;

      if (!events.data?.items?.length) {
        // Note!: messageId query param doesn't work with receiving messages
        const events = await this.mailgunHttpInstance.get(
          `/v3/${domain}/events`,
        );

        const messageEvent = events?.data?.items?.find(
          (event) => event?.message?.headers['message-id'] === parsedMessageId,
        );

        storageKey = messageEvent?.storage?.key;
      }

      if (!storageKey) {
        throw new InternalServerErrorException(
          `Cannot find the storage key for message-id: ${parsedMessageId} and domain: ${domain}`,
        );
      }

      const response = await this.mailgunHttpInstance.get(
        `/v3/domains/${domain}/messages/${storageKey}`,
      );

      const message = plainToInstance(EmailMessageContent, response.data, {
        excludeExtraneousValues: true,
      });

      return message;
    } catch (error) {
      processInternalError(error);
    }
  }

  async downloadAttachment(attachment: AttachmentDto) {
    const { url, name, contentType } = attachment;

    try {
      const response = await this.mailgunHttpInstance.get(url, {
        responseType: 'arraybuffer',
      });

      const fileBuffer = Buffer.from(response.data);

      return {
        buffer: fileBuffer,
        originalname: name,
        mimetype: contentType,
      };
    } catch (error) {
      console.error('Error during file download or upload:', error.message);
      throw error;
    }
  }
}
