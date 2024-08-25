-- CreateTable
CREATE TABLE "LizzyAdditionalBookingInfo" (
    "id" TEXT NOT NULL,
    "paypalBoookingId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "boat" TEXT NOT NULL,
    "noOfPeople" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "bookingType" TEXT NOT NULL,

    CONSTRAINT "LizzyAdditionalBookingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LizzyAdditionalBookingInfo_paypalBoookingId_idx" ON "LizzyAdditionalBookingInfo"("paypalBoookingId");

-- AddForeignKey
ALTER TABLE "LizzyAdditionalBookingInfo" ADD CONSTRAINT "LizzyAdditionalBookingInfo_paypalBoookingId_fkey" FOREIGN KEY ("paypalBoookingId") REFERENCES "LizzyPayPalBoookingInfo"("paypalBoookingId") ON DELETE CASCADE ON UPDATE CASCADE;
