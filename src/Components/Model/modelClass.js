import { animations } from "./animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Main from "./files/Main/Hip Hop Dancing.fbx";

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
  fall() {
    this.falling = true;
    this.started = true;
  }
  land() {
    this.falling = false;
    this.started = true;
    this.ref.current.position.y = -20;
    this.vel = 0;
  }
}

const model = new ModelClass();

export default model;
