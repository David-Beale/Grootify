export const authSlice = (set) => ({
  loggedIn: null,
  login: () => set(() => ({ loggedIn: true })),
  logout: () => set(() => ({ loggedIn: false })),
});
