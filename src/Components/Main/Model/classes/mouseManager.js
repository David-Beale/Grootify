export default class WaveManager {
  constructor(model) {
    this.model = model;
    this.mouseX = 0;
    this.mouseY = 0;
    this.waveStatus = { count: 0, side: null, time: null };
  }
  setMouse([mouseX, mouseY]) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
  getSide() {
    if (this.mouseX < -0.17) return -1;
    if (this.mouseX < 0.17) return 0;
    return 1;
  }
  wave() {
    if (!this.model.animationManager.waveAllowed()) return;
    const newSide = this.getSide();
    if (!newSide) return;
    const { count, side, time } = this.waveStatus;
    const newTime = Date.now();
    if (!count) {
      this.waveStatus.count++;
      this.waveStatus.side = newSide;
      this.waveStatus.time = newTime;
      return;
    } else {
      if (side === newSide) return;
      if (newTime - time > 1000) return (this.waveStatus.count = 0);

      this.waveStatus.count++;
      this.waveStatus.side = newSide;
      this.waveStatus.time = newTime;
    }
    if (this.waveStatus.count === 3) {
      this.waveStatus.count = 0;
      return true;
    }
  }
}
