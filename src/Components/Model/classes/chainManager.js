import { useStore } from "../../Store/store";

export default class ChainManager {
  constructor(model) {
    this.model = model;
    this.positionManager = model.positionManager;
    this.runningManager = model.runningManager;
    this.jointManager = model.jointManager;
    this.chain = [];
  }

  getBlockingActions() {
    const actions = this.model.animationManager.actions;
    const blockingActions = [];
    for (let i = 0; i < this.chain.length; i++) {
      const action = this.chain[i];
      if (!actions[action.animation] || !actions[action.animation].blockAll) {
        break;
      }
      blockingActions.push(action);
    }
    return blockingActions;
  }
  shift() {
    return this.chain.shift();
  }
  push(chainName) {
    const { chain } = this[chainName]();
    this.chain.push(...chain);
  }
  setChain(chainName) {
    if (!this[chainName]) {
      console.log(chainName, " does not exist");
      return false;
    }
    const { chain, isUserAction } = this[chainName]();

    const currentAction = this.model.animationManager.currentAction;
    if ((currentAction.blockUser || currentAction.blockAll) && isUserAction) {
      return false;
    }
    if (currentAction.blockAll) {
      if (!chain) return false;
      const blockingActions = this.getBlockingActions();
      this.chain = [...blockingActions, ...chain];
      return false;
    }
    if (chain) this.chain = chain;
    return true;
  }

  //
  // ─── CALLBACKS ──────────────────────────────────────────────────────────────────
  //

  startFalling = () => {
    this.positionManager.startFalling();
    this.model.started = true;
  };
  updateFade = () => {
    this.model.animationManager.fadeSpeed = 0.5;
  };
  isPlayingCheck = () => {
    if (this.model.isPlaying) {
      useStore.setState({ interfaceOpen: true });
      this.model.setChain("danceChain");
      return true;
    } else {
      this.runRight();
    }
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
    }, 2000);
  };
  resetThriller = () => {
    this.model.thrillerManager.resetThriller();
  };

  //
  // ─── CHAINS ─────────────────────────────────────────────────────────────────────
  //

  leftDanceChain() {
    return {
      chain: [
        { animation: "running", cb: this.runLeft },
        { animation: "dance" },
      ],
    };
  }
  danceChain() {
    return {
      chain: [{ animation: "dance" }],
    };
  }

  rightDanceChain() {
    return {
      chain: [
        { animation: "running", cb: this.runRight },
        { animation: "dance" },
      ],
    };
  }
  rightIdleChain() {
    return {
      chain: [
        { animation: "running", cb: this.runRight },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    };
  }

  idleChain() {
    return {
      chain: [{ animation: "idle", cb: this.jointManager.getJointAngle }],
    };
  }
  angryChain() {
    return {
      chain: [
        { animation: "angry" },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    };
  }
  scaredDanceChain() {
    return {
      chain: [
        { animation: "running", cb: this.runScared },
        { animation: "dance" },
      ],
    };
  }
  scaredIdleChain() {
    return {
      chain: [
        { animation: "running", cb: this.runScared },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    };
  }
  fallingChain() {
    return {
      chain: [
        { animation: "falling", cb: this.startFalling },
        { animation: "land", cb: this.land },
        { animation: "waving", cb: this.updateFade },
        { animation: "running", cb: this.isPlayingCheck },
        { animation: "typing", cb: this.typing },
        { animation: "idle", cb: this.jointManager.getJointAngle },
      ],
    };
  }
  waveChain() {
    const chain = [{ animation: "waving" }];
    const currentAction = this.model.animationManager.currentAction;
    if (currentAction.name === "idle") {
      chain.push({ animation: "idle", cb: this.jointManager.getJointAngle });
    } else if (this.chain[0].animation === "dance") {
      chain.push({ animation: "dance" });
    }
    return {
      chain,
      isUserAction: true,
    };
  }
  fallOverChain() {
    const chain = [{ animation: "stunned" }, { animation: "gettingUp" }];
    const currentAction = this.model.animationManager.currentAction;
    if (currentAction.name === "idle") {
      chain.push({ animation: "idle", cb: this.jointManager.getJointAngle });
    } else if (this.chain[0].animation === "dance") {
      chain.push({ animation: "dance" });
    }
    return {
      chain,
      isUserAction: true,
    };
  }
  thrillerChain() {
    return {
      chain: [{ animation: "thriller", cb: this.resetThriller }],
    };
  }
  thrillerNextChain() {
    return { chain: [{ animation: "thriller" }] };
  }
  leftThrillerChain() {
    return {
      chain: [
        { animation: "running", cb: this.runLeft },
        { animation: "thriller", cb: this.resetThriller },
      ],
    };
  }
}
