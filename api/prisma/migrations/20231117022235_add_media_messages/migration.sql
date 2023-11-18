-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('IMAGE', 'AUDIO');

-- CreateTable
CREATE TABLE "media-messages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media-messages_pkey" PRIMARY KEY ("id")
);
