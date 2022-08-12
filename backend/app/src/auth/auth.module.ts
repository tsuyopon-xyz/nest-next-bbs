import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SendgridEmitter } from 'src/sendgrid/sendgrid.emitter';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      signOptions: {
        expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_SECONDS}s`,
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SendgridEmitter,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
