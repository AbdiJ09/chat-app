import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import { Chatroom, Message } from "@/types/chat";
import { RefObject } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useLeaveChatroom } from "@/services/chatroom.service";
import { getUserId } from "@/helper/userId";
import { PusherService } from "@/services/pusher.service";

interface HasJoinRoomProps {
  hasJoinedRoom: boolean;
  messages: Message[];
  setHasJoinedRoom: (hasJoinedRoom: boolean) => void;
  setCurrentChatroom: (chatroom: Chatroom) => void;
  setMessages: (messages: Message[]) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  onSendMessage: (message: string) => void;
  currentRoom?: Chatroom | null;
  isMobile: boolean;
}
export const HasJoinRoom = ({ messages, messagesEndRef, hasJoinedRoom, onSendMessage, currentRoom, isMobile, setHasJoinedRoom, setCurrentChatroom, setMessages }: HasJoinRoomProps) => {
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
          setCurrentChatroom({
            id: "",
            name: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            users: [],
            description: "",
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-full">
      {!isMobile && (
        <div className="flex items-center justify-between w-full p-5 border-b bg-gray-900/50 backdrop-blur-md border-zinc-600">
          <h1 className="text-xl font-bold text-white text-start">{currentRoom?.name || "Chat Room"}</h1>
          {hasJoinedRoom && (
            <Button
              variant={"destructive"}
              onClick={handleLeaveRoom}
            >
              <LogOut size={20} />
            </Button>
          )}
        </div>
      )}
      <MessagesContainer
        messages={messages}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};
