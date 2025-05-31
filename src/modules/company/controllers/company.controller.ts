import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { UserInterFace } from 'src/modules/user/interface/user.interface';
import { AuthGuardUser } from '../../auth/guard/auth.guard';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from 'src/modules/company/dto/create-company.dto';
import { UpdateChatSettingsDto } from 'src/modules/chat/dto/update-settings.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuardUser)
  @Get('/team')
  @ApiOperation({
    summary: 'Get company team members.',
  })
  async getTeamMembers(@User() user: UserInterFace) {
    return await this.companyService.getTeamMembers(user.company._id);
  }

  @UseGuards(AuthGuardUser)
  @Post('/create')
  @ApiOperation({
    summary: 'Create company.',
  })
  async create(@Body() dto: CreateCompanyDto, @User() user: UserInterFace) {
    return await this.companyService.create(dto, user);
  }
}
