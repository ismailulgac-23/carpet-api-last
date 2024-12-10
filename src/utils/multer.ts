import { diskStorage } from "multer";
import { extname } from "path";

export const multerConfig = (folder: string) => ({
   storage: diskStorage({
      destination: `./public/uploads/${folder}`,
      filename: (req, file, callback) => {
         const name = file.originalname.split('.')[0];
         const fileExtName = extname(file.originalname);
         const timestamp = Date.now();
         const newFileName = `${name}-${timestamp}${fileExtName}`;
         callback(null, newFileName);
      },
   }),
   fileFilter: (req, file, callback) => {
      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', ".webp"];
      const ext = extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
         return callback(new Error('Dosya formatı desteklenmiyor'), false);
      }
      callback(null, true);
   },
});
