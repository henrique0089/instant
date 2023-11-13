-- DropForeignKey
ALTER TABLE "pinned-chat-rooms" DROP CONSTRAINT "pinned-chat-rooms_chatRoomId_fkey";

-- AddForeignKey
ALTER TABLE "pinned-chat-rooms" ADD CONSTRAINT "pinned-chat-rooms_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "chat-rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
