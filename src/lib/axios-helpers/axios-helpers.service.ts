import { BadGatewayException } from '@nestjs/common';
import axiosInstance from '../axios';

export class AxiosHelpers {
  async getAxiosRequest<T>(url: string, accessToken: string) {
    try {
      const axios = axiosInstance(url, accessToken);
      const result: T = await axios.get(url);
      return result;
    } catch (error) {
      throw new BadGatewayException(error?.message);
    }
  }
}
