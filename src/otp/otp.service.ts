import { BadRequestException, Injectable } from '@nestjs/common';
import { randomSixDigit } from 'src/constants/helpers';
import { PrismaService } from 'src/prisma.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class OtpService {
   constructor(
      private db: PrismaService,
      private smsService: SmsService,
   ) { }
   async createOrUpdateOTP(phoneNumber: string, otpCode: string) {
      try {
         const code = otpCode ?? randomSixDigit().toString();
         const otp = await this.db.otpCode.upsert({
            create: {
               code: code,
               phoneNumber: phoneNumber,
            },
            update: {
               code: code,
            },
            where: {
               phoneNumber: phoneNumber
            }
         });

         await this.smsService.netgsm({ code: code, phone: phoneNumber })

         console.log("OTP_CODE:", otp.code);


         return otp;
      } catch (error) {
         console.log("error", error);

         throw new BadRequestException('OTP Hatası!');
      }
   }
   async getOTP({ phoneNumber, code }) {
      try {
         const otp = await this.db.otpCode.findUnique({
            where: {
               phoneNumber: phoneNumber,
               code: code
            }
         });

         await this.deleteOTP(otp.id);

         return otp;
      } catch (error) {
         throw new BadRequestException('OTP Hatası!');
      }
   }

   async deleteOTP(id: string) {
      try {
         await this.db.otpCode.delete({
            where: {
               id: id
            }
         });
      } catch (error) {
         throw new BadRequestException("OTP Kodu hatası!");
      }
   }
}
