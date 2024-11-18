import { useChatroomStore } from "@/store/chatroomStore";
import { UseChatroomReturn } from "./types";
import { useUserStore } from "@/store/useStore";
import { useUIStore } from "@/store/ui.store";
import { useQueryClient } from "@tanstack/react-query";
import { useChatroomData } from "./useChatroomData";
import { useJoinStatus } from "./useJoinStatus";
import { useCallback, useEffect } from "react";
import { Message } from "@/types/chat";
import { useSendMessage } from "@/services/chatroom.service";

export const useChatroom = (roomId?: string): UseChatroomReturn => {
  const { currentRoom, messages, chatrooms, hasJoinedRoom, selectRoom, joinRoom, setCurrentChatroom, setHasJoinedRoom, setMessages, loadPersistedRoom } = useChatroomStore();

  const { userInfo } = useUserStore();
  const { setLoading, setError } = useUIStore();
  const queryClient = useQueryClient();

  const { isLoading } = useChatroomData(roomId);
  const { joinedLoading } = useJoinStatus(roomId);

  useEffect(() => {
    loadPersistedRoom();
  }, [loadPersistedRoom]);

  const handleJoinRoom = useCallback(async () => {
    if (!roomId || !userInfo) {
      setError("Missing room ID or user info");
      return;
    }

    setLoading(true);
    try {
      await joinRoom(roomId, userInfo.id);
      const messages: Message[] | undefined = queryClient.getQueryData(["chatroom-messages", roomId]);
      if (messages) {
        setMessages(messages);
      }
    } catch (error) {
      setError("Failed to join room");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [roomId, userInfo, joinRoom, setError, setLoading, queryClient, setMessages]);

  const { mutate } = useSendMessage(roomId || "");

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!userInfo) return;

      try {
        mutate({ roomId: roomId || "", message, userId: userInfo.id });
      } catch (error) {
        setError("Failed to send message");
        console.error(error);
      }
    },
    [mutate, roomId, userInfo, setError]
  );

  return {
    currentRoom,
    messages,
    chatrooms,
    hasJoinedRoom,
    isLoading,
    joinedLoading,
    handleJoinRoom,
    handleSendMessage,
    selectRoom,
    setCurrentChatroom,
    setHasJoinedRoom,
    setMessages,
  };
};
