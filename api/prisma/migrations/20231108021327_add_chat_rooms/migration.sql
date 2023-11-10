-- CreateTable
CREATE TABLE "chat-rooms" (
    "id" TEXT NOT NULL,
    "members" TEXT[],
    "pinnedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat-rooms_pkey" PRIMARY KEY ("id")
);
