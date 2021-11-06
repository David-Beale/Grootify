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
import Belly from "./files/Dancing/Belly.fbx";
import Samba1 from "./files/Dancing/Samba1.fbx";
import Samba5 from "./files/Dancing/Samba5.fbx";
import Dance from "./files/Dancing/Dance.fbx";
import House2 from "./files/Dancing/House2.fbx";
import Gangnam from "./files/Dancing/Gangnam Style.fbx";

import moonwalk from "./files/Thriller/Moonwalk.fbx";
import thrillerIdle from "./files/Thriller/Thriller Idle.fbx";

export const animations = {
  //params:
  //once = no loop
  //blockUser = no user interaction allowed
  //blockAll = animation must finish
  hangingIdle: { file: HangingIdle, blockUser: true },

  falling: { file: Falling, blockAll: true },
  land: { file: Land, once: true, blockAll: true },
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
  Belly: { file: Belly, once: true },
  Samba1: { file: Samba1, once: true },
  Samba5: { file: Samba5, once: true },
  Dance: { file: Dance, once: true },
  House2: { file: House2, once: true },
  Gangnam: { file: Gangnam },

  moonwalk: { file: moonwalk, once: true, blockUser: true },
  thrillerIdle: { file: thrillerIdle, blockUser: true },
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

export const gangnam = ["Gangnam"];

export const allDanceLow = [
  "Arms",
  "Belly",
  "Breakdance2",
  "Dance",
  "HipHop11",
  "Jazz2",
  "Jazz3",
  "Salsa4",
  "Samba4",
];
export const danceLowStack = ["Dance", "Belly"];

export const allDanceMed = [
  "ArmSwing",
  "Arms",
  "Bboy1",
  "Bboy2",
  "Breakdance2",
  "Can",
  "Chicken",
  "Dance2",
  "HipHop11",
  "HipHop13",
  "HipHop2",
  "HipHop3",
  "HipHop4",
  "HipHop5",
  "HipHop6",
  "HipHop7",
  "HipHop8",
  "Hokey",
  "House2",
  "Jazz2",
  "Jazz3",
  "Locking",
  "Macarena",
  "Maraschino",
  "Robot",
  "Rumba",
  "Salsa1",
  "Salsa2",
  "Salsa3",
  "Salsa4",
  "Samba1",
  "Samba2",
  "Samba3",
  "Samba4",
  "Samba5",
  "Samba6",
  "Silly2",
  "Swing",
  "Swing2",
  "Swing3",
  "Tut",
  "Twist",
];
export const danceMedStack = ["ArmSwing", "Samba1"];

export const allDanceHigh = [
  "Bboy1",
  "Bboy2",
  "Dance2",
  "HipHop10",
  "HipHop12",
  "HipHop2",
  "HipHop3",
  "HipHop4",
  "HipHop5",
  "HipHop6",
  "HipHop7",
  "HipHop8",
  "House1",
  "House2",
  "Locking",
  "Maraschino",
  "Robot",
  "Rumba",
  "Running",
  "Salsa1",
  "Salsa2",
  "Samba1",
  "Samba2",
  "Samba3",
  "Samba5",
  "Samba6",
  "Shuffling",
  "Silly1",
  "Silly2",
  "Swing",
  "Swing2",
  "Swing3",
  "Tut",
  "Twerk",
  "ArmSwing",
];
export const danceHighStack = ["ArmSwing", "Samba5", "House2"];

export const loops = {
  Can: 2,
  Chicken: 2,
  HipHop12: 2,
  Maraschino: 2,
  Bboy1: 3,
  Bboy2: 2,
  Breakdance2: 3,
  Jazz2: 3,
  Jazz3: 3,
  Rumba: 3,
  Salsa2: 3,
  Swing2: 2,
};

export const thriller = [
  "moonwalk",
  "thrillerIdle",
  "thriller1",
  "thriller2",
  "thriller3",
  "thriller4",
];
