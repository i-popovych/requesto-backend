import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

@Injectable()
export class CalGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: RequestWithRawBody = context.switchToHttp().getRequest();

    const calSignature = request.headers['x-cal-signature-256'] as string;
    const calSecret = this.configService.get<string>('cal.secretKey');

    // Check if the signature is missing
    if (!calSignature) {
      throw new UnauthorizedException('Missing Cal.com Signature');
    }

    // Check if the webhook secret is available
    if (!calSecret) {
      throw new UnauthorizedException('Missing Cal.com Webhook Secret');
    }

    // Ensure rawBody is available
    const rawBody = request.rawBody;
    if (!rawBody) {
      throw new UnauthorizedException(
        'Missing raw body for signature verification',
      );
    }

    // Compute the HMAC SHA256 signature
    const computedSignature = createHmac('sha256', calSecret)
      .update(rawBody)
      .digest('hex');

    // Compare the signatures in a timing-safe manner
    const signatureIsValid = timingSafeEqual(
      Buffer.from(computedSignature),
      Buffer.from(calSignature),
    );

    if (!signatureIsValid) {
      throw new UnauthorizedException('Invalid Cal.com Signature');
    }
    return true;
  }
}
