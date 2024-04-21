/*
  Warnings:

  - You are about to drop the column `eventRegistrationId` on the `EventPayment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventPaymentId]` on the table `EventRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventPaymentId` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventPayment" DROP CONSTRAINT "EventPayment_eventRegistrationId_fkey";

-- DropIndex
DROP INDEX "EventPayment_eventRegistrationId_key";

-- AlterTable
ALTER TABLE "EventPayment" DROP COLUMN "eventRegistrationId";

-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "eventPaymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_eventPaymentId_key" ON "EventRegistration"("eventPaymentId");

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventPaymentId_fkey" FOREIGN KEY ("eventPaymentId") REFERENCES "EventPayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
