import { useEffect } from "react";
import HipHopDancing from "./files/Main/Hip Hop Dancing.fbx";

import HangingIdle from "./files/Intro/HangingIdle.fbx";
import Falling from "./files/Intro/Fall.fbx";
import Land from "./files/Intro/Land.fbx";
import Waving from "./files/Intro/Waving.fbx";

import Stunned from "./files/UserInput/Stunned.fbx";
import GettingUp from "./files/UserInput/Getting Up.fbx";

import Angry from "./files/Angry.fbx";
import Typing from "./files/Typing.fbx";

import RunningV1 from "./files/Running/RunningRight.fbx";

export const animations = {
  hipHop1: { file: HipHopDancing, once: true, blocking: false },
  angry: { file: Angry, once: false, blocking: false },
  stunned: { file: Stunned, once: true, blocking: true },
  gettingUp: { file: GettingUp, once: true, blocking: true },
  hangingIdle: { file: HangingIdle, once: false, blocking: true },
  falling: { file: Falling, once: false, blocking: true },
  land: { file: Land, once: true, blocking: true },
  waving: { file: Waving, once: true, blocking: true },
  runningV1: { file: RunningV1, once: false, blocking: true },
  typing: { file: Typing, once: true, blocking: false },
};

export const chainLookup = {
  stunned: "gettingUp",
  gettingUp: "angry",
  land: "waving",
  waving: "runningV1",
  typing: "angry",
};

export const useAnimations = (modelRef, running) => {
  useEffect(() => {
    animations.waving.cb = () => {
      running.current.active = true;
      running.current.direction = 1;
    };
  }, [modelRef, running]);
};
