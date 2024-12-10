import { BadRequestException, Injectable } from '@nestjs/common';
import { deleteFile } from 'src/constants/helpers';
import { PrismaService } from 'src/prisma.service';
import { addAbortSignal } from 'stream';

@Injectable()
export class AdvertisingService {
   constructor(
      private db: PrismaService
   ) { }

   async getAdvertisings() {
      const ads = await this.db.advertising.findMany({});
      return ads;
   }

   async createAdvertising(files) {
      try {
         await this.db.advertising.create({
            data: {
               source: `advertising/${files[0].filename}`
            }
         });

         return {
            message: "Reklam başarıyla oluşturuldu."
         }
      } catch (error) {
         throw new BadRequestException("Reklam oluşturulurken bir sorun oluştu!");
      }
   }

   async deleteAdvertising(id) {
      try {
         const ad = await this.db.advertising.delete({
            where: {
               id
            }
         });
         await deleteFile(ad.source);
         return { message: "Reklam başarıyla silindi.", ad };
      } catch (error) {
         throw new BadRequestException("Reklam silinirken bir sorun oluştu!");
      }

   }
}
