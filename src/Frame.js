function Frame() {
  this.pinsRemaining = 10;
  this.throw1Score = null;
  this.throw2Score = null;
  this.totalScore = null;
  this.totalScoreType = 'normal';
  this.bonus = null;
  this.frameComplete = false;
  this.waitingInitiatedAtThrow = null;
};

Frame.prototype.watchForBonusThrows = function (game) {
  this.waitingInitiatedAtThrow = game.numberOfThrows;
};

Frame.prototype.addBonusThrows = function (game) {
  if (!this.frameComplete) {
    if (this.totalScoreType === "strike") {
      if (game.numberOfThrows === (this.waitingInitiatedAtThrow + 2)) {
        this.bonus = (game.getCurrentFrame().throw1Score + game.getCurrentFrame().throw2Score);
        this.frameComplete = true;
      }
    } else if (this.totalScoreType === "spare") {
        if (game.numberOfThrows === (this.waitingInitiatedAtThrow + 1)) {
          this.bonus = game.getCurrentFrame().throw1Score;
          this.frameComplete = true;
        }
      }
  }
};
