import { getUserId } from "@/helper/userId";
import { api } from "@/lib/axios";
import { useChatroomStore } from "@/store/chatroomStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useJoinStatus = (roomId?: string) => {
  const { setHasJoinedRoom } = useChatroomStore();

  const {
    data: joined,
    isSuccess,
    isLoading: joinedLoading,
  } = useQuery({
    queryKey: ["chatroom-status", roomId],
    queryFn: async () => {
      const response = await api.get(`/api/chatrooms/${roomId}/join-status`, {
        params: { user_id: getUserId() },
      });
      return response.data.joined;
    },
    enabled: !!roomId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setHasJoinedRoom(joined);
    }
  }, [joined, isSuccess, setHasJoinedRoom]);

  return { joinedLoading };
};
