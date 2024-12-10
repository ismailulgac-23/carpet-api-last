import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { deleteFile, parseUploadedFiles } from 'src/constants/helpers';
import { PrismaService } from 'src/prisma.service';
import { productPublicIncludes } from 'src/utils/includes';

@Injectable()
export class ProductService {
   constructor(
      private db: PrismaService
   ) { }

   async getProductsPublic() {
      const products = await this.db.product.findMany({
         include: productPublicIncludes()
      });

      return products;
   }
   async getProducts({ userId }) {
      const products = await this.db.product.findMany({
         where: {
            seers: {
               some: {
                  id: userId
               }
            }
         },
         include: productPublicIncludes()
      });

      return products;
   }

   async getCategoryProducts({ id }) {
      const products = await this.db.product.findMany({
         where: {
            categoryId: id
         },
         include: productPublicIncludes()
      });
      return products
   }

   async defineUser({ users, productId }) {
      try {
         await this.db.product.update({
            data: {
               seers: users.length ? {
                  connect: users.map((user) => ({ id: user }))
               } : { set: [] }
            },
            where: {
               id: productId
            }
         });

         return {
            message: "Ürünün göreceği kişiler güncellendi."
         }
      } catch (error) {
         console.log("err", error);

         throw new BadRequestException("Bir hata oluştu!");
      }
   }

   async getProduct(productId: string) {
      const product = await this.db.product.findFirst({
         where: {
            id: productId
         },
         include: productPublicIncludes()
      });

      return product;
   }

   async createProduct({ body, files }) {

      try {
         const productId = randomUUID();

         const info = JSON.parse(body.info);
         const size = JSON.parse(body.size);


         await this.db.product.create({
            data: {
               id: productId,
               description: body.description,
               rank: 0,
               title: body.title,
               brandId: body.brandId,
               categoryId: body.categoryId
            }
         });

         await this.db.productImage.createMany({
            data: parseUploadedFiles(files).map(({ filename }, index) => ({
               productId: productId,
               source: `product/${filename}`,
               isWindowPhoto: index == 0
            }))
         });

         await this.db.productInfoItem.createMany({
            data: info.map((infoItem) => ({
               content: infoItem.content,
               title: infoItem.title,
               productId: productId
            })),
         });

         await this.db.productSize.createMany({
            data: size.map((size) => ({
               price: Number(size.price),
               title: size.title,
               productId: productId
            })),
         });

         const createdProduct = await this.db.product.findFirst({
            where: {
               id: productId
            },
            include: productPublicIncludes()
         });

         return { message: "Ürün başarıyla oluşturuldu.", product: createdProduct };
      } catch (error) {
         console.log("err", error);

         throw new BadRequestException("Ürün oluşturulurken bir sorun oluştu!");
      }
   }
   async updateProduct({ id, body, files }) {
      try {
         const parsedFiles = parseUploadedFiles(files);

         const info = JSON.parse(body.info);
         const size = JSON.parse(body.size);

         await this.db.productInfoItem.deleteMany({
            where: {
               productId: id
            }
         })
         await this.db.productSize.deleteMany({
            where: {
               productId: id
            }
         })

         await this.db.productInfoItem.createMany({
            data: info.map((infoItem) => ({
               content: infoItem.content,
               title: infoItem.title,
               productId: id
            })),
         });

         await this.db.productSize.createMany({
            data: size.map((size) => ({
               price: Number(size.price),
               title: size.title,
               productId: id
            })),
         });


         const product = await this.db.product.update({
            data: {
               brandId: body.brandId,
               categoryId: body.categoryId,
               description: body.description,
               images: {
                  createMany: {
                     data: parsedFiles.map(({ filename }) => ({ source: `product/${filename}` }))
                  }
               },
               title: body.title,
            },
            where: {
               id: id
            },
            include: productPublicIncludes()
         });

         return { message: "Ürün başarıyla güncellendi.", product: product };
      } catch (error) {
         console.log("error", error);

         throw new BadRequestException("Ürün güncellenirken bir sorun oluştu!");
      }

   }
   async deleteProduct({ id }) {

      try {
         const productImages = await this.db.product.findFirst({
            where: {
               id: id
            },
            select: {
               images: true
            }
         });

         await deleteFile(productImages.images.map((e) => e.source));


         await this.db.productImage.deleteMany({
            where: {
               productId: id
            }
         });
         await this.db.productInfoItem.deleteMany({
            where: {
               productId: id
            }
         });
         await this.db.productSize.deleteMany({
            where: {
               productId: id
            }
         });
         await this.db.product.deleteMany({
            where: {
               id: id
            }
         });
         return {
            message: "Ürün başarılı bir şekilde silindi."
         }
      } catch (error) {
         throw new BadRequestException("Ürün silinirken bir sorun oluştu!");
      }
   }

   async deleteProductImage({ imageId, productId }) {
      const image = await this.db.productImage.delete({
         where: {
            id: imageId,
            productId: productId
         }
      });

      await deleteFile(image.source)

      return {
         message: "Ürün fotoğrafı başarıyla silindi."
      }
   }

   async getProductUsers(id) {
      const users = await this.db.user.findMany({
         where: {
            products: {
               some: {
                  id: id
               }
            }
         }
      });

      return users;
   }

}
