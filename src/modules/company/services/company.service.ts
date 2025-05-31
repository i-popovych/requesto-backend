import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';

import { UserCollectionName } from 'src/modules/user/schemas/user.schema';

import { UserInterFace } from '../../user/interface/user.interface';
import { UserService } from '../../user/services/user.service';

import { MailgunMessageService } from 'src/modules/mailgun/services/mailgun-message.service';
import { OpenAiService } from 'src/modules/open-ai/open-ai.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Company, CompanyCollectionName } from '../schema/company.schema';
import { UpdateChatSettingsDto } from 'src/modules/chat/dto/update-settings.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyCollectionName)
    private companyModel: Model<Company>,
    @InjectModel(UserCollectionName)
    private userService: UserService,
  ) {}

  async findOneById(id: string) {
    try {
      const company = this.companyModel.findById(id);

      if (!company) {
        throw new BadRequestException();
      }

      return company;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async create(dto: CreateCompanyDto, user: UserInterFace) {
    try {
      const company = await this.companyModel.create({
        companyName: dto.companyName,
        description: dto.description,
      });

      await this.userService.update(user._id.toString(), {
        company: company._id,
      });

      return {
        data: company,
        message: 'Company created',
      };
    } catch {
      throw new BadRequestException();
    }
  }

  async getTeamMembers(companyId: mongoose.Types.ObjectId) {
    try {
      const userGroup = await this.userService.findByCompanyId(companyId);

      return {
        message: 'Found team members',
        data: userGroup,
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
