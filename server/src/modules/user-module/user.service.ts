import {
  HttpStatus,
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async create(user: CreateUserDto) {
    try {
      const exists = await this.userModel.findOne({ email: user.email });
      if (exists) {
        throw new HttpException(
          { message: 'user already exists', success: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await this.hashPassword(user.password);
      user.password = hashedPassword;
      const createdUser = await this.userModel.create(user);
      return createdUser;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async findById(id: string) {
    try {
      return await this.userModel.findById(id).select('-password');
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  public async findOne(options?: object) {
    try {
      return await this.userModel.findOne(options);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  public async updateById(id: string, data: CreateUserDto) {
    try {
      const exists = await this.userModel.findById(id);
      if (!exists) {
        throw new HttpException(
          { message: 'user already exists', success: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.userModel.findByIdAndUpdate(id, data);
    } catch (err) {
      throw new InternalServerErrorException('');
    }
  }

  public async deleteById(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
