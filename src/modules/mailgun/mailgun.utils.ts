import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

export const getBasicAuth = (
  accountUsername: string,
  accountPassword: string,
): string => {
  return `Basic ${Buffer.from(`${accountUsername}:${accountPassword}`).toString(
    'base64',
  )}`;
};

export const processInternalError = (
  error: unknown,
  modulePrefix = '',
): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new InternalServerErrorException(
        `Server error [${modulePrefix}]: ${error.response.status} - ${
          error.response.data?.message || 'No details'
        }`,
      );
    } else if (error.request) {
      throw new InternalServerErrorException(
        'No response received from the server [${modulePrefix}]',
      );
    } else {
      throw new InternalServerErrorException(error.message);
    }
  } else {
    throw new InternalServerErrorException(
      error instanceof Error
        ? error.message
        : `Unable to send the message [${modulePrefix}]`,
    );
  }
};
