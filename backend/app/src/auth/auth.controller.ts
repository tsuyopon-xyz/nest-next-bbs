import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dtos/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('signout')
  async signout(@Request() req) {
    return this.authService.signout(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req, @Headers('authorization') authorization) {
    return this.authService.refreshToken(req.user, authorization);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get('confirm-email')
  async confirmEmail(@Res() res: Response, @Query('token') token: string) {
    try {
      const email = await this.authService.decodeConfirmationToken(token);
      await this.authService.confirmEmail(email);
      res.redirect('http://localhost:3000/?confirm=succeeded');
    } catch (error) {
      console.log('confirm error : ' + error);
      return res.redirect('http://localhost:3000/?confirm=failed');
    }
  }
}
