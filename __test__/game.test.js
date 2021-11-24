const GameObject = require("../hauntedHouse");

describe("GAME object creation", () => {
  test("creates an new Game object with gameName set to passed name", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toBeInstanceOf(GameObject);
    expect(newGame.gameName).toBe("TEST GAME");
  });
  test("gameObject to have all properties playerName, playerFear, playerLives, hoursPast and playerInventory woth relevent values", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("playerName", "Player 1");
    expect(newGame).toHaveProperty("playerFear", 0);
    expect(newGame).toHaveProperty("playerLives", 3);
    expect(newGame).toHaveProperty("hoursPassed", 0);
    expect(newGame).toHaveProperty("playerInventory", []);
  });
});

describe("GAME object methods", () => {
  test("setPlayerNameFunction should update playerName", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame.playerName).toBe("Player 1");
    expect(newGame).toHaveProperty("setPlayerName");
    newGame.setPlayerName("RAYLORD");
    expect(newGame.playerName).toBe("RAYLORD");
  });
  test("changePlayerFear method should update playerFear property by passed amount both positie and negative", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame.playerFear).toBe(0);
    expect(newGame).toHaveProperty("changePlayerFear");
    newGame.changePlayerFear(2);
    expect(newGame.playerFear).toBe(2);
    newGame.changePlayerFear(-1);
    expect(newGame.playerFear).toBe(1);
    newGame.changePlayerFear(5);
    expect(newGame.playerFear).toBe(6);
    newGame.changePlayerFear(-10);
    expect(newGame.playerFear).toBe(-4);
  });
  test("checkIfTooScared method takes a number and if playerFear greater than that number, returns true, otherwise returns false", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("checkIfTooScared");
    newGame.changePlayerFear(2);
    expect(newGame.playerFear).toBe(2);
    expect(newGame.checkIfTooScared(5)).toBe(false);
    expect(newGame.checkIfTooScared(1)).toBe(true);
  });
  test("loseLife method should lower lives by one, extra life should raise by one", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("playerLives", 3);
    newGame.loseLife();
    expect(newGame.playerLives).toBe(2);
    newGame.extraLife();
    expect(newGame.playerLives).toBe(3);
  });
  test("loseLife method should lower lives by one, extra life should raise by one", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("playerLives", 3);
    newGame.loseLife();
    expect(newGame.playerLives).toBe(2);
    newGame.extraLife();
    expect(newGame.playerLives).toBe(3);
  });
  test("addToInventory should add passed item to inventory, removeFromInventory should remove passed item", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("playerInventory", []);
    newGame.addToInventory("Goblet");
    newGame.addToInventory("Wine");
    expect(newGame.playerInventory).toEqual(
      expect.arrayContaining(["Goblet", "Wine"])
    );
    newGame.removeFromInventory("Goblet");
    expect(newGame.playerInventory).toEqual(["Wine"]);
    newGame.removeFromInventory("Wine");
    expect(newGame.playerInventory).toEqual([]);
  });
  test("resetAll resets values back to original", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("playerName", "Player 1");
    expect(newGame).toHaveProperty("playerFear", 0);
    expect(newGame).toHaveProperty("playerLives", 3);
    expect(newGame).toHaveProperty("hoursPassed", 0);
    expect(newGame).toHaveProperty("playerInventory", []);

    newGame.setPlayerName("RAYLORD");
    expect(newGame.playerName).toBe("RAYLORD");

    newGame.changePlayerFear(2);
    expect(newGame.playerFear).toBe(2);

    newGame.loseLife();
    expect(newGame.playerLives).toBe(2);

    newGame.addToInventory("Goblet");
    newGame.addToInventory("Wine");
    expect(newGame.playerInventory).toEqual(
      expect.arrayContaining(["Goblet", "Wine"])
    );

    //RESETTING
    newGame.resetGame();
    expect(newGame).toHaveProperty("playerName", "Player 1");
    expect(newGame).toHaveProperty("playerFear", 0);
    expect(newGame).toHaveProperty("playerLives", 3);
    expect(newGame).toHaveProperty("hoursPassed", 0);
    expect(newGame).toHaveProperty("playerInventory", []);
  });
  test("resetAll resets values back to original", () => {
    const newGame = new GameObject("TEST GAME");
    expect(newGame).toHaveProperty("gameState");
    console.log(newGame.gameState);
  });
});
