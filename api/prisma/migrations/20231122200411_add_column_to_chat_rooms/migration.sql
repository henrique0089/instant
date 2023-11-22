/*
  Warnings:

  - Added the required column `socketId` to the `chat-rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat-rooms" ADD COLUMN     "socketId" TEXT NOT NULL;
