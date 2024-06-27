import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user-module/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async login(body: LoginDto) {
    try {
      const { email, password } = body;

      const user = await this.userService.findOne({ email });
      if (!user) {
        throw new HttpException(
          {
            message: 'invalid email or password',
            success: false,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const isMatchingPasswords = await bcrypt.compare(password, user.password);
      if (!isMatchingPasswords) {
        throw new HttpException(
          { message: 'invalid email or password', success: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = this.jwtService.sign({
        id: user._id,
        email: user.email,
      });
      return { token, user };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
