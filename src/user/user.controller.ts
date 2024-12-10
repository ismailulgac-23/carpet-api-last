import { Body, Controller, Get, Patch, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer';
import { parseUploadedFiles } from 'src/constants/helpers';

@Controller('user')
export class UserController {
   constructor(
      private userService: UserService
   ) { }
   @Get("search")
   searchUser(
      @Query("q") q: string
   ) {
      return this.userService.searchUser(q);
   }
   @Get("orders")
   @UseGuards(AuthGuard)
   getUserOrders(
      @Req() { user }
   ) {
      return this.userService.getUserOrders(user.id);
   }
   @Patch()
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig('user')))
   updateUser(
      @Req() { user },
      @UploadedFiles() filesData,
      @Body() body
   ) {
      const oldPhoto = user.photoUrl;
      const files = parseUploadedFiles(filesData);
      return this.userService.updateUser({
         userId: user.id,
         body,
         files,
         oldPhoto
      });
   }
}
