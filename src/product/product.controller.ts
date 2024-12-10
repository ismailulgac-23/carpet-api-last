import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer';

@Controller('product')
export class ProductController {
   constructor(
      private productService: ProductService
   ) { }
   @Get("public")
   getProductsPublic(
   ) {
      return this.productService.getProductsPublic();
   }
   @Get()
   @UseGuards(AuthGuard)
   getProducts(
      @Req() { user }
   ) {
      return this.productService.getProducts({ userId: user.id });
   }
   @Get("category/:id")
   @UseGuards(AuthGuard)
   getCategoryProducts(
      @Param("id") id
   ) {
      return this.productService.getCategoryProducts({ id });
   }
   @Post("define-user")
   @UseGuards(AuthGuard)
   defineUser(
      @Body() { users, productId }
   ) {
      return this.productService.defineUser({ users, productId });
   }
   @Get(":id")
   @UseGuards(AuthGuard)
   getProduct(
      @Param("id") productId: string
   ) {
      return this.productService.getProduct(productId);
   }
   @Post()
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig("product")))
   createProduct(
      @Body() body,
      @UploadedFiles() files
   ) {
      return this.productService.createProduct({ files, body });
   }
   @Patch(":id")
   @UseGuards(AuthGuard)
   @UseInterceptors(FilesInterceptor("files", undefined, multerConfig("product")))
   updateProduct(
      @Body() body,
      @UploadedFiles() files,
      @Param("id") productId: string
   ) {
      return this.productService.updateProduct({ files, body, id: productId });
   }
   @Delete(":id")
   @UseGuards(AuthGuard)
   deleteProduct(
      @Param("id") productId: string
   ) {
      return this.productService.deleteProduct({ id: productId });
   }
   @Delete(":productId/image/:imageId")
   @UseGuards(AuthGuard)
   deleteProductImage(
      @Param("productId") productId: string,
      @Param("imageId") imageId: string,
   ) {
      return this.productService.deleteProductImage({ productId: productId, imageId: imageId });
   }
   @Get(":id/users")
   @UseGuards(AuthGuard)
   getProductUsers(
      @Param("id") id: string,
   ) {
      return this.productService.getProductUsers(id);
   }
}
