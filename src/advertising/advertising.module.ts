import { Module } from '@nestjs/common';
import { AdvertisingController } from './advertising.controller';
import { AdvertisingService } from './advertising.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdvertisingController],
  providers: [AdvertisingService, PrismaService]
})
export class AdvertisingModule {}
