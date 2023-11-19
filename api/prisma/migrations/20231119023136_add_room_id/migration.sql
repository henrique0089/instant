/*
  Warnings:

  - Added the required column `roomId` to the `media-messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `text-messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media-messages" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "text-messages" ADD COLUMN     "roomId" TEXT NOT NULL;
