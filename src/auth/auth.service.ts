import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomSixDigit } from 'src/constants/helpers';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
   constructor(
      private db: PrismaService,
      private otpService: OtpService,
      private jwt: JwtService,
   ) { }
   async getUser(credentials) {
      return credentials;
   }
   async login(phoneNumber: string) {

      try {
         const user = await this.db.user.upsert({
            create: {
               phoneNumber: phoneNumber,
               role: "CUSTOMER",
            },
            update: {},
            where: {
               phoneNumber: phoneNumber
            }
         });

         const otpCode = randomSixDigit().toString();

         await this.otpService.createOrUpdateOTP(phoneNumber, otpCode);

         return {
            message: "OTP Kodunuz telefon numaranıza başarılı bir şekilde gönderildi.",
         }
      } catch (error) {
         throw new BadRequestException("Giriş yapılırken bir sorun oluştu!");
      }
   }
   async verifyOTP({ code, phoneNumber }) {
      const otp = await this.otpService.getOTP({ code, phoneNumber, });

      if (!otp) {
         throw new BadRequestException("OTP Doğrulama kodunuz hatalı!");
      }

      const user = await this.db.user.findUnique({
         where: {
            phoneNumber: phoneNumber
         }
      });

      const token = this.jwt.sign({ user: user }, { secret: "SECRET" });

      return {
         message: "Giriş başarılı.",
         token: token
      }
   }
}
