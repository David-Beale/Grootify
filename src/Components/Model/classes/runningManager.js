import { runLeft, runLeftStack, runRight, runScared } from "../animations";

export default class RunningManger {
  constructor(model) {
    this.model = model;
    this.stacks = { [-1]: { name: "left", list: runLeftStack, count: 0 } };
    this.lists = { [-1]: runLeft, 1: runRight, scared: runScared };
    this.scared = false;
    this.downloading = { name: null, direction: null, active: false };
  }
  addToStack() {
    const { name, direction } = this.downloading;
    const stack = this.stacks[direction];
    stack.count++;
    stack.list.push(name);
  }
  popStack(stack) {
    stack.count--;
    if (stack.count < 0) stack.count = 0;
    const next = stack.list.pop();
    stack.list.unshift(next);
    return next;
  }

  getRandomMove() {
    if (this.scared) {
      this.scared = false;
      return this.lists.scared[0];
    }
    const direction = this.model.positionManager.runningDirection;
    const allMoves = this.lists[direction];
    let randomMove;
    do {
      const randomMoveIndex = Math.floor(Math.random() * allMoves.length);
      randomMove = allMoves[randomMoveIndex];
    } while (randomMove === this.downloading.name);
    return randomMove;
  }
  setScared() {
    this.scared = true;
  }
  get() {
    if (!this.model.positionManager.updateDirection()) {
      this.scared = false;
      return false;
    }
    const direction = this.model.positionManager.runningDirection;
    const actions = this.model.animationManager.actions;

    const stack = this.stacks[direction];
    if (stack && stack.count) return this.popStack(stack);
    const randomMove = this.getRandomMove();
    if (actions[randomMove]) return randomMove;

    if (!this.downloading.active) {
      actions[randomMove] = true;
      this.downloading = { name: randomMove, direction, active: true };
      this.model.worker.postMessage({ name: randomMove, type: "running" });
    }
    return this.popStack(stack);
  }
  onWorkerMessage(animation) {
    this.model.animationManager.loadAnimation({
      animation,
      name: this.downloading.name,
    });
    this.addToStack();
    this.downloading = { name: null, direction: null, active: false };
  }
}
