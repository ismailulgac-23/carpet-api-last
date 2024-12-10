import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { productPublicIncludes } from 'src/utils/includes';

@Injectable()
export class OrderService {
   constructor(
      private db: PrismaService
   ) { }
   async getOrders() {
      const orders = await this.db.order.findMany({
         include: {
            products: {
               include: productPublicIncludes()
            },
            user: true
         }
      });
      return orders;
   }
   async getOrder(id: string) {
      const order = await this.db.order.findFirst({
         where: {
            id: id
         }
      });

      return order;
   }
   async createOrder(
      { cart, userId }
   ) {
      const total = cart.reduce((acc, e) => acc + (e.quantity * e.size.price), 0);
      await this.db.order.create({
         data: {
            amount: total,
            products: {
               connect: cart.map((e) => ({ id: e.id })),
            },
            userId: userId,
            status: "PENDING",
            payerType: "USER"
         }
      });
   }

   async enCokSiparisVerenMusteri() {
      const recentTopCustomers = await this.db.order.findMany({
         where: {
            createdAt: {
               gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
         },
         include: {
            user: true,
            products: {
               include: productPublicIncludes()
            }
         },
         orderBy: {
            createdAt: 'desc',
         },
      });
      return recentTopCustomers;

   }

   async enCokSatanUrunler() {
      const topSellingProducts = await this.db.order.findMany({
         where: {
            createdAt: {
               gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
         },
         include: {
            products: {
               include: productPublicIncludes(),
            },
            user: true
         },
      });


      return topSellingProducts;

   }

   async siparisDususuYasayanMusteriler() {
      const topCustomersByDrop = await this.db.order.findMany({
         where: {
            createdAt: {
               gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
         },
         include: {
            user: true,
            products: {
               include: productPublicIncludes()
            }
         },
         orderBy: {
            createdAt: 'asc',
         },
      });

      return topCustomersByDrop;

   }

   async siparisDususuYasayanMusteriler6Aylik() {
      const topCustomersByDrop6Months = await this.db.order.findMany({
         where: {
            createdAt: {
               gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            },
         },
         include: {
            user: true,
            products: {
               include: productPublicIncludes()
            }
         },
         orderBy: {
            createdAt: 'asc',
         },
      });
      return topCustomersByDrop6Months;

   }
}
