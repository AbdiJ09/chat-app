import { create } from "zustand";
import { Chatroom, Message } from "../types/chat";
import { useUIStore } from "./ui.store";
import { PusherService } from "@/services/pusher.service";
import { joinChatroom } from "@/services/chatroom.service";
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { withUIHandler } from "@/utils/uiHandler";

interface ChatroomState {
  chatrooms: Chatroom[];
  currentRoom: Chatroom | null;
  isFetchingRooms: boolean;
  messages: Message[];
  hasJoinedRoom: boolean;
  currentChannel: string | null;

  getCurrentRoom: () => Chatroom | null;
  getMessages: () => Message[];
  getRoomById: (id: string) => Chatroom | null;

  selectRoom: (roomId: string) => Promise<void>;
  joinRoom: (roomId: string, userId: string) => Promise<void>;
  reset: () => void;
  setHasJoinedRoom: (hasJoinedRoom: boolean) => void;
  setMessages: (messages: Message[]) => void;
  setChatrooms: (chatrooms: Chatroom[]) => void;
  cleanupPusher: () => void;
  setCurrentChatroom: (chatroom: Chatroom) => void;
  initializePusher: (roomId: string) => Promise<void>;

  persistCurrentRoom: () => void;
  loadPersistedRoom: () => Promise<void>;
}

const initialState = {
  chatrooms: [],
  currentRoom: null,
  isFetchingRooms: false,
  messages: [],
  hasJoinedRoom: false,
  currentChannel: null,
};

export const useChatroomStore = create<ChatroomState>((set, get) => ({
  ...initialState,

  getCurrentRoom: () => get().currentRoom,
  getMessages: () => get().messages,
  getRoomById: (id: string) => {
    return get().chatrooms.find((room) => room.id == id) ?? null;
  },

  setCurrentChatroom: (chatroom: Chatroom) => set({ currentRoom: chatroom }),

  initializePusher: async (roomId: string) => {
    const pusherService = PusherService.getInstance();
    const channelName = `chatroom-${roomId}`;
    pusherService.subscribeToChannel(channelName, "new-message", (data) => {
      set((state) => ({
        messages: [...state.messages, data],
      }));
    });
  },

  setChatrooms: (chatrooms: Chatroom[]) => set({ chatrooms }),

  setMessages: (messages: Message[]) => set({ messages }),
  setHasJoinedRoom: (hasJoinedRoom: boolean) => set({ hasJoinedRoom }),

  cleanupPusher: () => {
    const pusherService = PusherService.getInstance();
    pusherService.disconnect();
  },

  selectRoom: async (roomId: string) => {
    try {
      const { currentChannel, initializePusher, persistCurrentRoom, getRoomById } = get();

      if (currentChannel) {
        const pusherService = PusherService.getInstance();
        pusherService.unsubscribeFromChannel(currentChannel);
      }

      const room = getRoomById(roomId);
      if (!room) throw new Error("Room not found");

      set({ currentRoom: room });
      persistCurrentRoom();

      await initializePusher(roomId);
      set({ currentChannel: `chatroom-${roomId}` });
    } catch (error) {
      console.error("Error selecting room:", error);
    }
  },

  joinRoom: async (roomId: string, userId: string) => {
    await withUIHandler(
      async () => {
        const response = await joinChatroom(roomId, userId);
        set((state) => ({
          chatrooms: state.chatrooms.map((room) => (room.id === roomId ? response.data : room)),
          currentRoom: response.data,
          hasJoinedRoom: true,
          messages: [],
        }));
        await get().initializePusher(roomId);
      },
      useUIStore.getState().setLoading,
      useUIStore.getState().setError
    );
  },

  persistCurrentRoom: () => {
    const { currentRoom } = get();
    if (currentRoom) {
      saveToLocalStorage("currentRoom", currentRoom);
    }
  },

  loadPersistedRoom: async () => {
    const room = loadFromLocalStorage("currentRoom");
    if (!room) return;
    set({ currentRoom: room });
    await get().initializePusher(room.id);
  },

  reset: () => {
    get().cleanupPusher();
    removeFromLocalStorage("currentRoom");
    set(initialState);
  },
}));
