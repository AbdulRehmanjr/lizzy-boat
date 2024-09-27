-- AlterTable
ALTER TABLE "LizzyTransferBooking" ADD COLUMN     "dateReturn" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "departFrom" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "departFromReturn" TEXT NOT NULL DEFAULT 'none';
