import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Request() req, @Body() body: SignUpDto) {
    return this.authService.signup(body);
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
