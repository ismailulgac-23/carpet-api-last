import { PrismaClient } from "@prisma/client";

(async () => {

   const db = new PrismaClient();

   try {
      await db.select.createMany({
         data: [
            { id: "minimalist-halilar", name: "Minimalist Halılar", type: "CATEGORY", hit: 0, source: "category/minimalist-halilar.png" },
            { id: "desenli-modeller", name: "Desenli Modeller", type: "CATEGORY", hit: 0, source: "category/desenli-modeller.png" },
            { id: "cocuk-modelleri", name: "Çocuk Modelleri", type: "CATEGORY", hit: 0, source: "category/cocuk-modelleri.png" },
         ]
      });
      await db.select.createMany({
         data: [
            { id: "merinos", name: "Merinos", type: "BRAND", hit: 0 },
            { id: "dinarsu", name: "Dinarsu", type: "BRAND", hit: 0 },
            { id: "saray-hali", name: "Saray Halı", type: "BRAND", hit: 0 },
            { id: "artemis-hali", name: "Artemis Halı", type: "BRAND", hit: 0 },
            { id: "padisah-hali", name: "Padişah Halı", type: "BRAND", hit: 0 },
         ]
      });

      await db.advertising.createMany({
         data: [
            { source: "advertising/reklam1.jpg" },
            { source: "advertising/reklam2.jpg" },
         ]
      });

   } catch (error) {
      console.log("ERROR");
   }

})();