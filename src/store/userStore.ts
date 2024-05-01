import { Member } from "@/types/type.member";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserState {
  user: Member | null;
  setUser: (by: Member) => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: Member) => set({ user }),
}));
