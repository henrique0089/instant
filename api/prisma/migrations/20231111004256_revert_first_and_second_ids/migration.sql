/*
  Warnings:

  - You are about to drop the column `firstMemberId` on the `chat-rooms` table. All the data in the column will be lost.
  - You are about to drop the column `secondMemberId` on the `chat-rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat-rooms" DROP COLUMN "firstMemberId",
DROP COLUMN "secondMemberId",
ADD COLUMN     "members" TEXT[];
