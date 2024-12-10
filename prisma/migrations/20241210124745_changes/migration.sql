/*
  Warnings:

  - Made the column `fullName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "fullName" SET DEFAULT '',
ALTER COLUMN "mersisNumber" DROP NOT NULL;
