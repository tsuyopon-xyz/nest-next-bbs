import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { User } from 'src/prisma/types';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload, SigninResponse } from './types';
import { SignUpDto } from './dtos/signup.dto';
import { SendgridEmitter } from 'src/sendgrid/sendgrid.emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sendgrid: SendgridEmitter,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOne(email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  async signin(user: User): Promise<SigninResponse> {
    const payload: JWTPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };
    return {
      name: user.name,
      email: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup({ name, email, password }: SignUpDto) {
    try {
      // ユーザー新規登録
      const user = await this.usersService.create(name, email, password);

      // 本登録の依頼メールの送信
      const from = process.env.SENDGRID_EMAIL_FROM;
      const to = user.email;

      const payload: JWTPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
      };
      const jwt = this.jwtService.sign(payload);

      this.sendgrid.sendSignUpConfirmMail(to, from, jwt);
    } catch (error) {
      throw error;
    }
  }

  // 参考記事: https://wanago.io/2021/07/12/api-nestjs-confirming-email/
  async decodeConfirmationToken(jwt: string) {
    try {
      const payload = (await this.jwtService.verify(jwt, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      })) as JWTPayload;

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.update({ id: user.id, isEmailConfirmed: true });
  }
}
