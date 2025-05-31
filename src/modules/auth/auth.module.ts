import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CompanyModule } from '../company/company.module';
import { JwtGlobalModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthLoginService } from './service/auth-login.service';
import { AuthService } from './service/auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthLoginService],
  exports: [AuthService, AuthLoginService],
  imports: [UserModule, JwtGlobalModule, CommonModule, CompanyModule],
})
export class AuthModule {}
