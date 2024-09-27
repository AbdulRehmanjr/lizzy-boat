/*
  Warnings:

  - You are about to drop the column `infants` on the `LizzySnorkelingBooking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LizzySnorkelingBooking" DROP COLUMN "infants",
ADD COLUMN     "child_0_3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "child_4_11" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "child_4_8" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "child_9_13" INTEGER NOT NULL DEFAULT 0;
