import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CompanyCollectionName } from 'src/modules/company/schema/company.schema';
import { UserRole } from 'src/modules/user/enum/user.enum';

export const UserCollectionName = 'User';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    isRequired: true,
  })
  firstName: string;

  @Prop({
    isRequired: true,
  })
  lastName: string;

  @Prop({
    isRequired: false,
  })
  avatar: string;

  @Prop({ unique: [true, 'Duplicated email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String], default: [UserRole.SUPPORT] })
  roles: string[];

  @Prop({
    type: Types.ObjectId,
    ref: CompanyCollectionName,
  })
  company: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
