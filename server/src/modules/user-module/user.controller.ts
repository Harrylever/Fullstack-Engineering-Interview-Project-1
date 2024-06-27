import {
  Res,
  Get,
  Put,
  Req,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { SkipThrottle } from '@nestjs/throttler';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@SkipThrottle()
@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users/single')
  public async findById(
    @Req() req: Request & { user: { id: string } },
    @Res() res: Response,
  ) {
    const id = req.user.id;
    const result = await this.userService.findById(id);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'found', data: result });
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id/update')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: CreateUserDto,
  ) {
    const result = await this.userService.updateById(id, body);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'updated', data: result });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id/delete')
  public async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.deleteById(id);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'deleted', data: result });
  }
}
