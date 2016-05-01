describe("Frame", function() {
  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  it("should have an initial total score of 0", function() {
    expect(frame.totalScore).toBe(null);
  });

  it("should have an initial throw 1 score of 0", function() {
    expect(frame.throw1Score).toBe(null);
  });

  it("should have an initial throw 2 score of 0", function() {
    expect(frame.throw2Score).toBe(null);
  });

  it("should initially be racked up with 10 pins", function() {
    expect(frame.pinsRemaining).toBe(10);
  });

  it("should initialize with a totalScoreType of 'normal'", function() {
    expect(frame.totalScoreType).toBe('normal');
  });

  it("should initialize with a bonus of null", function() {
    expect(frame.bonus).toBe(null);
  });

  it("should initialize as an incomplete frame", function() {
    expect(frame.frameComplete).toBe(false);
  });

  it("should not immediately be waiting for a bonus", function() {
    expect(frame.waitingInitiatedAtThrow).toBe(null);
  });

});
