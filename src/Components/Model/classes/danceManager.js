import {
  allDanceLow,
  allDanceMed,
  allDanceHigh,
  danceLowStack,
  danceMedStack,
  danceHighStack,
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
  }

  addToStack() {
    const { name, mood } = this.downloading;
    const stack = this.stacks[mood];
    stack.count++;
    stack.list.push(name);
  }
  popStack(stack) {
    stack.count--;
    if (stack.count < 0) stack.count = 0;
    const nextDance = stack.list.pop();
    stack.list.unshift(nextDance);
    return nextDance;
  }
  getRandomMove(currentAction) {
    const allMoves = this.lists[this.mood].list;
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
    const stack = this.stacks[this.mood];
    if (stack.count) return this.popStack(stack);
    const randomMove = this.getRandomMove(currentAction);
    if (actions[randomMove]) return randomMove;

    if (!this.downloading.active) {
      actions[randomMove] = true;
      this.downloading = { name: randomMove, mood: this.mood, active: true };
      this.model.worker.postMessage({ name: randomMove, type: "dance" });
    }
    return this.popStack(stack);
  }
  setMood(mood) {
    this.mood = mood;
  }
  onWorkerMessage(animation) {
    this.model.animationManager.loadAnimation({
      animation,
      once: true,
      name: this.downloading.name,
    });
    this.addToStack();
    this.downloading = { name: null, mood: null, active: false };
  }
}
