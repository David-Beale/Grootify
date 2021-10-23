import HangingIdle from "./files/Intro/HangingIdle.fbx";
import Falling from "./files/Intro/Fall.fbx";
import Land from "./files/Intro/Land.fbx";
import Waving from "./files/Intro/Waving.fbx";

import Stunned from "./files/UserInput/Stunned.fbx";
import GettingUp from "./files/UserInput/Getting Up.fbx";

import Angry from "./files/Angry.fbx";
import Typing from "./files/Typing.fbx";

import RunRight from "./files/Running/RunningRight.fbx";

export const animations = {
  hangingIdle: { file: HangingIdle, once: false, blocking: true },

  falling: { file: Falling, once: false, blocking: true },
  land: { file: Land, once: true, blocking: true },
  waving: { file: Waving, once: true, blocking: true },
  runRight: { file: RunRight, once: false, blocking: true },
  typing: { file: Typing, once: true, blocking: false },

  angry: { file: Angry, once: false, blocking: false },
  stunned: { file: Stunned, once: true, blocking: true },
  gettingUp: { file: GettingUp, once: true, blocking: true },
};
