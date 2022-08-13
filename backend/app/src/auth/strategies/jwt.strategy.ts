import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { User } from 'src/users/types';
import { User } from '@prisma/client';
import { JWTPayload } from '../types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    });
  }

  async validate(
    payload: JWTPayload,
  ): Promise<Pick<User, 'id' | 'name' | 'email'> | null> {
    const user = await this.usersService.findByEmail(payload.email);
    console.log(user);
    if (!user) return null;

    return { id: user.id, name: user.name, email: user.email };
  }
}
