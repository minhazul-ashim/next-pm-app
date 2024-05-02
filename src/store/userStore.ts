import { Member } from "@/types/type.member";
import { create } from "zustand";

export interface UserState {
  user: Member | null;
  setUser: (by: Member) => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: Member) => set({ user }),
}));
