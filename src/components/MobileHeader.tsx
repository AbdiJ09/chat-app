import { Button } from "@/components/ui/button";
import { getUserId } from "@/helper/userId";
import { useLeaveChatroom } from "@/services/chatroom.service";
import { PusherService } from "@/services/pusher.service";
import { Chatroom, Message } from "@/types/chat";

import { LogOut } from "lucide-react";

const MobileHeader = ({
  currentRoom,
  hasJoinedRoom,
  setHasJoinedRoom,
  setMessages,
}: {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  currentRoom: Chatroom | null;
  hasJoinedRoom: boolean;
  setHasJoinedRoom: (hasJoinedRoom: boolean) => void;
  setCurrentChatroom: (chatroom: Chatroom) => void;
  setMessages: (messages: Message[]) => void;
}) => {
  const userId = getUserId();
  const pusherService = PusherService.getInstance();
  const { mutate } = useLeaveChatroom();
  const handleLeaveRoom = () => {
    mutate(
      { roomId: currentRoom?.id || "", userId: userId?.toString() || "" },
      {
        onSuccess: () => {
          pusherService.disconnect();
          setMessages([]);
          setHasJoinedRoom(false);
        },
      }
    );
  };
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-gray-900/50 backdrop-blur-md border-zinc-600">
      {hasJoinedRoom && (
        <>
          <h1 className="text-lg font-bold text-white">{currentRoom?.name || "Select Room"}</h1>

          <Button
            variant={"destructive"}
            onClick={handleLeaveRoom}
          >
            <LogOut size={20} />
          </Button>
        </>
      )}
    </div>
  );
};

export default MobileHeader;
