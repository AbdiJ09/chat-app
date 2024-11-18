import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "../types/chat";

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
