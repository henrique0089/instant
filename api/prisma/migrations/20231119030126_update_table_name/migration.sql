/*
  Warnings:

  - You are about to drop the `text-messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "text-messages";

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "type" "MessageType" NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
