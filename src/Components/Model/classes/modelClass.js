import { animations } from "../animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Model from "../files/Model/Model.fbx";
import { useStore } from "../../Store/store";
import DanceManager from "./danceManager";
import RunningManager from "./runningManager";
import PositionManager from "./positionManager";
import MouseManager from "./mouseManager";
import JointManager from "./jointManager";

class ModelClass {
  constructor() {
    this.loader = new FBXLoader();
    this.chain = [];
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
      this.chain.push({ animation: "dance" });
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
    let { animation, cb } = this.chain.shift();
    if (cb) cb();
    const action = this.animationRouter(animation);
    if (!action) return;
    action.reset();
    this.fade(action);
    action.play();
    this.currentAction = action;
    this.mixer.addEventListener("finished", this.runNextAnimation);
  };
  getBlockingActions() {
    const blockingActions = [];
    for (let i = 0; i < this.chain.length; i++) {
      const action = this.chain[i];
      if (
        !this.actions[action.animation] ||
        !this.actions[action.animation].blockAll
      ) {
        break;
      }
      blockingActions.push(action);
    }
    return blockingActions;
  }
  setNextAnimation({ chain, isUserAction = false }) {
    if (
      (this.currentAction.blockUser || this.currentAction.blockAll) &&
      isUserAction
    ) {
      return;
    }
    if (this.currentAction.blockAll) {
      if (!chain) return;
      const blockingActions = this.getBlockingActions();
      this.chain = [...blockingActions, ...chain];
      return;
    }
    if (chain) this.chain = chain;
    this.runNextAnimation();
  }
  startFalling = () => {
    this.positionManager.startFalling();
    this.started = true;
  };
  land = () => {
    useStore.setState({ lightsOn: true });
  };
  runLeft = () => {
    this.positionManager.setDirection(-1);
  };
  runRight = () => {
    this.positionManager.setDirection(1);
  };
  runScared = () => {
    this.positionManager.setDirection(1);
    this.runningManager.setScared();
  };

  typing = () => {
    setTimeout(() => {
      useStore.setState({ interfaceOpen: true });
    }, 3000);
  };

  moveJoints() {
    if (!this.currentAction || this.currentAction.name !== "idle") return;
    this.jointManager.moveJoints();
  }
  fadeJoints() {
    this.jointManager.fadeJoints();
  }
  wave() {
    if (
      !this.currentAction ||
      this.currentAction.blockUser ||
      this.currentAction.blockAll
    ) {
      return;
    }
    const wave = this.mouseManager.wave();
    if (wave) this.waveChain();
  }
  fall() {
    if (!this.positionManager.isFalling) return;
    this.positionManager.incrVel(-0.01);
    this.positionManager.updateY();
    const stopped = this.positionManager.checkForYLimit();
    if (stopped) this.setNextAnimation({ override: true });
  }
  run() {
    if (!this.positionManager.runningDirection) return;
    this.positionManager.incrVel(0.008, 0.4);
    this.positionManager.updateX();
    const stopped = this.positionManager.checkForXLimit();
    if (stopped) this.setNextAnimation({ override: true });
  }

  //
  // ─── CHAINS ─────────────────────────────────────────────────────────────────────
  //
  leftDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "running", cb: this.runLeft },
        { animation: "dance" },
      ],
    });
  }
  danceChain() {
    this.setNextAnimation({
      chain: [{ animation: "dance" }],
    });
  }

  rightDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "running", cb: this.runRight },
        { animation: "dance" },
      ],
    });
  }
  rightIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "running", cb: this.runRight },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    });
  }

  idleChain() {
    this.setNextAnimation({
      chain: [{ animation: "idle", cb: this.jointManager.getJointAngle }],
    });
  }
  angryChain() {
    this.setNextAnimation({
      chain: [
        { animation: "angry" },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    });
  }
  scaredDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "running", cb: this.runScared },
        { animation: "dance" },
      ],
    });
  }
  scaredIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "running", cb: this.runScared },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    });
  }
  fallingChain() {
    model.setNextAnimation({
      chain: [
        { animation: "falling", cb: this.startFalling },
        { animation: "land", cb: this.land },
        { animation: "waving", cb: () => (this.fadeSpeed = 0.5) },
        { animation: "running", cb: this.runRight },
        { animation: "typing", cb: this.typing },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    });
  }
  waveChain() {
    const chain = [{ animation: "waving" }];
    if (this.currentAction.name === "idle") {
      chain.push({ animation: "idle", cb: this.jointManager.getJointAngle });
    } else if (this.chain[0].animation === "dance") {
      chain.push({ animation: "dance" });
    }
    model.setNextAnimation({
      chain,
      isUserAction: true,
    });
  }
  fallOverChain() {
    const chain = [{ animation: "stunned" }, { animation: "gettingUp" }];
    if (this.currentAction.name === "idle") {
      chain.push({ animation: "idle", cb: this.jointManager.getJointAngle });
    } else if (this.chain[0].animation === "dance") {
      chain.push({ animation: "dance" });
    }
    model.setNextAnimation({
      chain,
      isUserAction: true,
    });
  }

  //
  // ─── END ────────────────────────────────────────────────────────────────────────
  //
}

const model = new ModelClass();

export default model;
