function getSections(gameObject) {
  return {
    startGame: {
      message: `HI THERE! Welcome to ${gameObject.gameName}! The greatest text-based exploratory and philsophical wunderexperience (TM) in the known universe. What would you like to do?`,
      choices: [
        {
          text: "HAVE YOUR MIND BLOWN",
          targetSectionName: "blowMind",
        },
        {
          text: "BE DEPRESSED",
          targetSectionName: "beDepressed",
          invoke: function () {
            gameObject.incrementDepression();
          },
        },
        {
          text: "LEAVE IN A STROP",
          log: `player was playing for ${gameObject.hoursPast} hours`,
          targetSectionName: null,
        },
      ],
    },
    blowMind: {
      message:
        "you are part of the most intelligent species on the planet. More intelligent than dolphins, chimps and crows combined. Use it wisely. What now, kimosabi?",
      invoke: () => gameObject.increaseHours(1),
      choices: [
        {
          text: "LEAVE IN A STROP",
          log: `you were playing for ${gameObject.hoursPast} hours, and you were unhappy`,
          targetSectionName: null,
        },
        {
          text: "LEAVE HAPPY",
          log: `you were playing for ${gameObject.hoursPast} hours, but at least you were happy`,
          targetSectionName: null,
        },
        {
          text: "BE DEPRESSED",
          targetSectionName: "beDepressed",
          invoke: function () {
            gameObject.incrementDepression();
          },
        },
      ],
    },
    beDepressed: {
      message: `The nature of realist will always be obscure from you. What would you like to do now?`,
      invoke: function () {
        game.increaseHours(1);
      },
      choices: [
        {
          text: "RESTART",
          targetSectionName: "startGame",
        },
        {
          text: "LEAVE IN A STROP",
          log: `player was playing for ${game.hoursPast} hours`,
          targetSectionName: null,
        },
        {
          text: "LEAVE HAPPY",
          log: `you were playing for ${gameObject.hoursPast} hours, but at least you were happy`,
          targetSectionName: null,
        },
        {
          text: "HAVE YOUR MIND BLOWN",
          targetSectionName: "blowMind",
        },
      ],
    },
  };
}

module.exports = getRooms;
