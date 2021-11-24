const goToNextRoom = require("../inquirer");

const Game = function(gameName) {
  this.gameName = gameName;
  this.hoursPast = 0;
  this.timesPlayed = 0;
};

Game.prototype.startGame = function() {
  goToNextRoom(this);
};

Game.prototype.incrementTimesPlayed = function() {
  this.timesPlayed += 1;
};

Game.prototype.increaseHours = function(numberOfHours) {
  this.hoursPast += numberOfHours;
};

module.exports = Game;
