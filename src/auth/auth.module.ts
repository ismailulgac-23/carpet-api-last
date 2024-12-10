import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { OtpService } from 'src/otp/otp.service';
import { SmsService } from 'src/sms/sms.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, OtpService, SmsService]
})
export class AuthModule {}
