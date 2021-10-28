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
import HipHop5 from "./files/Dancing/HipHop5.fbx";
import Jazz3 from "./files/Dancing/Jazz3.fbx";
import Shuffling from "./files/Dancing/Shuffling.fbx";
import Belly from "./files/Dancing/Belly.fbx";

export const animations = {
  //params:
  //once = no loop
  //blockUser = no user interaction allowed
  //blockAll = animation must finish
  hangingIdle: { file: HangingIdle, blockUser: true },

  falling: { file: Falling, blockUser: true },
  land: { file: Land, once: true, blockUser: true },
  waving: { file: Waving, once: true, blockUser: true },
  typing: { file: Typing, once: true, blockUser: true },

  angry: { file: Angry, once: true, blockUser: true },
  stunned: { file: Stunned, once: true, blockAll: true },
  gettingUp: { file: GettingUp, once: true, blockAll: true },

  idle: { file: Idle },
  happyIdle: { file: HappyIdle },

  runRight: { file: RunRight, blockUser: true },
  scared: { file: Scared, blockUser: true },
  runLeft: { file: RunLeft, blockUser: true },

  //default dancing:
  ArmSwing: { file: ArmSwing, once: true },
  HipHop5: { file: HipHop5, once: true },
  Jazz3: { file: Jazz3, once: true },
  Shuffling: { file: Shuffling, once: true },
  Belly: { file: Belly, once: true },
};

export const runLeft = [
  "runLeft",
  "RunningLeft2",
  "RunningLeft3",
  "RunningLeft4",
];
export const runLeftStack = ["runLeft"];
export const runRight = ["runRight"];
export const runScared = ["scared"];

export const allDanceLow = [
  "Breakdance2",
  "Spin",
  "HipHop5",
  "Jazz2",
  "Samba4",
  "Salsa3",
  "Salsa4",
  "Dance",
  "Jazz3",
  "HipHop11",
  "Belly",
  "Arms",
];
export const danceLowStack = ["HipHop5", "Jazz3"];

export const allDanceMed = [
  "ArmSwing",
  "Rumba",
  "Twist",
  "Breakdance1",
  "Shuffling",
  "Swing",
  "Bboy1",
  "Robot",
  "Samba1",
  "HipHop2",
  "HipHop3",
  "HipHop4",
  "Breakdance2",
  "Spin",
  "HipHop5",
  "Swing2",
  "Salsa1",
  "Hokey",
  "HipHop6",
  "Chicken",
  "Samba2",
  "Jazz",
  "Maraschino",
  "Jazz2",
  "Samba3",
  "Samba4",
  "Salsa2",
  "Locking",
  "Silly2",
  "HipHop7",
  "Salsa3",
  "Salsa4",
  "Macarena",
  "HipHop8",
  "HipHop9",
  "HipHop10",
  "Jazz3",
  "HipHop11",
  "Swing3",
  "Dance2",
  "HipHop12",
  "Tut",
  "Samba5",
  "Can",
  "Samba6",
  "Bboy2",
  "House2",
  "HipHop13",
  "Arms",
];
export const danceMedStack = ["ArmSwing", "HipHop5", "Jazz3", "Shuffling"];

export const allDanceHigh = [
  "ArmSwing",
  "Silly1",
  "Twerk",
  "Rumba",
  "Twist",
  "Breakdance1",
  "Brooklyn1",
  "Shuffling",
  "Swing",
  "Bboy1",
  "Robot",
  "House1",
  "Samba1",
  "HipHop2",
  "HipHop3",
  "HipHop4",
  "Spin",
  "HipHop5",
  "Swing2",
  "Salsa1",
  "HipHop6",
  "Chicken",
  "Samba2",
  "Jazz",
  "Maraschino",
  "Samba3",
  "Salsa2",
  "Locking",
  "Silly2",
  "HipHop7",
  "Macarena",
  "HipHop8",
  "HipHop9",
  "HipHop10",
  "Swing3",
  "Dance2",
  "HipHop12",
  "Tut",
  "Samba5",
  "Samba6",
  "Bboy2",
  "House2",
  "Running",
];
export const danceHighStack = ["ArmSwing", "HipHop5", "Shuffling"];
