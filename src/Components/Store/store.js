import create from "zustand";
import { authSlice } from "./authSlice";
import { fileSlice } from "./fileSlice";
import { loaderSlice } from "./loaderSlice";
import { modeSlice } from "./modeSlice";
import { playlistSlice } from "./playlistSlice";
import { searchSlice } from "./searchSlice";
import { songsSlice } from "./songsSlice";
import { triggersSlice } from "./triggersSlice";

export const useStore = create((set, get) => ({
  ...authSlice(set, get),
  ...fileSlice(set, get),
  ...loaderSlice(set, get),
  ...modeSlice(set, get),
  ...playlistSlice(set, get),
  ...searchSlice(set, get),
  ...songsSlice(set, get),
  ...triggersSlice(set, get),
}));
