import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
   ) { }
   @Post("login")
   login(
      @Body() { phoneNumber }
   ) {
      return this.authService.login(phoneNumber);
   }
   @Get("user")
   @UseGuards(AuthGuard)
   getUser(@Req() req) {
      return this.authService.getUser({ user: req.user, token: req.token });
   }
   @Post("verify-otp")
   verifyOTP(
      @Body() { phoneNumber, code }
   ) {
      return this.authService.verifyOTP({ code, phoneNumber });
   }
}
