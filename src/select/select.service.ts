import { Injectable } from '@nestjs/common';
import { SELECT_DATA } from '@prisma/client';
import { deleteFile } from 'src/constants/helpers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SelectService {
   constructor(
      private db: PrismaService
   ) { }
   async getSelects(type: string | undefined) {
      const selects = await this.db.select.findMany({
         where: {
            type: type as SELECT_DATA
         }
      });

      return selects;
   }
   async getSelect(id: string) {
      const select = await this.db.select.findFirst({
         where: {
            id: id
         }
      });

      return select;
   }
   async createSelect({ files, body }) {

      const select = await this.db.select.create({
         data: {
            name: body.name,
            type: body.type as SELECT_DATA,
            hit: 0,
            source: files.length ? `category/${files[0].filename}` : null
         }
      });

      return {
         message: "Başarıyla oluşturuldu.",
         select,
      }

   }
   async deleteSelect(id: string) {

      const select = await this.db.select.delete({
         where: {
            id: id
         }
      });

      await deleteFile(select.source);

      return {
         message: "Başarıyla silindi.",
         select,
      }

   }

   async updateSelect({ files, body, id }) {
      const select = await this.db.select.update({
         data: {
            name: body.name,
            type: body.type as SELECT_DATA,
            hit: 0,
            source: files.length ? `category/${files[0].filename}` : undefined
         },
         where: {
            id: id
         }
      });

      return {
         message: "Başarıyla güncellendi.",
         select,
      }
   }
}
