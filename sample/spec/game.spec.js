const GameObject = require("../contents/game");
import "jest";

describe("GAME system", () => {
  test("creates an new Game object with a timesPlayed value set to 0", () => {
    const newGame = new GameObject();
    expect(newGame.timesPlayed).toBe(0);
  });
  test("has an incrementTimesPlayed function that increases the timesPlayed value by 1", () => {
    const newGame = new GameObject();
    newGame.incrementTimesPlayed();
    expect(newGame.timesPlayed).toBe(1);
  });
});
