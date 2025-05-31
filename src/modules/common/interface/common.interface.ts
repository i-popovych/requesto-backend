export interface GetSendMailData {
  subjectEmail: string;
  title: string;
  siteName: string;
  team: string;
  logo: string;
}

export interface SpinTaxConfig {
  greetings?: string[];
  intro?: string[];
  signOff?: string[];
}

export interface CommonResponse {
  success: boolean;
  message?: string;
  data?: any;
}
