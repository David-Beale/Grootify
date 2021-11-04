import { animations } from "../animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Model from "../files/Model/Model.fbx";

export default class AnimationManager {
  constructor(model) {
    this.model = model;
    this.mixer = null;
    this.loader = new FBXLoader();
    this.fbx = null;
    this.actions = {};
    this.currentAction = null;
    this.fadeSpeed = 0.25;
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
          this.model.jointManager.setJoint(c);
        }
      });
      this.mixer = new AnimationMixer(model);
      this.fbx = model;
      for (const name in animations) {
        this.loadFile(name, animations[name]);
      }
    });
  }
  loadAnimation = ({ animation, name, once, loop, blockUser, blockAll }) => {
    const action = this.mixer.clipAction(animation);
    if (once) {
      action.loop = LoopOnce;
      action.clampWhenFinished = true;
    } else if (loop) {
      action.repetitions = loop;
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
  };
  loadFile = (name, anim) => {
    const { file, once, blockUser, blockAll } = anim;
    this.loader.load(file, (fbx) => {
      this.loadAnimation({
        animation: fbx.animations[0],
        name,
        once,
        blockUser,
        blockAll,
      });
    });
  };
  reset() {
    this.model.danceManager.isDancing = false;
  }
  animationRouter(animation) {
    if (animation === "dance") {
      //dancing will always be the last in a chain, continue dancing until manually stopped
      this.model.chainManager.push("danceChain");
      const dance = this.model.danceManager.get(this.currentAction);
      return this.actions[dance];
    } else if (animation === "running") {
      const run = this.model.runningManager.get();
      if (!run) return false;
      return this.actions[run];
    } else if (animation === "thriller") {
      this.model.chainManager.push("thrillerNextChain");
      const move = this.model.thrillerManager.get();
      if (!move) return false;
      return this.actions[move];
    } else if (animation === this.currentAction.name) return false;
    return this.actions[animation];
  }
  fade(action) {
    if (!this.currentAction) return;
    action.crossFadeFrom(this.currentAction, this.fadeSpeed);
    this.model.jointManager.checkIfFadeRequired(this.currentAction, action);
  }
  eventFinished = (e) => {
    //ignore old event listener:
    if (e.action.name !== this.currentAction.name) return;
    this.runNextAnimation();
  };

  runNextAnimation = () => {
    this.mixer.removeEventListener("finished", this.eventFinished);
    this.reset();
    let { animation, cb } = this.model.chainManager.shift();
    if (cb) {
      const skip = cb();
      if (skip) return;
    }
    const action = this.animationRouter(animation);
    if (!action) return;
    action.reset();
    this.fade(action);
    action.play();
    this.currentAction = action;
    this.mixer.addEventListener("finished", this.eventFinished);
  };
  waveAllowed = () => {
    return (
      this.currentAction &&
      !this.currentAction.blockUser &&
      !this.currentAction.blockAll
    );
  };
}
