/*
  Warnings:

  - You are about to drop the column `couponId` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `eventPaymentId` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `insituition` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `practicingNumber` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `EventRegistration` table. All the data in the column will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventPayment" DROP CONSTRAINT "EventPayment_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventPayment" DROP CONSTRAINT "EventPayment_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventRegistration" DROP CONSTRAINT "EventRegistration_couponId_fkey";

-- DropForeignKey
ALTER TABLE "EventRegistration" DROP CONSTRAINT "EventRegistration_eventPaymentId_fkey";

-- DropIndex
DROP INDEX "EventRegistration_eventPaymentId_key";

-- AlterTable
ALTER TABLE "EventRegistration" DROP COLUMN "couponId",
DROP COLUMN "department",
DROP COLUMN "eventPaymentId",
DROP COLUMN "insituition",
DROP COLUMN "nationality",
DROP COLUMN "practicingNumber",
DROP COLUMN "telephone";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "EventPayment";
