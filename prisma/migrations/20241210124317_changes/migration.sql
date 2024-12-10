/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mersisNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "status" "ORDER_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyType" TEXT,
ADD COLUMN     "mersisNumber" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL DEFAULT 'user/default.png',
ADD COLUMN     "taxNumber" TEXT,
ADD COLUMN     "tradeRegistryNumber" TEXT;
