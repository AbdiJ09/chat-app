import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchChatrooms = () => {
  return useQuery({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      const response = await api.get("/api/chatrooms");
      return response.data;
    },
  });
};

export const useChatroomMessages = (roomId: string) => {
  return useQuery({
    queryKey: ["chatroom-messages", roomId],
    queryFn: async () => {
      const response = await api.get(`/api/chatrooms/${roomId}/messages`);
      return response.data;
    },
    enabled: !!roomId,
  });
};

export const joinChatroom = async (roomId: string, userId: string) => {
  return await api.post(`/api/chatrooms/${roomId}/join`, { user_id: userId });
};

export const useLeaveChatroom = () => {
  return useMutation({
    mutationFn: async ({ roomId, userId }: { roomId: string; userId: string }) => {
      const response = await api.delete(`/api/chatrooms/${roomId}/leave`, {
        data: { user_id: userId },
      });
      return response.data;
    },
  });
};

export const useSendMessage = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomId, message, userId }: { roomId: string; message: string; userId: string }) => {
      await api.post(`/api/chatrooms/${roomId}/messages`, {
        message: { content: message },
        user_id: userId,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["chatroom-messages", roomId] });
    },
    mutationKey: ["new-message"],
  });
};
