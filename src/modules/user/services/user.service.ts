import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';

import {
  Company,
  CompanyCollectionName,
} from 'src/modules/company/schema/company.schema';

import { User, UserCollectionName } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserCollectionName)
    private userModel: Model<User>,
    @InjectModel(CompanyCollectionName)
    private companyModel: Model<Company>,
  ) {}

  async create(user: any) {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.userModel.findById(id).populate('company');
  }

  async findByCompanyId(id: Types.ObjectId) {
    return await this.userModel.find({ company: id });
  }

  async update(id: string | ObjectId, data: any) {
    return await this.userModel.findByIdAndUpdate(id, data);
  }
}
