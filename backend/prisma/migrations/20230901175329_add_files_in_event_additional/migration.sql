-- AlterTable
ALTER TABLE "EventAdditional" ADD COLUMN     "MaterialLinks" TEXT[];

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "fieldName" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "size" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "materialDocumentId" INTEGER,
    "materialImageId" INTEGER,
    "materialVideoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_materialDocumentId_fkey" FOREIGN KEY ("materialDocumentId") REFERENCES "EventAdditional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_materialImageId_fkey" FOREIGN KEY ("materialImageId") REFERENCES "EventAdditional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_materialVideoId_fkey" FOREIGN KEY ("materialVideoId") REFERENCES "EventAdditional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
