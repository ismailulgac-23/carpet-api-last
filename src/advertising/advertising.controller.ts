import { Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdvertisingService } from './advertising.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer';
import { parseUploadedFiles } from 'src/constants/helpers';

@Controller('advertising')
export class AdvertisingController {
   constructor(
      private advertisingService: AdvertisingService
   ) { }
   @Get()
   @UseGuards(AuthGuard)
   getAdvertising() {
      return this.advertisingService.getAdvertisings();
   }
   @Post()
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig('advertising')))
   createAdvertising(
      @UploadedFiles() files,
   ) {
      const parsedFiles = parseUploadedFiles(files);
      return this.advertisingService.createAdvertising(parsedFiles);
   }
   @Delete(":id")
   @UseGuards(AuthGuard)
   deleteAdvertising(
      @Param("id") id: string
   ) {
      return this.advertisingService.deleteAdvertising(id);
   }
}
