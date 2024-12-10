import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { deleteFile } from 'src/constants/helpers';
import { PrismaService } from 'src/prisma.service';
import { productPublicIncludes } from 'src/utils/includes';

@Injectable()
export class UserService {
   constructor(
      private db: PrismaService,
      private jwt: JwtService
   ) { }
   async searchUser(q) {
      const users = await this.db.user.findMany({
         where: {
            OR: [
               { fullName: { contains: q, mode: "insensitive" } },
               { phoneNumber: { contains: q, mode: "insensitive" } },
            ]
         }
      });

      return users;
   }

   async getUserOrders(userId) {
      const orders = await this.db.order.findMany({
         where: {
            userId: userId
         },
         include: {
            products: {
               include: productPublicIncludes()
            },
            user: true
         }
      });

      return orders;
   }

   async updateUser({ files, body, oldPhoto, userId }) {
      const company = body.company ? JSON.parse(body.company) : undefined;
      const user = await this.db.user.update({
         data: {
            fullName: body.fullName,
            companyName: company?.companyName,
            companyType: company?.companyType,
            mersisNumber: company?.mersisNumber,
            photoUrl: files.length > 0 ? `user/${files[0].filename}` : undefined,
            taxNumber: company?.taxNumber,
            tradeRegistryNumber: company?.tradeRegistryNumber,
            role: body.role as ROLE
         },
         where: {
            id: userId
         }
      });

      const token = this.jwt.sign({ user: user }, { secret: "SECRET" });

      if (oldPhoto == 'user/default.png') {
         await deleteFile(oldPhoto)
      }

      return {
         user,
         token
      }
   }
}
