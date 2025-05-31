import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation } from '@nestjs/swagger';
import { UserResponse } from '../../user/interface/user.interface';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthGuardUser } from '../guard/auth.guard';
import { LoginResponse } from '../interface/auth.interface';
import { AuthLoginService } from '../service/auth-login.service';
import { AuthService } from '../service/auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authLoginService: AuthLoginService,
  ) {}

  @Post('/signup')
  @ApiOperation({
    summary:
      "Registers a new user in the system. Validates the user's information, creates the user in the database, and returns a token for the user to use in subsequent requests.",
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({
    summary:
      "Validates the user's credentials, checks the user's status, and if everything is valid, generates a JWT token for the user and updates the user's last login time.",
  })
  login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authLoginService.login(loginDto, req);
  }

  @UseGuards(AuthGuardUser)
  @Get('/me')
  @ApiOperation({
    summary: "Retrieves the user's information based on the provided ID.",
  })
  getMe(@Request() req) {
    return this.authService.getMe(req?.user?._id);
  }

  // @Post('/create-account')
  // @ApiOperation({
  //   summary:
  //     'Creates a new user account. Checks if user exists, hashes the password, creates the user in the database, confirms the users email.',
  // })
  // createAccount(@Body() data: CreateAccountDto): Promise<UserResponse> {
  //   // return this.authService.createAccount(data);
  // }
}
