import { runLeft, runRight, runScared } from "../animations";

export default class RunningManger {
  constructor(positionManager) {
    this.positionManager = positionManager;
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

    const allMoves = this.lists[this.positionManager.runningDirection];
    const randomMoveIndex = Math.floor(Math.random() * allMoves.length);
    return allMoves[randomMoveIndex];
  }
  setScared() {
    this.scared = true;
  }
  get() {
    if (!this.positionManager.updateDirection()) {
      this.scared = false;
      return false;
    }
    return this.getRandomMove();
  }
}