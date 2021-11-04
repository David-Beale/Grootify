export default class PositionManager {
  constructor() {
    this.posController = null;
    this.vel = 0;
    this.pos = "left";
    this.requestedDirection = false;
    this.runningDirection = 0;
    this.isFalling = false;
  }
  setPosController(posController) {
    this.posController = posController;
  }
  setPos(pos) {
    this.pos = pos;
  }
  incrVel(incr, limit = false) {
    this.vel += incr;
    if (limit) this.vel = Math.min(limit, this.vel);
  }
  startFalling() {
    this.isFalling = true;
  }
  fall() {
    if (!this.isFalling) return;
    this.incrVel(-0.01);
    this.updateY();
    if (this.posController.y <= -20) {
      this.stopFalling();
      return true;
    }
    return false;
  }
  stopFalling() {
    this.vel = 0;
    this.isFalling = false;
    this.posController.y = -20;
  }
  run() {
    if (!this.runningDirection) return;
    this.incrVel(0.008, 0.4);
    this.updateX();
    if (
      (this.runningDirection === 1 && this.posController.x >= 56) ||
      (this.runningDirection === -1 && this.posController.x <= 0)
    ) {
      this.stopRunning();
      return true;
    }
    return false;
  }
  stopRunning() {
    if (this.runningDirection === -1) this.setPos("left");
    else this.setPos("right");
    this.requestedDirection = false;
    this.runningDirection = 0;
    this.vel = 0;
  }
  setDirection(direction) {
    this.requestedDirection = direction;
    if (this.runningDirection !== this.requestedDirection) this.vel = 0;
    this.setPos("transit");
  }
  updateY() {
    this.posController.y += this.vel;
  }
  updateX() {
    this.posController.x += this.vel * this.runningDirection;
  }
  updateDirection() {
    if (this.requestedDirection === this.runningDirection) return false;
    this.runningDirection = this.requestedDirection;
    return true;
  }
}
