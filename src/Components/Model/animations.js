import { useEffect } from "react";
import HipHopDancing from "./files/Main/Hip Hop Dancing.fbx";

import HangingIdle from "./files/Intro/HangingIdle.fbx";
import Falling from "./files/Intro/Fall.fbx";
import Land from "./files/Intro/Land.fbx";
import Waving from "./files/Intro/Waving.fbx";

import Stunned from "./files/UserInput/Stunned.fbx";
import GettingUp from "./files/UserInput/Getting Up.fbx";

import Angry from "./files/Angry.fbx";

import RunningV1 from "./files/Running/RunningRight.fbx";
import StopRight from "./files/Running/StopRight.fbx";

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
  stopRight: { file: StopRight, once: true, blocking: true },
};

export const chainLookup = {
  stunned: "gettingUp",
  gettingUp: "angry",
  land: "waving",
  waving: "runningV1",
  stopRight: "angry",
};

export const useAnimations = (posRef, running) => {
  useEffect(() => {
    animations.waving.cb = () => {
      running.current.active = true;
      running.current.direction = 1;
    };
  }, [posRef, running]);
};
