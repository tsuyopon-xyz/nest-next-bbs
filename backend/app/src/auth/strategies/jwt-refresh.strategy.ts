import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JWTPayload } from '../types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(
    payload: JWTPayload,
  ): Promise<Pick<
    User,
    'id' | 'name' | 'email' | 'hashedRefreshToken'
  > | null> {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      hashedRefreshToken: user.hashedRefreshToken,
    };
  }
}
