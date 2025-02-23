import { Module } from '@nestjs/common';
import { SelectController } from './select.controller';
import { SelectService } from './select.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SelectController],
  providers: [SelectService, PrismaService]
})
export class SelectModule {}
