export const loaderSlice = (set) => ({
  isPreLoaded: false,
  setPreLoaded: () => set(() => ({ isPreLoaded: true })),
  isLoaded: false,
  setLoaded: () => set(() => ({ isLoaded: true })),
});
