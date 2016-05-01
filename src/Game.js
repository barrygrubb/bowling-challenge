function Game() {
  this.currentFrame = 1;
  this.frameArray = [];
  this.numberOfThrows = 0;

  this._rackup();
};

Game.prototype.throw = function() {
  if (!this._isFinalFrame()) {
    if (this.getCurrentFrame().throw1Score === null) {
      this.getCurrentFrame().throw1Score = this._knockDownSkittles();
      this.getCurrentFrame().pinsRemaining -= this.getCurrentFrame().throw1Score;
      this._updateBonuses();

      if (this._noPinsRemaining()) {
        this.getCurrentFrame().totalScoreType = 'strike';
        this.getCurrentFrame().watchForBonusThrows(this);
        this._calculateTotalScore();
        this._updateBonuses();
        this._advanceFrame();
      }
    }
    else {
      this.getCurrentFrame().throw2Score = this._knockDownSkittles();
      this.getCurrentFrame().pinsRemaining -= this.getCurrentFrame().throw2Score;
      this._updateBonuses();

      if (this._noPinsRemaining()) {
        this.getCurrentFrame().totalScoreType = 'spare';
        this.getCurrentFrame().watchForBonusThrows(this);
      }
      this._calculateTotalScore();
      this._updateBonuses();
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

Game.prototype.getCurrentFrame = function () {
  return this.frameArray[this.currentFrame-1]
};

Game.prototype._isFinalFrame = function () {
  return this.currentFrame === 10;
};

Game.prototype._advanceFrame = function () {
  this.currentFrame++;
};

Game.prototype._calculateTotalScore = function () {
  this.getCurrentFrame().totalScore = (this.getCurrentFrame().throw1Score + this.getCurrentFrame().throw2Score);
};

Game.prototype._noPinsRemaining = function () {
  return this.getCurrentFrame().pinsRemaining === 0;
};

Game.prototype._incrementThrows = function () {
  this.numberOfThrows++;
};

Game.prototype._updateBonuses = function () {
  for (index in this.frameArray) {
    this.frameArray[index].addBonusThrows(this);
  }
};
