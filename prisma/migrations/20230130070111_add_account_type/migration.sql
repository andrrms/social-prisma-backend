/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('PAID', 'ENTERPRISE', 'PUBLIC', 'NONE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
ADD COLUMN     "accountType" "VerificationType" NOT NULL DEFAULT 'NONE';
