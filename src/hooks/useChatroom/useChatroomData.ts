import { useChatroomMessages, useFetchChatrooms } from "@/services/chatroom.service";
import { useChatroomStore } from "@/store/chatroomStore";
import { useEffect } from "react";

export const useChatroomData = (roomId?: string) => {
  const { setChatrooms } = useChatroomStore();
  const { data: chatroomsData, isSuccess, isLoading } = useFetchChatrooms();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setChatrooms(chatroomsData);
    }
  }, [isLoading, isSuccess, chatroomsData, setChatrooms]);

  const { data: messages, isSuccess: messagesSuccess } = useChatroomMessages(roomId || "");
  const { setMessages } = useChatroomStore();

  useEffect(() => {
    if (messagesSuccess) {
      setMessages(messages);
    }
  }, [messages, messagesSuccess, setMessages]);

  return { isLoading };
};
