import { runLeft, runRight, runScared } from "../animations";

export default class RunningManger {
  constructor(model) {
    this.model = model;
    this.lists = {
      [-1]: runLeft,
      1: runRight,
      scared: runScared,
    };
    this.scared = false;
  }

  getRandomMove() {
    if (this.scared) {
      this.scared = false;
      return this.lists.scared[0];
    }
    const runningDirection = this.model.positionManager.runningDirection;
    const allMoves = this.lists[runningDirection];
    const randomMoveIndex = Math.floor(Math.random() * allMoves.length);
    return allMoves[randomMoveIndex];
  }
  setScared() {
    this.scared = true;
  }
  get() {
    if (!this.model.positionManager.updateDirection()) {
      this.scared = false;
      return false;
    }
    return this.getRandomMove();
  }
}
