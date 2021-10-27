export default class JointManager {
  constructor(model) {
    this.model = model;
    this.x = 0;
    this.y = 0;
    this.neck = null;
    this.waist = null;
    this.fadeJointsRequired = false;
  }
  setJoint(c) {
    if (c.isBone && c.name === "mixamorigNeck") {
      this.neck = c;
    } else if (c.isBone && c.name === "mixamorigSpine") {
      this.waist = c;
    }
  }
  getJointAngle = () => {
    this.x = this.neck.rotation.y / 1.2;
    this.y = this.neck.rotation.x / 1.2;
  };
  moveJoint(joint, angle) {
    joint.rotation.y = this.x * angle;
    joint.rotation.x = this.y * angle;
  }
  moveJoints() {
    const { mouseX, mouseY } = this.model.mouseManager;
    const { pos } = this.model.positionManager;
    const currentAction = this.model.animationManager.currentAction;
    if (!currentAction || currentAction.name !== "idle") return;
    let yPos = mouseY - 0.1;
    // adjust xpos to account for model position
    let xPos = mouseX;
    if (pos === "right") {
      xPos -= 0.43;
      if (xPos > 0) xPos *= 13;
    } else {
      xPos *= 2;
    }

    this.x += (xPos - this.x) * 0.07;
    this.y += (yPos - this.y) * 0.07;
    this.moveJoint(this.neck, 1.2);
    this.moveJoint(this.waist, 0.5);
  }
  fadeJoints() {
    if (!this.fadeJointsRequired) return;
    const targetX = this.neck.rotation.y / 1.2;
    const targetY = this.neck.rotation.x / 1.2;

    this.x += (targetX - this.x) * 0.07;
    this.y += (targetY - this.y) * 0.07;
    this.moveJoint(this.neck, 1.2);
    this.moveJoint(this.waist, 0.5);
  }
  checkIfFadeRequired(prevAction, currentAction) {
    //if prev action was idle, we need to fade out the manually controlled joints
    //ignore "stunned" as it will result in a clanky animation
    if (prevAction.name === "idle" && currentAction.name !== "stunned") {
      this.fadeJointsRequired = true;
      setTimeout(() => {
        this.fadeJointsRequired = false;
      }, 500);
    }
  }
}
