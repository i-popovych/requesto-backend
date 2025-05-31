import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAi from 'openai';
import { CreateChatCompletionDto } from './dto/create-chat-completion.dto';
import {
  GetOpenAiResultInterface,
  GetQuestionnaireResponse,
  OpenAiResponse,
} from './interface/open-ai.interface';
import { OPEN_AI_MESSAGE } from './message/open-ai.message';
import { OpenAIModels } from './open-ai.enum';
import { promptData } from './utils/open-ai.util';

@Injectable()
export class OpenAiService {
  private openAi;
  constructor(private readonly configService: ConfigService) {
    this.openAi = new OpenAi({
      organization: this.configService.get<string>('openAi.organizationId'),
      apiKey: this.configService.get<string>('openAi.apiKey'),
    });
  }

  async create(payload: CreateChatCompletionDto): Promise<OpenAiResponse> {
    try {
      const { content, model = OpenAIModels.GPT_4O_MINI } = payload;

      const completion = await this.openAi.chat.completions.create({
        model,
        messages: [
          {
            role: 'user',
            content: content.slice(0, 3500), // Truncate to 3500 characters
          },
        ],
        temperature: 0.2,
        top_p: 0.1,
        // Set max token
        // max_tokens: 36790,
        frequency_penalty: 0.2,
        presence_penalty: 0.2,
      });

      return {
        data: {
          message: OPEN_AI_MESSAGE.createCompletionSuccess,
          completion: completion.choices[0],
        },
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || OPEN_AI_MESSAGE.createCompletionError,
      );
    }
  }

  delay = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

  async handleWithPrompt(
    companyId,
    companyName,
    website,
    ownerUserEmail,
    questionnaires,
    teamMembers,
  ) {
    if (questionnaires) {
      const prompt = promptData(
        questionnaires,
        companyName,
        website,
        teamMembers,
      );
      const result = await Promise.all(
        prompt.map(async (item) => {
          const openAiResult = await this.create({ content: item });
          return openAiResult?.data?.completion?.message?.content || '';
        }),
      );

      if (result) {
        const joinResult = result.join('\n \n');

        const notifyQuestionAndAnswerData = {
          'Company name': companyName,
          "Company's owner email": ownerUserEmail,
          'Submitted date': new Date(),
          'Questions + Answers': questionnaires.map((item) => ({
            Question: item?.question,
            Answer: item?.answer,
          })),
        };

        return {
          data: {
            result: joinResult,
            message: OPEN_AI_MESSAGE.getQuestionnaireResultSuccess,
          },
        };
      }
    }
  }

  // waiting remove
  async getQuestionnaireResult(
    payload: GetOpenAiResultInterface,
  ): Promise<GetQuestionnaireResponse> {
    try {
      const {
        companyId,
        companyName,
        website,
        ownerUserEmail,
        teamMembers,
        // surveySession,
        formResponse: questionnaires,
      } = payload;

      // const questionnairesData: any =
      //   await this.surveyService.getQuestionnairesSection(surveySession);

      // const questionnaires = questionnairesData?.questionnaires?.questions;

      return await this.handleWithPrompt(
        companyId,
        companyName,
        website,
        ownerUserEmail,
        questionnaires,
        teamMembers,
      );
    } catch (error) {
      throw new BadRequestException(
        error?.message || OPEN_AI_MESSAGE.getQuestionnaireResultError,
      );
    }
  }

  // -------------------------------------------------------
  // ASSISTANTS
  // -------------------------------------------------------

  async createAssistant(payload) {
    try {
      return await this.openAi.beta.assistants.create(payload);
    } catch (error) {
      throw error?.error;
    }
  }

  async updateAssistant(assistantId, payload) {
    try {
      return await this.openAi.beta.assistants.update(assistantId, payload);
    } catch (error) {
      throw error?.error;
    }
  }

  async deleteAssistant(assistantId) {
    try {
      return await this.openAi.beta.assistants.del(assistantId);
    } catch (error) {
      throw error?.error;
    }
  }

  async createThreadAndRun(assistantId, thread, instructions = undefined) {
    try {
      return await this.openAi.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread,
        instructions,
      });
    } catch (error) {
      throw error?.error;
    }
  }

  async retrieveRun(threadId: string, runId: string) {
    try {
      return await this.openAi.beta.threads.runs.retrieve(threadId, runId);
    } catch (error) {
      throw error?.error;
    }
  }

  async listThreadMessages(threadId: string) {
    try {
      return await this.openAi.beta.threads.messages.list(threadId);
    } catch (error) {
      throw error?.error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.openAi.files.create({
        file,
        purpose: 'assistants',
      });
    } catch (error) {
      throw error?.error;
    }
  }
}
