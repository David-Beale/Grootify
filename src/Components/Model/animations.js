import HipHopDancing from "./files/Hip Hop Dancing.fbx";
import Angry from "./files/Angry.fbx";
import Stunned from "./files/Stunned.fbx";
import GettingUp from "./files/Getting Up.fbx";
import HangingIdle from "./files/HangingIdle.fbx";
import Falling from "./files/Fall.fbx";
import Land from "./files/Land.fbx";
import Waving from "./files/Waving.fbx";

export const animations = {
  hipHop1: { file: HipHopDancing, once: true, blocking: false },
  angry: { file: Angry, once: false, blocking: false },
  stunned: { file: Stunned, once: true, blocking: true },
  gettingUp: { file: GettingUp, once: true, blocking: true },
  hangingIdle: { file: HangingIdle, once: false, blocking: true },
  falling: { file: Falling, once: false, blocking: true },
  land: { file: Land, once: true, blocking: true },
  waving: { file: Waving, once: true, blocking: true },
};

export const chainLookup = {
  stunned: "gettingUp",
  gettingUp: "angry",
  land: "waving",
  waving: "angry",
};
