export const authSlice = (set) => ({
  loggedIn: null,
  accessRequired: false,
  login: () => set(() => ({ loggedIn: true, accessRequired: false })),
  logout: () => {
    set(() => ({ loggedIn: false, interfaceOpen: false, lightsOn: false }));
    localStorage.removeItem("sp-accessToken");
    localStorage.removeItem("sp-refreshToken");
  },
  setAccessRequired: () => set(() => ({ accessRequired: true })),
});
