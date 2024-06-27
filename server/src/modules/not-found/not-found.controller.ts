import { Request, Response } from 'express';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';

@Controller()
export class NotFoundController {
  @Get('*')
  handleNotFound(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.NOT_FOUND).json({
      path: req.url,
      message: 'Route not found',
    });
  }
}
