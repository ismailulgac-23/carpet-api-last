import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from 'src/prisma.service';
import { SmsService } from 'src/sms/sms.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaService, SmsService]
})
export class OtpModule {}
