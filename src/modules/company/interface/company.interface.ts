import { Model, Types } from 'mongoose';

import { UserInterFace } from 'src/modules/user/interface/user.interface';
import { typeOfCompany } from '../enum';
import { Company } from '../schema/company.schema';

export interface CompanyModel extends Model<Company> {
  findByName(companyName: string): Promise<Company | null>;
}
export interface CompanyResponse {
  data: {
    company: CompanyInterFace;
    message: string;
  };
}

export interface EndTrialSubscriptionResponse {
  data: {
    message: string;
    subscription?: any;
  };
}

export interface ExistingMemberResponse {
  data: {
    status: boolean;
    message: string;
    existing: {
      email: string;
      message: string;
    }[];
  };
}

export interface RemoveInviteResponse {
  data: {
    message: string;
  };
}

export interface FindCompanyByUserResponse {
  data: {
    company: CompanyInterFace;
    message: string;
    invites: UserInterFace[];
  };
}

export interface FindTeamMemberResponse {
  data: {
    teamMember: Types.ObjectId[];
    message: string;
  };
}

export interface CompanyInterFace {
  _id: Types.ObjectId;
  companyName: string;
  website?: string;
  description?: string;
  avatar?: string;
  seats: number;
  billing?: Types.ObjectId;
  team?: Types.ObjectId[];
  type: string;
  isGhost: boolean;
  webVisitor?: WebVisitor;
  isDisabled?: boolean;
  emailMetadata: ICompanyEmailMetadata;
}

export interface ICompanyEmailMetadata {
  firstName: string;
  lastName: string;
  emailTemplate: string;
  emailSubject: string;
  emailGreetings: string[];
  emailIntros: string[];
  emailFooters: string[];
  isAutoEngage: boolean;
  lastConfigured: string;
  userEmail: string;
  deliveryTime: number;
}

export interface ICompany {
  _id: Types.ObjectId;
  companyName: string;
  website?: string;
  avatar?: string;
  seats: number;
  team?: Types.ObjectId[];
  type: string;
  isGhost: boolean;
  webVisitor?: WebVisitor;
  isDisabled?: boolean;
  managedBy?: string;
  typeOfCompany?: typeOfCompany.franchise | typeOfCompany.frandev;
  userFlow?: Types.ObjectId;
}

export interface PlatformMetadataItem {
  completedQuestionnaire: boolean;
  surveySession: string;
  outreaches: Types.ObjectId[];
  isDocumentsDisabled: boolean;
  isTemplatesDisabled: boolean;
  outreachResponseRemainingSubmissions: number;
  isOnboardingCallScheduled: boolean;
}

export enum WEB_VISITOR_SUBSCRIPTION_PERIOD {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export interface WebVisitor {
  sendRequest: boolean;
  accepted?: boolean;
  user?: UserInterFace;
  requestDate?: Date;
  enabled: boolean;
  preferences: {
    engageType: string;
    landingPageUrls: Array<string>;
  };
  monthlyLimit: number;
  limitStartDate: Date;
  period: WEB_VISITOR_SUBSCRIPTION_PERIOD;
}

export interface GetOutreachDocumentQuery {
  companyId: string;
  outreachDocURL: string;
}

export interface FindAllCompaniesResponse {
  data: {
    companies: Company[];
    message: string;
    total?: number;
  };
}

export interface FindAllTeamMembersResponse {
  data: {
    users: UserInterFace[];
    message: string;
    total?: number;
  };
}

export interface RemoveCompanyResponse {
  data: {
    message: string;
  };
}

export interface UpdateSeatsResponse {
  data: {
    message: string;
    team: Types.ObjectId[];
  };
}
