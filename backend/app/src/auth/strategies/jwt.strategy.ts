import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { User } from 'src/users/types';
import { User } from '@prisma/client';
import { JWTPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    });
  }

  async validate(
    payload: JWTPayload,
  ): Promise<Pick<User, 'id' | 'name' | 'email'>> {
    return { id: payload.sub, name: payload.name, email: payload.email };
  }
}
