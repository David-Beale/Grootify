export const loaderSlice = (set) => ({
  isLoaded: false,
  setLoaded: () => set(() => ({ isLoaded: true })),
});
