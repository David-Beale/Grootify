import { animations } from "./animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Main from "./files/Main/Hip Hop Dancing.fbx";
import { useStore } from "../Store/store";

class ModelClass {
  constructor() {
    this.loader = new FBXLoader();
    this.chain = [];
    this.actions = {};
    this.mixer = null;
    this.currentAction = null;
    this.fadeSpeed = 0.25;
    this.fbx = null;
    this.vel = 0;
    this.ref = null;
    this.falling = false;
    this.started = false;
    this.pos = null;
    this.init();
  }
  init() {
    const mainModel = Main;
    this.loader.load(mainModel, (fbx) => {
      fbx.scale.setScalar(0.02);
      fbx.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.__r3f = { handlers: {} };
        }
      });
      this.mixer = new AnimationMixer(fbx);
      const action = this.mixer.clipAction(fbx.animations[0]);
      this.actions["hipHop1"] = action;
      action.name = "hipHop1";
      action.blocking = false;
      this.fbx = fbx;
      for (const name in animations) {
        this.loadAnimation(name, animations[name]);
      }
    });
  }
  loadAnimation(name, anim) {
    const { file, once, blocking } = anim;
    this.loader.load(file, (fbx) => {
      const action = this.mixer.clipAction(fbx.animations[0]);
      if (once) {
        action.loop = LoopOnce;
        action.clampWhenFinished = true;
      }
      action.name = name;
      action.blocking = blocking;
      this.actions[name] = action;

      if (name === "hangingIdle") {
        this.currentAction = action;
        action.play();
      }
    });
  }
  runNextAnimation = () => {
    this.mixer.removeEventListener("finished", this.runNextAnimation);
    const next = this.chain.shift();
    if (!next) return;
    const { animation, cb } = next;
    if (animation === this.currentAction.name) return;
    if (cb) cb();
    const action = this.actions[animation];
    action.reset();
    if (this.currentAction) {
      action.crossFadeFrom(this.currentAction, this.fadeSpeed);

      if (this.currentAction.name === "land") {
        this.fadeSpeed = 0.5;
      }
    }
    action.play();
    this.currentAction = action;

    this.mixer.addEventListener("finished", this.runNextAnimation);
  };
  setNextAnimation({ chain, override = false }) {
    if (!override && this.currentAction.blocking) return;
    if (chain) this.chain = chain;
    this.runNextAnimation();
  }
  setRef(ref) {
    this.ref = ref;
  }
  fall = () => {
    this.falling = true;
    this.started = true;
  };
  land = () => {
    this.falling = false;
    this.started = true;
    this.ref.current.position.y = -20;
    this.vel = 0;
    useStore.setState({ lightsOn: true });
  };

  runLeft = () => {
    this.running = -1;
    this.vel = 0;
    this.pos = "transit";
  };
  endLeft = () => {
    this.pos = "left";
  };
  runRight = () => {
    this.running = 1;
    this.vel = 0;
    this.pos = "transit";
  };
  endRight = () => {
    this.pos = "right";
  };
  typing = () => {
    this.pos = "right";
    setTimeout(() => {
      useStore.setState({ interfaceOpen: true });
    }, 4000);
  };
  //
  // ─── CHAINS ─────────────────────────────────────────────────────────────────────
  //
  leftDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runLeft", cb: this.runLeft },
        { animation: "hipHop1", cb: this.endLeft },
      ],
      override: true,
    });
  }
  danceChain() {
    this.setNextAnimation({
      chain: [{ animation: "hipHop1" }],
      override: true,
    });
  }

  rightDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runRight", cb: this.runRight },
        { animation: "hipHop1", cb: this.endRight },
      ],
      override: true,
    });
  }
  rightIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runRight", cb: this.runRight },
        { animation: "idle", cb: this.endRight },
      ],
      override: true,
    });
  }

  idleChain() {
    this.setNextAnimation({
      chain: [{ animation: "idle" }],
      override: true,
    });
  }
  angryChain() {
    this.setNextAnimation({
      chain: [{ animation: "angry" }],
      override: true,
    });
  }
  scaredDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "scared", cb: this.runRight },
        { animation: "hipHop1", cb: this.endRight },
      ],
      override: true,
    });
  }
  scaredIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "scared", cb: this.runRight },
        { animation: "idle", cb: this.endRight },
      ],
      override: true,
    });
  }
  fallingChain() {
    model.setNextAnimation({
      chain: [
        { animation: "falling", cb: this.fall },
        { animation: "land", cb: this.land },
        { animation: "waving" },
        { animation: "runRight", cb: this.runRight },
        { animation: "typing", cb: this.typing },
        { animation: "angry" },
      ],
      override: true,
    });
  }
  fallOverChain() {
    model.setNextAnimation({
      chain: [
        { animation: "stunned" },
        { animation: "gettingUp" },
        { animation: "angry" },
      ],
    });
  }

  //
  // ─── END ────────────────────────────────────────────────────────────────────────
  //
}

const model = new ModelClass();

export default model;
