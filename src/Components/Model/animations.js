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

import ArmSwing from "./files/Dancing/ArmSwing.fbx";
import Silly from "./files/Dancing/Silly.fbx";

export const animations = {
  //params:
  //once = no loop
  //blockUser = no user interaction allowed
  //blockAll = animation must finish
  hangingIdle: { file: HangingIdle, blockUser: true },

  falling: { file: Falling, blockUser: true },
  land: { file: Land, once: true, blockUser: true },
  waving: { file: Waving, once: true, blockUser: true },
  runRight: { file: RunRight, blockUser: true },
  typing: { file: Typing, once: true, blockUser: true },
  runLeft: { file: RunLeft, blockUser: true },

  angry: { file: Angry, once: true, blockUser: true },
  stunned: { file: Stunned, once: true, blockAll: true },
  gettingUp: { file: GettingUp, once: true, blockAll: true },

  idle: { file: Idle },
  happyIdle: { file: HappyIdle },
  scared: { file: Scared, blockUser: true },

  //default dancing:
  ArmSwing: { file: ArmSwing, once: true },
  Silly: { file: Silly, once: true },
};

export const allDanceLow = ["ArmSwing", "Silly"];
export const danceLowStack = ["ArmSwing", "Silly"];

export const allDanceMed = ["ArmSwing", "Silly"];
export const danceMedStack = ["ArmSwing", "Silly"];

export const allDanceHigh = ["ArmSwing", "Silly", "Twerk"];
export const danceHighStack = ["ArmSwing", "Silly"];
