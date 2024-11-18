import { Chatroom, Message } from "@/types/chat";

export interface UseChatroomReturn {
  currentRoom: Chatroom | null;
  messages: Message[];
  chatrooms: Chatroom[];
  hasJoinedRoom: boolean;
  isLoading: boolean;
  joinedLoading: boolean;
  handleJoinRoom: () => Promise<void>;
  handleSendMessage: (message: string) => Promise<void>;
  selectRoom: (roomId: string) => Promise<void>;
  setCurrentChatroom: (chatroom: Chatroom) => void;
  setHasJoinedRoom: (hasJoined: boolean) => void;
  setMessages: (messages: Message[]) => void;
}
