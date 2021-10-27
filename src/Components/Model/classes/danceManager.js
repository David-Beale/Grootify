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
      1: { name: "low", stack: danceLowStack },
      2: { name: "med", stack: danceMedStack },
      3: { name: "high", stack: danceHighStack },
    };
    this.lists = {
      1: { name: "low", list: allDanceLow },
      2: { name: "med", list: allDanceMed },
      3: { name: "high", list: allDanceHigh },
    };
    this.mood = 1;
    this.isDancing = false;
    this.downloading = false;
  }
  addToStack(move) {
    const stack = this.stacks[this.mood].stack;
    stack.push(move);
  }
  popStack() {
    const stack = this.stacks[this.mood].stack;
    const nextDance = stack.pop();
    stack.unshift(nextDance);
    return nextDance;
  }
  checkStack(randomMove) {
    const stack = this.stacks[this.mood].stack;
    if (randomMove === stack[stack.length - 1]) {
      this.popStack();
    }
  }
  getRandomMove(currentAction) {
    const allMoves = this.lists[this.mood].list;
    let randomMove;
    do {
      const randomMoveIndex = Math.floor(Math.random() * allMoves.length);
      randomMove = allMoves[randomMoveIndex];
    } while (randomMove === currentAction.name);
    return randomMove;
  }
  get(currentAction, loadCb) {
    const actions = this.model.animationManager.actions;
    this.isDancing = true;
    //prevent cache from getting too big
    // if (dancingCache.length > 10) {
    //   const oldest = dancingCache.shift();
    //   delete actions[oldest];
    // }
    const randomMove = this.getRandomMove(currentAction);
    if (!actions[randomMove]) {
      if (!this.downloading) {
        actions[randomMove] = true;
        this.downloading = true;
        import(`../files/Dancing/${randomMove}.fbx`)
          .then((file) => {
            loadCb(randomMove, { file: file.default, once: true });
            this.addToStack(randomMove);
            this.downloading = false;
          })
          .catch((err) => console.log(err));
      }
      return this.popStack();
    } else {
      this.checkStack(randomMove);
      return randomMove;
    }
  }
  setMood(mood) {
    this.mood = mood;
  }
}
