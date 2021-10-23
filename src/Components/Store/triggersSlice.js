export const triggersSlice = (set) => ({
  interfaceOpen: false,
  onInterfaceOpen: () => set(() => ({ interfaceOpen: true })),

  running: false,
  setRunning: (direction) => set(() => ({ running: direction })),

  lightsOn: false,
  setLightsOn: () => set(() => ({ lightsOn: true })),

  click: false,
  onClick: () => set(() => ({ click: [] })),
});
