import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('order')
export class OrderController {
   constructor(
      private orderService: OrderService
   ) { }
   @Get()
   getOrders() {
      return this.orderService.getOrders();
   }
   
   @Post()
   @UseGuards(AuthGuard)
   createOrder(
      @Body() { cart },
      @Req() { user }
   ) {
      return this.orderService.createOrder({ cart, userId: user.id });
   }
   @Get("last-30-days-order")
   enCokSiparisVerenMusteri() {
      return this.orderService.enCokSiparisVerenMusteri();
   }
   @Get("last-30-days-product")
   enCokSatanUrunler() {
      return this.orderService.enCokSatanUrunler();
   }
   @Get("last-30-days-order-decrease")
   siparisDususuYasayanMusteriler() {
      return this.orderService.siparisDususuYasayanMusteriler();
   }
   @Get("last-6-month-decrease-customer")
   siparisDususuYasayanMusteriler6Aylik() {
      return this.orderService.siparisDususuYasayanMusteriler6Aylik();
   }
   @Get(":id")
   getOrder(
      @Param("id") id: string
   ) {
      return this.orderService.getOrder(id);
   }
}
