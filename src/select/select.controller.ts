import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { SelectService } from './select.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer';
import { parseUploadedFiles } from 'src/constants/helpers';

@Controller('select')
export class SelectController {
   constructor(
      private selectService: SelectService
   ) { }
   @Get()
   @UseGuards(AuthGuard)
   getSelects(
      @Query("type") type: string
   ) {
      return this.selectService.getSelects(type);
   }
   @Get(":id")
   @UseGuards(AuthGuard)
   getSelect(
      @Param("id") id: string
   ) {
      return this.selectService.getSelect(id);
   }
   @Post()
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig('category')))
   createSelect(
      @Body() body,
      @UploadedFiles() files
   ) {
      const parsedFiles = parseUploadedFiles(files);
      return this.selectService.createSelect({ body, files: parsedFiles });
   }
   @Delete(":id")
   @UseGuards(AuthGuard)
   deleteSelect(
      @Param("id") id: string
   ) {
      return this.selectService.deleteSelect(id);
   }
   @Patch(":id")
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig('category')))
   updateSelect(
      @Body() body,
      @UploadedFiles() files,
      @Param("id") id: string
   ) {
      const parsedFiles = parseUploadedFiles(files);
      return this.selectService.updateSelect({ body, files: parsedFiles, id });
   }
}
