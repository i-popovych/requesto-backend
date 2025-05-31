import { Types } from 'mongoose';
import {
  CompanyInterFace,
  ICompany,
} from 'src/modules/company/interface/company.interface';
import { RestrictedStatus } from '../enum/user.enum';

export interface UserResponse {
  data: {
    user: UserInterFace;
    message: string;
    token?: string;
  };
}

export interface NewUserResponse {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  title?: string;
  email: string;
  password: string;
  locale?: string;
  phone?: string;
  roles: string[];
  type: string;
  company: ICompany;
  googleToken?: string;
  calendarSyncToken?: string;
}

export interface FindAllUserResponse {
  data: {
    users: UserInterFace[];
    message: string;
    total?: number;
  };
}
export interface UserInterFace {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  title?: string;
  email: string;
  password: string;
  locale?: string;
  phoneDetails?: PhoneDetailsInterFace;
  isDisabled: boolean;
  roles: string[];
  inviteStatus: string;
  type: string;
  company: Types.ObjectId;
  subscribed?: boolean;
  googleToken?: string;
  calendarSyncToken?: string;
  referralClaimedCount?: number;
  emailMetadata?: EmailMetadata;
  createdAt?: string;
}

interface EmailMetadata {
  refreshToken: string; // for web visitor pixel
}

export interface RemoveUserResponse {
  data: {
    message: string;
  };
}
export interface ReactivateUserResponse {
  data: {
    message: string;
  };
}

export interface RestrictUserResponse {
  data: {
    message: string;
    status: RestrictedStatus;
  };
}

export interface UserPopulateAllInterFace {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  title?: string;
  email: string;
  locale?: string;
  phoneDetails?: PhoneDetailsInterFace;
  isDisabled: boolean;
  roles: string[];
  company: CompanyInterFace;
}

export interface PhoneDetailsInterFace {
  countryName: string;
  countryCode: string;
  number: string;
}

export interface DeviceTokenResponse {
  data: {
    message: string;
    token?: string;
  };
}

export interface UserExistsResponse {
  data: {
    message: string;
    isUserExist: boolean;
  };
}
