import { create } from "zustand";

interface UIState {
  isMobile: boolean;
  showSidebar: boolean;
  showUserInfo: boolean;
  isLoading: boolean;
  error: string | null;

  setIsMobile: (isMobile: boolean) => void;
  setShowSidebar: (show: boolean) => void;
  setShowUserInfo: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  isMobile: false,
  showSidebar: false,
  showUserInfo: false,
  isLoading: false,
  error: null,
};

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  setIsMobile: (isMobile) => set({ isMobile }),
  setShowSidebar: (show) => set({ showSidebar: show }),
  setShowUserInfo: (show) => set({ showUserInfo: show }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
