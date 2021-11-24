const goToNextRoom = require("../inquirer");

const Game = function (gameName, playerName = "Player 1") {
  this.gameName = gameName;
  this.playerName = playerName;
};

Game.prototype.startGame = function () {
  goToNextRoom(this);
};

module.exports = Game;
