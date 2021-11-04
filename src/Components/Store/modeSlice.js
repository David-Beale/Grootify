export const modeSlice = (set) => ({
  mode: null,

  setMode: (mode) => set(() => ({ mode })),
});
