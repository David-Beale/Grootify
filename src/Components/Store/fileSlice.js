export const fileSlice = (set) => ({
  file: null,
  setFile: (file) => set(() => ({ file })),
});
