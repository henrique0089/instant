/*
  Warnings:

  - You are about to drop the `media-messages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `text-messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MessageType" ADD VALUE 'TEXT';

-- AlterTable
ALTER TABLE "text-messages" ADD COLUMN     "type" "MessageType" NOT NULL,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "media-messages";
