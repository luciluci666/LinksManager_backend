import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    
    return this.authService.login(request.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() request) {  
    return this.authService.login(request.user);
  }
}