import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { SmsModule } from './sms/sms.module';
import { OtpModule } from './otp/otp.module';
import { ProductModule } from './product/product.module';
import { SelectModule } from './select/select.module';
import { OrderModule } from './order/order.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads/advertising'),
      serveRoot: '/uploads/advertising',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads/category'),
      serveRoot: '/uploads/category',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads/product'),
      serveRoot: '/uploads/product',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads/user'),
      serveRoot: '/uploads/user',
    }),
    MulterModule.register({
      dest: join(__dirname, '..', 'public/uploads')
    }),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: "SECRET",
    }),
    SmsModule,
    OtpModule,
    ProductModule,
    SelectModule,
    OrderModule,
    AdvertisingModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
