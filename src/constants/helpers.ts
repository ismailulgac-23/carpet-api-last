import { randomUUID } from "crypto";
import { unlinkSync } from "fs";

export const deleteFile = (fileName: string | string[] | null | undefined): boolean | null => {
   if (!fileName) {
      return null;
   }

   try {
      if (typeof fileName == 'string') {
         unlinkSync(`./public/uploads/${fileName}`);
      } else {
         for (let index = 0; index < fileName.length; index++) {
            const file = fileName[index];
            unlinkSync(`./public/uploads/${file}`);
         }
      }
      return true;
   } catch (error) {
      return false;
   }
}
export const stringDateToDateTime = (payload: string) => {
   const [day, month, year] = payload.split("/").map(Number);
   const dateObject = new Date(year, month - 1, day);
   return dateObject;
}
export const deleteFiles = (files: string) => {
   if (files) {
      const willDeleteImages = files.split(",");
      for (let index = 0; index < willDeleteImages.length; index++) {
         const image = willDeleteImages[index];
         unlinkSync(`./public/uploads/${image}`);
      }
   }
}
export const generateFileName = (prefix: string) => {
   const uniqueId = randomUUID();
   return `${prefix}${uniqueId}.png`;
}
export const shuffleArray = (array) => {
   const shuffled = [...array];

   for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
   }
   return shuffled;
}

export const randomSixDigit = () => Math.floor(100000 + Math.random() * 900000);

export const parseUploadedFiles = (files: any) => {
   if (!files) {
      return [];
   }
   if (!files.length) {
      return [];
   }
   return files;
}
