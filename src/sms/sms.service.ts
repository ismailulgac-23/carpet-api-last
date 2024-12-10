import { Injectable } from '@nestjs/common';
import { NetGsmSMSService } from 'netgsm-sms-sender';

@Injectable()
export class SmsService {
   async netgsm({ phone, code }) {

      const netGsmConfig = {
         usercode: "2166061123",
         password: "9AD93%E",
         msgheader: "2166061123"
      };


      const smsService = new NetGsmSMSService(netGsmConfig);

      const smsRequest = {
         gsmno: phone,
         message: `PaşaHome: Giriş yapmak için doğrulama kodunuz: ${code}. Kodun geçerlilik süresi 5 dakikadır. Güvenliğiniz için bu kodu kimseyle paylaşmayın.`,
         dil: "TR"
      };

      const response = await smsService.sendSMS(smsRequest);
      return response;

   }
}
