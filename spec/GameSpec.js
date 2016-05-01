describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("should begin counting frames from 1", function() {
    expect(game.currentFrame).toBe(1);
  });

  it("should initialize with 10 frames", function() {
    expect(game.frameArray.length).toBe(10);
  });

  it("should initialize with 0 throws played", function() {
    expect(game.numberOfThrows).toBe(0);
  });

  it("should correctly record the score for throw 1", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    game.throw();
    expect(game.frameArray[0].throw1Score).toBe(5);
  });

  it("should correctly record the score for throw 2", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    game.throw();
    game.throw();
    expect(game.frameArray[0].throw2Score).toBe(5);
  });

  it("should correctly sum the total score at the end of the frame", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    game.throw();
    game.throw();
    expect(game.frameArray[0].totalScore).toBe(10);
  });

  it("should correctly register a strike", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(10);
    game.throw();
    expect(game.frameArray[0].totalScoreType).toBe("strike");
  });

  it("should correctly register a spare", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    game.throw();
    game.throw();
    expect(game.frameArray[0].totalScoreType).toBe("spare");
  });

  it("should increment the number of throws after each throw", function() {
    game.throw();
    expect(game.numberOfThrows).toBe(1);
    game.throw();
    expect(game.numberOfThrows).toBe(2);
  });

  it("should increment the frame number after each frame has been played", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    expect(game.currentFrame).toBe(1);
    game.throw();
    game.throw();
    expect(game.numberOfThrows).toBe(2);
  });

  it("should calculate the correct bonus for a spare", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    game.throw();
    game.throw();
    expect(game.frameArray[0].totalScoreType).toBe("spare");
    expect(game.frameArray[0].bonus).toBe(null);
    game.throw();
    expect(game.frameArray[0].bonus).toBe(5);
  });

  it("should calculate the correct bonus for a strike", function() {
    spyOn(game, "_knockDownSkittles").and.returnValues(10, 5, 5);
    game.throw();
    expect(game.frameArray[0].totalScoreType).toBe("strike");
    expect(game.frameArray[0].bonus).toBe(null);
    game.throw();
    expect(game.frameArray[0].bonus).toBe(null);
    game.throw();
    expect(game.frameArray[0].bonus).toBe(10);
  });

  it("should begin watching for bonus points after a spare", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(5);
    expect(game.frameArray[0].waitingInitiatedAtThrow).toBe(null);
    game.throw();
    expect(game.frameArray[0].waitingInitiatedAtThrow).toBe(null);
    game.throw();
    expect(game.frameArray[0].waitingInitiatedAtThrow).not.toBe(null);
  });

  it("should begin watching for bonus points after a strike", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(10);
    expect(game.frameArray[0].waitingInitiatedAtThrow).toBe(null);
    game.throw();
    expect(game.frameArray[0].waitingInitiatedAtThrow).not.toBe(null);
  });

  xit("should calculate the correct bonus for consecutive strikes", function() {
    spyOn(game, "_knockDownSkittles").and.returnValue(10);
    game.throw();
    expect(game.frameArray[0].totalScoreType).toBe("strike");
    expect(game.frameArray[0].bonus).toBe(null);
    game.throw();
    expect(game.frameArray[0].bonus).toBe(null);
    game.throw();
    expect(game.frameArray[0].bonus).toBe(20);
  });

});
