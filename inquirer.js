// to DO - do it so that the invoke changes the current room on the object

const inquirer = require("inquirer");
// const getSections = require("./sections");

const runGame = async (gameInstance) => {
  const instructions = gameInstance.gameState;

  let currentSectionInstructions = instructions[gameInstance.currentRoom];

  if (currentSectionInstructions.invoke) currentSectionInstructions.invoke();

  if (currentSectionInstructions.log)
    console.log(`${roomName.toUpperCase()} LOG: ${thisRoom.log}`);

  const inquiry = [
    {
      type: "list",
      message: currentSectionInstructions.message,
      choices: currentSectionInstructions.choices.map((choice) => choice.text),
      name: "response",
    },
  ];
  const { response } = await inquirer.prompt(inquiry);

  currentSectionInstructions = instructions[gameInstance.currentRoom];

  const choice = currentSectionInstructions.choices.find(
    (choice) => choice.text === response
  );

  if (choice.invoke) choice.invoke();

  if (choice.log)
    console.log(
      `log on target ${`${(
        choice.targetRoom || "finish game"
      ).toUpperCase()} LOG`}: ${choice.log}`
    );

  if (choice.targetRoomName) runGame(gameInstance);
  else console.log("Thanks for playing!");
};

function getInstructions(gameInstance) {
  return {
    startOfGame: {
      message: `Welcome to the ${gameInstance.gameName}! You are in the lobby of a cumbling old Hotel and you have ${gameInstance.playerLives} lives. What do you want to do?`,
      choices: [
        {
          text: "Go up the stairs?",
          targetRoomName: "stairs",
          invoke: function () {
            gameInstance.changePlayerFear(5);
          },
        },
        {
          text: "Go to reception?",
          targetRoomName: "reception",
          invoke: function () {
            gameInstance.changePlayerFear(2);
          },
        },
        {
          text: "Turn tail and run?",
          //   log: `You are leaving with ${gameInstance.playerLives} lives. But how many lives did you leave behind`,
          targetRoomName: "outside",
        },
      ],
    },
    outside: {
      message: "Are you sure you want to leave?",
      choices: [
        {
          text: "Yes",
          log: `Enjoy your life`,
          targetRoomName: null,
        },
        {
          text: "No",
          targetRoomName: "startOfGame",
        },
      ],
    },
    stairs: {
      message: "The light fades as you climb the old marble staircase",
      invoke: () => gameInstance.increaseHours(1),
      choices: [
        {
          text: "Continue",
          invoke: function () {
            gameInstance.changePlayerFear(5);
          },
          targetRoomName: "playGame",
        },
        {
          text: "turn back",
          targetRoomName: "startOfGame",
        },
      ],
    },
    reception: {
      message: `There is paper scattered everywhere. An old service bell sits on the desk invitingly, but you can see what looks like a persons leg in the office behind. What would you like to do?`,
      choices: [
        {
          text: "Bing the bell",
          targetRoomName: "deathByFalling",
        },
        {
          text: "No",
          log: `player was playing for ${gameInstance.hoursPast} hours`,
          targetRoomName: null,
        },
      ],
    },
    deathByFalling: {
      message: `You bing the bell. As its shockingly loud ring echoes, you start to hear a cracking sound. The ceiling above you collapses and you are crushed.`,
      invoke: () => gameInstance.loseLife(),
      choices: [
        {
          text: "Start Again",
          targetRoomName: "startOfGame",
        },
        {
          text: "Quit",
          log: `Good effort. No, really. Clap. CLap.`,
          targetRoomName: null,
        },
      ],
    },
  };
}
module.exports = runGame;
