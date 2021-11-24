function getSections(gameInstance) {
  return {
    startOfGame: {
      message: `Welcome to the ${gameInstance.gameName}! What do you want to do?`,
      choices: [
        {
          text: "Watch TV?",
          targetRoomName: "watchTV",
        },
        {
          text: "Play game?",
          targetRoomName: "playGame",
          invoke: function () {
            gameInstance.incrementTimesPlayed();
          },
        },
        {
          text: "Not play?",
          log: `player was playing for ${gameInstance.hoursPast} hours`,
          targetRoomName: null,
        },
      ],
    },
  };
}
