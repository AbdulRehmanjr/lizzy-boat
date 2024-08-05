/*
  Warnings:

  - You are about to drop the `FishingBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayPalBoookingInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayPalSellerInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrivateBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SnorkelingBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SunsetBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransferBooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FishingBooking" DROP CONSTRAINT "FishingBooking_paypalId_fkey";

-- DropForeignKey
ALTER TABLE "PrivateBooking" DROP CONSTRAINT "PrivateBooking_paypalId_fkey";

-- DropForeignKey
ALTER TABLE "SnorkelingBooking" DROP CONSTRAINT "SnorkelingBooking_paypalId_fkey";

-- DropForeignKey
ALTER TABLE "SunsetBooking" DROP CONSTRAINT "SunsetBooking_paypalId_fkey";

-- DropForeignKey
ALTER TABLE "TransferBooking" DROP CONSTRAINT "TransferBooking_paypalId_fkey";

-- DropTable
DROP TABLE "FishingBooking";

-- DropTable
DROP TABLE "PayPalBoookingInfo";

-- DropTable
DROP TABLE "PayPalSellerInfo";

-- DropTable
DROP TABLE "PrivateBooking";

-- DropTable
DROP TABLE "SnorkelingBooking";

-- DropTable
DROP TABLE "SunsetBooking";

-- DropTable
DROP TABLE "TransferBooking";

-- CreateTable
CREATE TABLE "LizzyPayPalSellerInfo" (
    "id" TEXT NOT NULL,
    "trackingId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "partner_client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "LizzyPayPalSellerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LizzyPayPalBoookingInfo" (
    "paypalBoookingId" TEXT NOT NULL,
    "paymentEmail" TEXT NOT NULL DEFAULT '',
    "captureId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL DEFAULT '',
    "paymentId" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "LizzyPayPalBoookingInfo_pkey" PRIMARY KEY ("paypalBoookingId")
);

-- CreateTable
CREATE TABLE "LizzyFishingBooking" (
    "fishingId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "guesthouse" TEXT NOT NULL DEFAULT 'none',
    "extra" TEXT NOT NULL DEFAULT 'none',
    "information" TEXT NOT NULL DEFAULT 'none',
    "adults" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'none',
    "time" TEXT NOT NULL DEFAULT 'none',
    "date" TEXT NOT NULL DEFAULT 'none',
    "price" TEXT NOT NULL DEFAULT 'none',
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "paypalId" TEXT NOT NULL,

    CONSTRAINT "LizzyFishingBooking_pkey" PRIMARY KEY ("fishingId")
);

-- CreateTable
CREATE TABLE "LizzyTransferBooking" (
    "fishingId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "guesthouse" TEXT NOT NULL DEFAULT 'none',
    "extra" TEXT NOT NULL DEFAULT 'none',
    "information" TEXT NOT NULL DEFAULT 'none',
    "adults" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'none',
    "startTime" TEXT NOT NULL DEFAULT 'none',
    "endTime" TEXT NOT NULL DEFAULT 'none',
    "blockTime" TEXT NOT NULL DEFAULT 'none-none',
    "date" TEXT NOT NULL DEFAULT 'none',
    "price" TEXT NOT NULL DEFAULT 'none',
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "paypalId" TEXT NOT NULL,

    CONSTRAINT "LizzyTransferBooking_pkey" PRIMARY KEY ("fishingId")
);

-- CreateTable
CREATE TABLE "LizzySunsetBooking" (
    "bookingId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "guesthouse" TEXT NOT NULL DEFAULT 'none',
    "extra" TEXT NOT NULL DEFAULT 'none',
    "information" TEXT NOT NULL DEFAULT 'none',
    "adults" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "date" TEXT NOT NULL DEFAULT 'none',
    "price" TEXT NOT NULL DEFAULT 'none',
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "paypalId" TEXT NOT NULL,

    CONSTRAINT "LizzySunsetBooking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "LizzyPrivateBooking" (
    "privateId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "guesthouse" TEXT NOT NULL DEFAULT 'none',
    "extra" TEXT NOT NULL DEFAULT 'none',
    "information" TEXT NOT NULL DEFAULT 'none',
    "adults" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'none',
    "time" TEXT NOT NULL DEFAULT 'none',
    "date" TEXT NOT NULL DEFAULT 'none',
    "price" TEXT NOT NULL DEFAULT 'none',
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "paypalId" TEXT NOT NULL,

    CONSTRAINT "LizzyPrivateBooking_pkey" PRIMARY KEY ("privateId")
);

-- CreateTable
CREATE TABLE "LizzySnorkelingBooking" (
    "snorkelingId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'none',
    "lastName" TEXT NOT NULL DEFAULT 'none',
    "email" TEXT NOT NULL DEFAULT 'none',
    "phone" TEXT NOT NULL DEFAULT 'none',
    "guesthouse" TEXT NOT NULL DEFAULT 'none',
    "extra" TEXT NOT NULL DEFAULT 'none',
    "information" TEXT NOT NULL DEFAULT 'none',
    "adults" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'none',
    "time" TEXT NOT NULL DEFAULT 'none',
    "date" TEXT NOT NULL DEFAULT 'none',
    "price" TEXT NOT NULL DEFAULT 'none',
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "paypalId" TEXT NOT NULL,

    CONSTRAINT "LizzySnorkelingBooking_pkey" PRIMARY KEY ("snorkelingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LizzyPayPalSellerInfo_trackingId_key" ON "LizzyPayPalSellerInfo"("trackingId");

-- CreateIndex
CREATE UNIQUE INDEX "LizzyPayPalSellerInfo_email_key" ON "LizzyPayPalSellerInfo"("email");

-- AddForeignKey
ALTER TABLE "LizzyFishingBooking" ADD CONSTRAINT "LizzyFishingBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LizzyTransferBooking" ADD CONSTRAINT "LizzyTransferBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LizzySunsetBooking" ADD CONSTRAINT "LizzySunsetBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LizzyPrivateBooking" ADD CONSTRAINT "LizzyPrivateBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LizzySnorkelingBooking" ADD CONSTRAINT "LizzySnorkelingBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;
