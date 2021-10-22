import create from "zustand";

export const useAuthStore = create((set) => ({
  loggedIn: null,
  login: () => set(() => ({ loggedIn: true })),
  logout: () => set(() => ({ loggedIn: false })),
}));
