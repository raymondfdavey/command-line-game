// Here is where you add 'rooms' to your game. Make sure they abide by the syntax described in the README, else it *will not work*.
function getRooms(game) {
  return {
    startGame: {
      message: `Welcome to the ${game.gameName}! What do you want to do?`,
      choices: [
        {
          text: "Watch TV?",
          targetRoomName: "watchTV"
        },
        {
          text: "Play game?",
          targetRoomName: "playGame",
          invoke: function() {
            game.incrementTimesPlayed();
          }
        },
        {
          text: "Not play?",
          log: `player was playing for ${game.hoursPast} hours`,
          targetRoomName: null
        }
      ]
    },
    watchTV: {
      message: "Looks like there is nothing on. Play game instead?",
      invoke: () => game.increaseHours(1),
      choices: [
        {
          text: "Yes",
          invoke: function() {
            game.incrementTimesPlayed();
          },
          targetRoomName: "playGame"
        },
        {
          text: "No",
          log: `player was playing for ${game.hoursPast} hours`,
          targetRoomName: null
        }
      ]
    },
    playGame: {
      message: `Well done, you have played the game ${
        game.timesPlayed
      } times! Restart?`,
      invoke: function() {
        game.increaseHours(1);
      },
      choices: [
        {
          text: "Yes",
          targetRoomName: "startGame"
        },
        {
          text: "No",
          log: `player was playing for ${game.hoursPast} hours`,
          targetRoomName: null
        }
      ]
    }
  };
}

module.exports = getRooms;
