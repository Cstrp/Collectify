/*
  Warnings:

  - Made the column `collectionId` on table `collection_item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "collection_item" ALTER COLUMN "collectionId" SET NOT NULL;
