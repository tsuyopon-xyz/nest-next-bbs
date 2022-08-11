import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/types';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // Trim password from user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
