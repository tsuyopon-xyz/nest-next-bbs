import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/types';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types';
import { SignUpDto } from './dtos/signup.dto';
import { SendgridEmitter } from 'src/sendgrid/sendgrid.emitter';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sendgrid: SendgridEmitter,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   // Trim password from user object
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...result } = user;

    //   return result;
    // }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup({ name, email, password }: SignUpDto) {
    try {
      // ユーザー新規登録
      const user = await this.usersService.create(name, email, password);

      // 本登録の依頼メールの送信
      const from = process.env.SENDGRID_EMAIL_FROM;
      const to = user.email;
      const jwtForActivate = 'todo-implement-fwt-feature';

      this.sendgrid.sendSignUpConfirmMail(to, from, jwtForActivate);
    } catch (error) {
      throw error;
    }
  }
}
