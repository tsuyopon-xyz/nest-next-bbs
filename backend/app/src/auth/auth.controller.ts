import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dtos/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Request() req, @Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Get('confirm-email')
  async confirmEmail(@Res() res: Response, @Query('token') token: string) {
    // TODO: token(JWT)が有効化チェック
    try {
      const email = await this.authService.decodeConfirmationToken(token);
      await this.authService.confirmEmail(email);
      res.redirect('http://localhost:3000/?confirm=succeeded');
    } catch (error) {
      console.log('confirm error : ' + error);
      return res.redirect('http://localhost:3000/?confirm=failed');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // async login(@Request() req, @Body() _loginDto: LoginDto) {
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  // async login(@Request() req, @Body() _loginDto: LoginDto) {
  async getProfile(@Request() req) {
    return req.user;
  }
}
