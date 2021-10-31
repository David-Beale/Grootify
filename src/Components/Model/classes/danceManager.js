import {
  allDanceLow,
  allDanceMed,
  allDanceHigh,
  danceLowStack,
  danceMedStack,
  danceHighStack,
  loops,
} from "../animations";

export default class DanceManger {
  constructor(model) {
    this.model = model;
    this.stacks = {
      1: { name: "low", list: danceLowStack, count: 0 },
      2: { name: "med", list: danceMedStack, count: 0 },
      3: { name: "high", list: danceHighStack, count: 0 },
    };
    this.lists = {
      1: { name: "low", list: allDanceLow },
      2: { name: "med", list: allDanceMed },
      3: { name: "high", list: allDanceHigh },
    };
    this.mood = 1;
    this.isDancing = false;
    this.downloading = { name: null, mood: null, active: false };
    // this.index = -1;
  }

  addToStack() {
    const { name, mood } = this.downloading;
    const stack = this.stacks[mood];
    stack.count++;
    stack.list.push(name);
  }
  popStack(stack, currentAction) {
    let nextDance;
    stack.count--;
    if (stack.count < 0) stack.count = 0;
    do {
      nextDance = stack.list.pop();
      stack.list.unshift(nextDance);
    } while (nextDance === currentAction.name);
    return nextDance;
  }
  getRandomMove(currentAction) {
    const allMoves = this.lists[this.mood].list;
    // return allMoves[this.index] || allMoves[0];
    let randomMove;
    do {
      const randomMoveIndex = Math.floor(Math.random() * allMoves.length);
      randomMove = allMoves[randomMoveIndex];
    } while (
      randomMove === currentAction.name ||
      randomMove === this.downloading.name
    );
    return randomMove;
  }
  get(currentAction) {
    const actions = this.model.animationManager.actions;
    this.isDancing = true;
    //prevent cache from getting too big
    // if (dancingCache.length > 10) {
    //   const oldest = dancingCache.shift();
    //   delete actions[oldest];
    // }
    const mood = this.mood || 2;
    const stack = this.stacks[mood];
    if (stack.count) return this.popStack(stack, currentAction);
    const randomMove = this.getRandomMove(currentAction);
    if (actions[randomMove]) return randomMove;

    if (!this.downloading.active) {
      actions[randomMove] = true;
      this.downloading = { name: randomMove, mood, active: true };
      this.model.worker.postMessage({ name: randomMove, type: "dance" });
    }
    return this.popStack(stack, currentAction);
  }
  setMood(mood) {
    this.mood = mood;
  }
  onWorkerMessage(animation) {
    const loop = loops[this.downloading.name];
    this.model.animationManager.loadAnimation({
      animation,
      once: !loop,
      loop: loop,
      name: this.downloading.name,
    });
    this.addToStack();
    this.downloading = { name: null, mood: null, active: false };
  }
}
