/*
  Warnings:

  - You are about to drop the column `members` on the `chat-rooms` table. All the data in the column will be lost.
  - Added the required column `firstMemberId` to the `chat-rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondMemberId` to the `chat-rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat-rooms" DROP COLUMN "members",
ADD COLUMN     "firstMemberId" TEXT NOT NULL,
ADD COLUMN     "secondMemberId" TEXT NOT NULL;
