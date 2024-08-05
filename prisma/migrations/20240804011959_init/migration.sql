-- CreateTable
CREATE TABLE "PayPalSellerInfo" (
    "id" TEXT NOT NULL,
    "trackingId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "partner_client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PayPalSellerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayPalBoookingInfo" (
    "paypalBoookingId" TEXT NOT NULL,
    "paymentEmail" TEXT NOT NULL DEFAULT '',
    "captureId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL DEFAULT '',
    "paymentId" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PayPalBoookingInfo_pkey" PRIMARY KEY ("paypalBoookingId")
);

-- CreateTable
CREATE TABLE "FishingBooking" (
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

    CONSTRAINT "FishingBooking_pkey" PRIMARY KEY ("fishingId")
);

-- CreateTable
CREATE TABLE "TransferBooking" (
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

    CONSTRAINT "TransferBooking_pkey" PRIMARY KEY ("fishingId")
);

-- CreateTable
CREATE TABLE "SunsetBooking" (
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

    CONSTRAINT "SunsetBooking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "PrivateBooking" (
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

    CONSTRAINT "PrivateBooking_pkey" PRIMARY KEY ("privateId")
);

-- CreateTable
CREATE TABLE "SnorkelingBooking" (
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

    CONSTRAINT "SnorkelingBooking_pkey" PRIMARY KEY ("snorkelingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSellerInfo_trackingId_key" ON "PayPalSellerInfo"("trackingId");

-- CreateIndex
CREATE UNIQUE INDEX "PayPalSellerInfo_email_key" ON "PayPalSellerInfo"("email");

-- AddForeignKey
ALTER TABLE "FishingBooking" ADD CONSTRAINT "FishingBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "PayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferBooking" ADD CONSTRAINT "TransferBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "PayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SunsetBooking" ADD CONSTRAINT "SunsetBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "PayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateBooking" ADD CONSTRAINT "PrivateBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "PayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnorkelingBooking" ADD CONSTRAINT "SnorkelingBooking_paypalId_fkey" FOREIGN KEY ("paypalId") REFERENCES "PayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;
