import DanceManager from "./danceManager";
import RunningManager from "./runningManager";
import PositionManager from "./positionManager";
import MouseManager from "./mouseManager";
import JointManager from "./jointManager";
import ChainManager from "./chainManager";
import AnimationManager from "./animationManager";
import { AnimationClip } from "three";
const worker = new Worker("./loader/loader.js");

class ModelClass {
  constructor() {
    this.started = false;
    this.isPlaying = false;
    this.worker = worker;
    this.positionManager = new PositionManager();
    this.danceManager = new DanceManager(this);
    this.runningManager = new RunningManager(this);
    this.mouseManager = new MouseManager(this);
    this.jointManager = new JointManager(this);
    this.chainManager = new ChainManager(this);
    this.animationManager = new AnimationManager(this);
    this.workerInit();
  }
  setIsPlaying(state) {
    this.isPlaying = state;
  }
  workerInit() {
    this.worker.onmessage = (e) => {
      const { anim, type } = e.data;
      const animation = AnimationClip.parse(anim);
      if (type === "dance") {
        this.danceManager.onWorkerMessage(animation);
      } else if (type === "running") {
        this.runningManager.onWorkerMessage(animation);
      }
    };
  }

  moveJoints() {
    this.jointManager.moveJoints();
  }
  fadeJoints() {
    this.jointManager.fadeJoints();
  }
  wave() {
    const wave = this.mouseManager.wave();
    if (wave) this.setChain("waveChain");
  }
  fall() {
    const end = this.positionManager.fall();
    if (end) this.animationManager.runNextAnimation();
  }
  run() {
    const end = this.positionManager.run();
    if (end) this.animationManager.runNextAnimation();
  }

  setChain(chain) {
    const nextAction = this.chainManager.setChain(chain);
    if (nextAction) this.animationManager.runNextAnimation();
  }
}

const model = new ModelClass();

export default model;
