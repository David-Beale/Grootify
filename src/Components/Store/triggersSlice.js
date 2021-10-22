export const triggersSlice = (set) => ({
  interfaceOpen: false,
  onInterfaceOpen: () => set(() => ({ interfaceOpen: true })),
});
