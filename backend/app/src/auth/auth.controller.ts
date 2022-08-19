import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dtos/signup.dto';
import { RequestPasswordResetDto } from './dtos/request-password-reset.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req, @Res() res: ExpressResponse) {
    const { accessToken, refreshToken, ...rest } =
      await this.authService.signin(req.user);

    res.cookie(process.env.COOKIE_JWT_KEY, accessToken, {
      httpOnly: true,
      signed: true,
    });
    res.cookie(process.env.COOKIE_REFRESH_JWT_KEY, refreshToken, {
      httpOnly: true,
      signed: true,
    });

    res.json({
      ...rest,
      accessToken,
      refreshToken,
    });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('signout')
  async signout(@Res() res: ExpressResponse) {
    res.clearCookie(process.env.COOKIE_JWT_KEY);
    res.clearCookie(process.env.COOKIE_REFRESH_JWT_KEY);

    res.status(HttpStatus.OK).json({});
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req, @Headers('authorization') authorization) {
    return this.authService.refreshToken(req.user, authorization);
  }

  @Get('confirm-email')
  async confirmEmail(
    @Res() res: ExpressResponse,
    @Query('token') token: string,
  ) {
    try {
      const email = await this.authService.decodeConfirmationToken(token);
      await this.authService.confirmEmail(email);
      res.redirect('http://localhost:3000/?confirm=succeeded');
    } catch (error) {
      console.log('confirm error : ' + error);
      return res.redirect('http://localhost:3000/?confirm=failed');
    }
  }

  @Post('request-password-reset')
  async requestPasswordRest(@Body() body: RequestPasswordResetDto) {
    await this.authService.requestResetPassword(body.email);
  }

  @UseGuards(JWTAuthGuard)
  @Post('reset-password')
  async resetPassword(@Req() req, @Body() body: ResetPasswordDto) {
    await this.authService.resetPassword(req.user.id, body.password);
  }
}
