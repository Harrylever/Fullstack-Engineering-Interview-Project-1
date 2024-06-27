import {
  Res,
  Get,
  Post,
  Body,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user-module/user.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('api/v1')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth/register')
  public async registerUser(@Body() body: any, @Res() res: Response) {
    if (!body || Object.keys(body).length === 0) {
      throw new HttpException('Missing information', HttpStatus.BAD_REQUEST);
    }
    const result = await this.userService.create(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ success: true, message: 'created', data: result });
  }

  @SkipThrottle({ default: false })
  @Post('auth/login')
  public async login(@Body() body: any, @Res() res: Response) {
    const result = await this.authService.login(body);
    res.cookie('token', result.token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
    res.cookie('notToken', 'active', {
      path: '/',
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'login successful', data: { result } });
  }

  @Get('auth/logout')
  public async logout(@Res() res: Response) {
    res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });
    res.cookie('notToken', '', {
      path: '/',
      httpOnly: false,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'user logged out' });
  }
}
