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
    this.neck = null;
    this.waist = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.x = 0;
    this.y = 0;
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
        } else if (c.isBone && c.name === "mixamorigNeck") {
          this.neck = c;
        } else if (c.isBone && c.name === "mixamorigSpine") {
          this.waist = c;
        }
      });
      this.mixer = new AnimationMixer(fbx);
      const action = this.mixer.clipAction(fbx.animations[0]);
      this.actions["hipHop1"] = action;
      action.name = "hipHop1";
      this.fbx = fbx;
      for (const name in animations) {
        this.loadAnimation(name, animations[name]);
      }
    });
  }
  loadAnimation(name, anim) {
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
  getBlockingActions() {
    const blockingActions = [];
    for (let i = 0; i < this.chain.length; i++) {
      const action = this.chain[i];
      if (this.actions[action.animation].blockAll) {
        blockingActions.push(action);
      } else {
        break;
      }
    }
    return blockingActions;
  }
  setNextAnimation({ chain, userAction = false }) {
    if (
      (this.currentAction.blockUser || this.currentAction.blockAll) &&
      userAction
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
    this.getJointAngle(this.neck, 1.2);
  };
  typing = () => {
    this.pos = "right";
    setTimeout(() => {
      useStore.setState({ interfaceOpen: true });
    }, 4000);
  };
  getJointAngle(joint, angle) {
    this.x = joint.rotation.y / angle;
    this.y = joint.rotation.x / angle;
  }
  moveJoint(joint, angle) {
    joint.rotation.y = this.x * angle;
    joint.rotation.x = this.y * angle;
  }
  moveJoints() {
    if (!this.currentAction || this.currentAction.name !== "idle") return;
    // adjust xpos to account for model position (on the far right)
    let xPos = this.mouseX - 0.43;
    if (xPos > 0) xPos *= 13;
    this.x += (xPos - this.x) * 0.1;
    this.y += (this.mouseY - 0.1 - this.y) * 0.1;
    this.moveJoint(this.neck, 1.2);
    this.moveJoint(this.waist, 0.5);
  }
  //
  // ─── CHAINS ─────────────────────────────────────────────────────────────────────
  //
  leftDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runLeft", cb: this.runLeft },
        { animation: "hipHop1", cb: this.endLeft },
      ],
    });
  }
  danceChain() {
    this.setNextAnimation({
      chain: [{ animation: "hipHop1" }],
    });
  }

  rightDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runRight", cb: this.runRight },
        { animation: "hipHop1", cb: this.endRight },
      ],
    });
  }
  rightIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "runRight", cb: this.runRight },
        { animation: "idle", cb: this.endRight },
      ],
    });
  }

  idleChain() {
    this.setNextAnimation({
      chain: [{ animation: "idle", cb: this.endRight }],
    });
  }
  angryChain() {
    this.setNextAnimation({
      chain: [{ animation: "angry" }],
    });
  }
  scaredDanceChain() {
    this.setNextAnimation({
      chain: [
        { animation: "scared", cb: this.runRight },
        { animation: "hipHop1", cb: this.endRight },
      ],
    });
  }
  scaredIdleChain() {
    this.setNextAnimation({
      chain: [
        { animation: "scared", cb: this.runRight },
        { animation: "idle", cb: this.endRight },
      ],
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
        { animation: "idle", cb: this.endRight },
      ],
    });
  }
  fallOverChain() {
    model.setNextAnimation({
      chain: [
        { animation: "stunned" },
        { animation: "gettingUp" },
        { animation: "angry" },
      ],
      userAction: true,
    });
  }

  //
  // ─── END ────────────────────────────────────────────────────────────────────────
  //
}

const model = new ModelClass();

export default model;
