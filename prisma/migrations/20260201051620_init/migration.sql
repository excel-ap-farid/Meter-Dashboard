/*
  Warnings:

  - You are about to drop the column `code` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SendingMethod" AS ENUM ('EMAIL', 'SMS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "code",
ALTER COLUMN "password" SET DEFAULT '';

-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "sendingMethod" "SendingMethod" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
