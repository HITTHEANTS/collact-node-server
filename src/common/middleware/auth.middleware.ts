import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UsersService } from '../../users/users.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = this.configService.get('JWT_SECRET');
    const authHeaders = req.headers.authorization;

    // authHeaders should comes like "JWT blah-blah-blah" or "Bearer blah-blah-blah"
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret) as JwtPayloadDto;
      const user = await this.userService.findOneByUid(decoded.uid);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
