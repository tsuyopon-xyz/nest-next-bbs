import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { User } from 'src/prisma/types';
import type { User as PrismaUser } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload, SigninResponse, Tokens } from './types';
import { SignUpDto } from './dtos/signup.dto';
import { SendgridEmitter } from 'src/sendgrid/sendgrid.emitter';
import { ConfigService } from '@nestjs/config';
import {
  bcryptHashWithSHA256,
  compareBcryptHashWithSHA256,
} from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sendgrid: SendgridEmitter,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email, password);
    return user;
  }

  async signin(user: User): Promise<SigninResponse> {
    const tokens = await this.getTokens(user);
    await this.updateHashedRefreshToken(user, tokens.refreshToken);

    return {
      name: user.name,
      email: user.email,
      ...tokens,
    };
  }

  async signout(user: User) {
    await this.usersService.update({
      id: user.id,
      hashedRefreshToken: null,
    });
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

      const jwt = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION'),
      });

      this.sendgrid.sendSignUpConfirmMail(to, from, jwt);
    } catch (error) {
      throw error;
    }
  }

  async requestResetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const from = process.env.SENDGRID_EMAIL_FROM;
    const to = user.email;

    const payload: JWTPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const jwt = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    this.sendgrid.sendRequestPasswordResetMail(to, from, jwt);
  }

  async resetPassword(userId: number, newPassword: string) {
    await this.usersService.resetPassword(userId, newPassword);
  }

  // 参考記事: https://wanago.io/2021/07/12/api-nestjs-confirming-email/
  async decodeConfirmationToken(jwt: string) {
    try {
      const payload = (await this.jwtService.verify(jwt, {
        secret: this.configService.get('JWT_SECRET'),
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

  async refreshToken(
    user: PrismaUser,
    authorization: string,
  ): Promise<SigninResponse> {
    const refreshToken = authorization.replace('Bearer', '').trim();
    const isRefreshTokenCorrect = await compareBcryptHashWithSHA256(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenCorrect) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user);
    await this.updateHashedRefreshToken(user, tokens.refreshToken);

    return {
      ...tokens,
      name: user.name,
      email: user.email,
    };
  }

  async updateHashedRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<void> {
    const bcryptHashedRefreshToken = await bcryptHashWithSHA256(refreshToken);

    await this.usersService.update({
      id: user.id,
      hashedRefreshToken: bcryptHashedRefreshToken,
    });
  }

  async getTokens(user: User): Promise<Tokens> {
    const payload: JWTPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
