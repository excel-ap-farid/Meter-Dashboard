-- CreateEnum
CREATE TYPE "MeterType" AS ENUM ('Nesco');

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "type" "MeterType";
