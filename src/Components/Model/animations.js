import HangingIdle from "./files/Intro/HangingIdle.fbx";
import Falling from "./files/Intro/Fall.fbx";
import Land from "./files/Intro/Land.fbx";
import Waving from "./files/Intro/Waving.fbx";

import Stunned from "./files/UserInput/Stunned.fbx";
import GettingUp from "./files/UserInput/Getting Up.fbx";

import Angry from "./files/Angry.fbx";
import Typing from "./files/Typing.fbx";

import RunRight from "./files/Running/RunningRight.fbx";
import RunLeft from "./files/Running/RunningLeft.fbx";

import HappyIdle from "./files/Idle/Happy Idle.fbx";
import Idle from "./files/Idle/Breathing Idle.fbx";
import Scared from "./files/Running/Scared.fbx";

export const animations = {
  hangingIdle: { file: HangingIdle, once: false, blockUser: true },

  falling: { file: Falling, once: false, blockUser: true },
  land: { file: Land, once: true, blockUser: true },
  waving: { file: Waving, once: true, blockUser: true },
  runRight: { file: RunRight, once: false, blockUser: true },
  typing: { file: Typing, once: true, blockUser: true },
  runLeft: { file: RunLeft, once: false, blockUser: true },

  angry: { file: Angry, once: true, blockUser: true },
  stunned: { file: Stunned, once: true, blockAll: true },
  gettingUp: { file: GettingUp, once: true, blockAll: true },

  idle: { file: Idle, once: false },
  happyIdle: { file: HappyIdle, once: false },
  scared: { file: Scared, once: false, blockUser: true },
};
