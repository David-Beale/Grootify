export const triggersSlice = (set) => ({
  interfaceOpen: false,
  onInterfaceOpen: () => set(() => ({ interfaceOpen: true })),

  running: false,
  setRunning: (direction) => set(() => ({ running: direction })),

  lightsOn: false,
  setLightsOn: () => set(() => ({ lightsOn: true })),

  click: false,
  onClick: () => set(() => ({ click: [] })),

  isPlaying: false,
  setIsPlaying: (status) => set(() => ({ isPlaying: status })),

  mood: 2,
  setMood: (mood) => set(() => ({ mood })),
});
