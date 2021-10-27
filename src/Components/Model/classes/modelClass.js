import { animations } from "../animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Model from "../files/Model/Model.fbx";
import DanceManager from "./danceManager";
import RunningManager from "./runningManager";
import PositionManager from "./positionManager";
import MouseManager from "./mouseManager";
import JointManager from "./jointManager";
import ChainManager from "./chainManager";

class ModelClass {
  constructor() {
    this.loader = new FBXLoader();

    this.actions = {};
    this.mixer = null;
    this.currentAction = null;
    this.fadeSpeed = 0.25;
    this.fbx = null;
    this.started = false;
    this.positionManager = new PositionManager();
    this.danceManager = new DanceManager(this.actions);
    this.runningManager = new RunningManager(this.positionManager);
    this.mouseManager = new MouseManager();
    this.jointManager = new JointManager(
      this.mouseManager,
      this.positionManager
    );
    this.chainManager = new ChainManager(this);
    this.init();
  }
  init() {
    this.loader.load(Model, (model) => {
      model.scale.setScalar(0.02);
      model.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.__r3f = { handlers: {} };
        } else {
          this.jointManager.setJoint(c);
        }
      });
      this.mixer = new AnimationMixer(model);
      this.fbx = model;
      for (const name in animations) {
        this.loadAnimation(name, animations[name]);
      }
    });
  }
  loadAnimation = (name, anim) => {
    const { file, once, blockUser, blockAll } = anim;
    this.loader.load(file, (fbx) => {
      const action = this.mixer.clipAction(fbx.animations[0]);
      if (once) {
        action.loop = LoopOnce;
        action.clampWhenFinished = true;
      }
      action.name = name;
      action.blockUser = blockUser;
      action.blockAll = blockAll;
      this.actions[name] = action;
      if (name === "idle") {
        action._clip.tracks.splice(5, 1);
        action._clip.tracks.splice(2, 1);
      }
      if (name === "hangingIdle") {
        this.currentAction = action;
        action.play();
      }
    });
  };
  reset() {
    this.danceManager.isDancing = false;
  }
  animationRouter(animation) {
    if (animation === "dance") {
      //dancing will always be the last in a chain, continue dancing until manually stopped
      this.chainManager.push("danceChain");
      const dance = this.danceManager.get(
        this.currentAction,
        this.loadAnimation
      );
      return this.actions[dance];
    }
    if (animation === "running") {
      const run = this.runningManager.get();
      if (!run) return false;
      return this.actions[run];
    }
    if (animation === this.currentAction.name) return false;
    return this.actions[animation];
  }
  fade(action) {
    if (!this.currentAction) return;
    action.crossFadeFrom(this.currentAction, this.fadeSpeed);
    this.jointManager.checkIfFadeRequired(this.currentAction, action);
  }

  runNextAnimation = () => {
    this.mixer.removeEventListener("finished", this.runNextAnimation);
    this.reset();
    let { animation, cb } = this.chainManager.shift();
    if (cb) cb();
    const action = this.animationRouter(animation);
    if (!action) return;
    action.reset();
    this.fade(action);
    action.play();
    this.currentAction = action;
    this.mixer.addEventListener("finished", this.runNextAnimation);
  };

  moveJoints() {
    if (!this.currentAction || this.currentAction.name !== "idle") return;
    this.jointManager.moveJoints();
  }
  fadeJoints() {
    this.jointManager.fadeJoints();
  }
  waveAllowed() {
    return (
      this.currentAction &&
      !this.currentAction.blockUser &&
      !this.currentAction.blockAll
    );
  }
  wave() {
    if (this.waveAllowed()) {
      const wave = this.mouseManager.wave();
      if (wave) this.setChain("waveChain");
    }
  }
  fall() {
    const end = this.positionManager.fall();
    if (end) this.runNextAnimation();
  }
  run() {
    const end = this.positionManager.run();
    if (end) this.runNextAnimation();
  }

  setChain(chain) {
    const nextAction = this.chainManager.setChain(chain, this.currentAction);
    if (nextAction) this.runNextAnimation();
  }
}

const model = new ModelClass();

export default model;
