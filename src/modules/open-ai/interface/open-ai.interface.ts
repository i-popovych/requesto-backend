export interface OpenAiResponse {
  data: {
    message: string;
    completion: any;
  };
}
export class GetOpenAiResultInterface {
  companyId: string;
  companyName: string;
  teamMembers: string[];
  website: string;
  // surveySession: string;
  ownerUserEmail: string;
  formResponse: Array<{ question: string; answer: string }>;
}

export class GetOpenAiResultTypeformInterface {
  companyName: string;
  companyId: string;
  website: string;
  ownerUserEmail: string;
}

export interface GetQuestionnaireResponse {
  data: {
    message: string;
    result: string;
  };
}
