describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("should begin counting frames from 1", function() {
    expect(game.currentFrame).toBe(1);
  });

  it("should initialize with 10 frames", function() {
    expect(game.frameArray[10]).not.toBe(null);
    expect(game.frameArray.length).toBe(10);
  });



});
