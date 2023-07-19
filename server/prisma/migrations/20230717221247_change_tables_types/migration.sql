/*
  Warnings:

  - You are about to drop the column `fields` on the `collection_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collection_item" DROP COLUMN "fields";

-- CreateTable
CREATE TABLE "collection_item_fields" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "collectionItemId" TEXT,

    CONSTRAINT "collection_item_fields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection_item_fields" ADD CONSTRAINT "collection_item_fields_collectionItemId_fkey" FOREIGN KEY ("collectionItemId") REFERENCES "collection_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
