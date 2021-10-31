import { thriller } from "../animations";

export default class ThrillerManager {
  constructor(model) {
    this.model = model;
    this.list = thriller;
    this.downloading = null;
    this.index = 0;
    this.downloadIndex = 1;
    this.paused = false;
  }

  resetThriller() {
    this.index = 0;
    this.downloadNextMove();
  }
  downloadNextMove() {
    this.downloadIndex++;
    const nextMove = this.list[this.downloadIndex];
    if (!nextMove) return;
    this.downloading = nextMove;
    this.model.worker.postMessage({ name: nextMove, type: "thriller" });
  }
  getNextMove() {
    const next = this.list[this.index];
    this.index++;
    if (next === "thrillerIdle") {
      if (this.downloadIndex > 2) {
        //skip idle as next move is ready
        return this.getNextMove();
      } else {
        //idle will be skipped as soon as the move is ready
        this.paused = true;
      }
    }
    return next;
  }
  get() {
    this.model.danceManager.isDancing = true;
    const nextMove = this.getNextMove();
    if (!nextMove) {
      //end reached
      this.model.setChain("danceChain");
      return;
    }
    const actions = this.model.animationManager.actions;
    if (actions[nextMove]) return nextMove;
    this.paused = true;
    return null;
  }
  onWorkerMessage(animation) {
    this.model.animationManager.loadAnimation({
      animation,
      once: true,
      blockUser: true,
      name: this.downloading,
    });
    if (this.paused) {
      this.model.animationManager.runNextAnimation();
      this.paused = false;
    }
    this.downloadNextMove();
  }
}
