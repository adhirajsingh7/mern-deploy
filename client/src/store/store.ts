import { create } from "zustand";
import { persist } from "zustand/middleware";

type userState = {
  isLoggedIn: boolean;
  user: IUserProfile | Object;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (value: IUserProfile) => void;
};

export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: {},
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "loginStatus",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);
