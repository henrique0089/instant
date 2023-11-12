-- CreateTable
CREATE TABLE "pinned-chat-rooms" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,

    CONSTRAINT "pinned-chat-rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pinned-chat-rooms_chatRoomId_key" ON "pinned-chat-rooms"("chatRoomId");

-- AddForeignKey
ALTER TABLE "pinned-chat-rooms" ADD CONSTRAINT "pinned-chat-rooms_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "chat-rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
