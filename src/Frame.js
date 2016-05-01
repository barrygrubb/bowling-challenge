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
  console.log("watching for bonus")
};

Frame.prototype.addBonusThrows = function (game) {
  console.log("made it to addBonusThrows function")
  // var game = game;
  if (!this.frameComplete) {
    // console.log("layer 1")
    if (this.totalScoreType === "strike") {
      // console.log("layer 2 strike")
      if (game.numberOfThrows === (this.waitingInitiatedAtThrow + 2)) {
        // this.bonus = (game.getNextFrame().throw1Score + game.getNextFrame().throw2Score);
        console.log("strike bonus")
        this.bonus = 2;
        this.frameComplete = true;
      }
    } else if (this.totalScoreType === "spare") {
      console.log("layer 2 spare")
        if (game.numberOfThrows === (this.waitingInitiatedAtThrow + 1)) {
          // this.bonus = game.getNextFrame().throw1Score;
          console.log("spare bonus")
          this.bonus = 1;
          this.frameComplete = true;
        }
      }
  }
};
