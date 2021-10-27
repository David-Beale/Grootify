import { animations } from "../animations";
import { AnimationMixer, LoopOnce } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Model from "../files/Model/Model.fbx";
import { useStore } from "../../Store/store";
import DanceManager from "./danceManager";
import RunningManager from "./runningManager";
import PositionManager from "./positionManager";

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
    this.neck = null;
    this.waist = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.fadeJointsRequired = false;
    this.x = 0;
    this.y = 0;
    this.waveStatus = { count: 0, side: null, time: null };
    this.positionManager = new PositionManager();
    this.danceManager = new DanceManager(this.actions);
    this.runningManager = new RunningManager(this.positionManager);
    this.init();
  }
  init() {
    this.loader.load(Model, (model) => {
      model.scale.setScalar(0.02);
      model.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.__r3f = { handlers: {} };
        } else if (c.isBone && c.name === "mixamorigNeck") {
          this.neck = c;
        } else if (c.isBone && c.name === "mixamorigSpine") {
          this.waist = c;
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
    //if prev action was idle, we need to fade out the manually controlled joints
    //ignore "stunned" as it will result in a clanky animation
    if (this.currentAction.name === "idle" && action.name !== "stunned") {
      this.fadeJointsRequired = true;
      setTimeout(() => {
        this.fadeJointsRequired = false;
      }, 500);
    }
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
  getJointAngle = () => {
    this.x = this.neck.rotation.y / 1.2;
    this.y = this.neck.rotation.x / 1.2;
  };
  moveJoint(joint, angle) {
    joint.rotation.y = this.x * angle;
    joint.rotation.x = this.y * angle;
  }
  moveJoints() {
    if (!this.currentAction || this.currentAction.name !== "idle") return;
    // adjust xpos to account for model position
    let xPos = this.mouseX;
    if (this.positionManager.pos === "right") {
      xPos -= 0.43;
      if (xPos > 0) xPos *= 13;
    } else {
      xPos *= 2;
    }
    this.x += (xPos - this.x) * 0.07;
    this.y += (this.mouseY - 0.1 - this.y) * 0.07;
    this.moveJoint(this.neck, 1.2);
    this.moveJoint(this.waist, 0.5);
  }
  fadeJoints() {
    if (!this.fadeJointsRequired) return;
    const targetX = this.neck.rotation.y / 1.2;
    const targetY = this.neck.rotation.x / 1.2;

    this.x += (targetX - this.x) * 0.07;
    this.y += (targetY - this.y) * 0.07;
    this.moveJoint(this.neck, 1.2);
    this.moveJoint(this.waist, 0.5);
  }
  getSide() {
    if (this.mouseX < -0.17) return -1;
    if (this.mouseX < 0.17) return 0;
    return 1;
  }
  checkForWave() {
    if (
      !this.currentAction ||
      this.currentAction.blockUser ||
      this.currentAction.blockAll
    ) {
      return;
    }
    const newSide = this.getSide();
    if (!newSide) return;
    const { count, side, time } = this.waveStatus;
    const newTime = Date.now();
    if (!count) {
      this.waveStatus.count++;
      this.waveStatus.side = newSide;
      this.waveStatus.time = newTime;
      return;
    } else {
      if (side === newSide) return;
      if (newTime - time > 1000) return (this.waveStatus.count = 0);

      this.waveStatus.count++;
      this.waveStatus.side = newSide;
      this.waveStatus.time = newTime;
    }
    if (this.waveStatus.count === 3) {
      this.waveChain();
      this.waveStatus.count = 0;
    }
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
        { animation: "idle", cb: this.getJointAngle },
      ],
    });
  }

  idleChain() {
    this.setNextAnimation({
      chain: [{ animation: "idle", cb: this.getJointAngle }],
    });
  }
  angryChain() {
    this.setNextAnimation({
      chain: [
        { animation: "angry" },
        { animation: "idle", cb: this.getJointAngle },
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
        { animation: "idle", cb: this.getJointAngle },
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
        { animation: "idle", cb: this.getJointAngle },
      ],
    });
  }
  waveChain() {
    const chain = [{ animation: "waving" }];
    if (this.currentAction.name === "idle") {
      chain.push({ animation: "idle", cb: this.getJointAngle });
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
      chain.push({ animation: "idle", cb: this.getJointAngle });
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
