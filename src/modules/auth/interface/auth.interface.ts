import { UserInterFace } from 'src/modules/user/interface/user.interface';

export interface LoginResponse {
  data: { user: UserInterFace; token: string; message: string };
}

export interface UpdatePasswordResponse {
  data: { message: string };
}

export interface SocialResponse {
  data: {
    socialProfile: {
      authMethod: string;
      authId?: string;
      email: string;
      name?: string;
      avatar?: string;
    };
    user?: UserInterFace;
    token?: string;
    message?: string;
  };
}

export interface GenerateTokenValidationResponse {
  data: {
    isValid: boolean;
  };
}
