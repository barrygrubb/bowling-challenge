function Game() {
  this.currentFrame = 1;
  this.frameArray = [];
  this.numberOfThrows = 0;

  this._rackup();
};

Game.prototype.throw = function() {
  if (!this._isFinalFrame()) {
    if (this._getCurrentFrame().throw1Score === null) {
      this._getCurrentFrame().throw1Score = this._knockDownSkittles();
      this._getCurrentFrame().pinsRemaining -= this._getCurrentFrame().throw1Score;
      if (this._noPinsRemaining()) {
        this._getCurrentFrame().totalScoreType = 'strike';
        this._calculateTotalScore();
        this._advanceFrame();
      }
    }
    else {
      this._getCurrentFrame().throw2Score = this._knockDownSkittles();
      this._getCurrentFrame().pinsRemaining -= this._getCurrentFrame().throw2Score;
      if (this._noPinsRemaining()) {
        this._getCurrentFrame().totalScoreType = 'spare';
      }
      this._calculateTotalScore();
      this._advanceFrame();
    }
  }
  this._incrementThrows();
};

Game.prototype._rackup = function () {
  for (i = 0; i < 10; i++) {
    this.frameArray[i] = new Frame();
  }
};

Game.prototype._knockDownSkittles = function() {
  return Math.round(Math.random()*this.frameArray[this.currentFrame-1].pinsRemaining);
};

Game.prototype._getCurrentFrame = function () {
  return this.frameArray[this.currentFrame-1]
};

Game.prototype._isFinalFrame = function () {
  this.currentFrame === 10;
};

Game.prototype._advanceFrame = function () {
  this.currentFrame++;
};

Game.prototype._calculateTotalScore = function () {
  this._getCurrentFrame().totalScore = (this._getCurrentFrame().throw1Score + this._getCurrentFrame().throw2Score);
};

Game.prototype._noPinsRemaining = function () {
  this._getCurrentFrame().pinsRemaining === 0;
};

Game.prototype._incrementThrows = function () {
  this.numberOfThrows++;
};
