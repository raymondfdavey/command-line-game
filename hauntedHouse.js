const runGame = require("./inquirer");
const inquirer = require("inquirer");

const GameObject = function (gameName) {
  this.gameName = gameName;
  this.playerName = "Player 1";
  this.playerViolence = 0;
  this.playerLives = 3;
  this.playerInventory = [];
  this.currentRoom = "startOfGame";
};

GameObject.prototype.setPlayerName = function (name) {
  this.playerName = name;
};

GameObject.prototype.changePlayerViolence = function (int) {
  this.playerFear = this.playerFear + int;
};

GameObject.prototype.checkIfTooScared = function (int) {
  if (this.playerFear > int) return true;
  return false;
};

GameObject.prototype.loseLife = function () {
  this.playerLives -= 1;
};

GameObject.prototype.changeCurrentSection = function (newSection) {
  this.currentRoom = newSection;
};

GameObject.prototype.extraLife = function () {
  this.playerLives += 1;
};

GameObject.prototype.addToInventory = function (item) {
  this.playerInventory.push(item);
};

GameObject.prototype.removeFromInventory = function (item) {
  itemIndex = this.playerInventory.indexOf(item);
  this.playerInventory.splice(itemIndex, 1);
};

GameObject.prototype.resetGame = function () {
  this.playerName = "Player 1";
  this.playerViolence = 0;
  this.playerLives = 3;
  this.hoursPast = 0;
  this.playerInventory = [];
};

GameObject.prototype.runGame = async function () {
  let instructions = this.getGameInstructions();
  let currentSectionInstructions = instructions[this.currentRoom];

  if (this.currentRoom == "startOfGame") {
    const questions = [
      {
        type: "input",
        name: "response",
        message: currentSectionInstructions.message,
      },
    ];

    const { response } = await inquirer.prompt(questions);

    this.setPlayerName(response.toUpperCase());

    this.changeCurrentSection("downstairsLobby");

    instructions = this.getGameInstructions();

    currentSectionInstructions = instructions[this.currentRoom];
  }

  const inquiry = [
    {
      type: "list",
      message: currentSectionInstructions.message,
      choices: currentSectionInstructions.choices.map((choice) => choice.text),
      name: "response",
    },
  ];
  const { response } = await inquirer.prompt(inquiry);

  const choice = currentSectionInstructions.choices.find(
    (choice) => choice.text === response
  );
  if (choice.invoke) choice.invoke();

  if (!choice.targetRoomName) {
    console.log(choice.log);
  } else if (this.playerLives <= 0) {
    console.log(choice.log);
  } else {
    this.runGame();
  }
};

GameObject.prototype.getGameInstructions = function () {
  return {
    startOfGame: {
      message: "WELCOME! What is your name, player?",
    },
    downstairsLobby: {
      message: `Welcome ${this.playerName} to the ${this.gameName}! You are in the lobby of a cumbling old Hotel and you have ${this.playerLives} lives. What do you want to do?`,
      choices: [
        {
          text: "Go up the stairs?",
          targetRoomName: "stairs",
          invoke: () => {
            this.changeCurrentSection("stairs");
          },
        },
        {
          text: "Go to reception?",
          targetRoomName: "reception",
          invoke: () => {
            this.changeCurrentSection("reception");
          },
        },
        {
          text: "Turn tail and run?",
          targetRoomName: "outside",
          invoke: () => {
            this.changeCurrentSection("outside");
          },
        },
      ],
    },

    stairs: {
      message: "The light fades as you climb the old marble staircase",
      choices: [
        {
          text: "Continue",
          targetRoomName: "landing",
          invoke: () => {
            this.changeCurrentSection("landing");
          },
        },
        {
          text: "turn back",
          targetRoomName: "downstairsLobby",
          invoke: () => {
            this.changeCurrentSection("downstairsLobby");
          },
        },
      ],
    },

    landing: {
      message: `As you step onto the landing at the top of the stairs, the floorboards crumble and you fall to your death`,
      choices: [
        {
          text: "START AGAIN",
          targetRoomName: "startOfGame",
          log: "YOU RAN OUT OF LIVES. SORRY. GOODBYE",
          invoke: () => {
            this.loseLife(), this.changeCurrentSection("downstairsLobby");
          },
        },
        {
          text: "QUIT",
          log: `Good effort. No, really. Clap. CLap.`,
          targetRoomName: null,
        },
      ],
    },

    reception: {
      message: `You jump the counter and slowly enter the office, as you get closer you can see that there is an elderly women unconscious on the floor, she is slumped against a safe`,
      choices: [
        {
          text: "Check if she is breathing",
          targetRoomName: "help",
          invoke: () => {
            this.changeCurrentSection("help");
          },
        },
        {
          text: "Try and get in the safe",
          targetRoomName: "safe",
          invoke: () => {
            this.changeCurrentSection("safe");
          },
        },
        {
          text: "turn back",
          targetRoomName: "downstairsLobby",
          invoke: () => {
            this.changeCurrentSection("downstairsLobby");
          },
        },
      ],
    },
    help: {
      message: `you crouch to listen for any breathing and the lady whispers "in my right hand is a gun, in my left is the combination to the safe. Take what you need and get out`,
      choices: [
        {
          text: "Pistol whip the lady with the gun and open the safe",
          targetRoomName: null,
          log: "you get the keys to hotel, but in your dreams your actions will haunt you",
        },
        {
          text: "Open the safe",
          targetRoomName: null,
          log: "you get the keys to hotel, CONGRATULATIONS",
        },
        {
          text: "turn back",
          targetRoomName: "downstairsLobby",
          invoke: () => {
            this.changeCurrentSection("downstairsLobby");
          },
        },
      ],
    },
    safe: {
      message: `You push the elderly lady off the safe and she slumps to the floor. As you greedily work at the combination, you feel the cold steel of a gun against your temple. "No vacancies, sorry" then blackness.`,
      choices: [
        {
          text: "START AGAIN",
          targetRoomName: "startOfGame",
          log: "YOU RAN OUT OF LIVES. SORRY. GOODBYE",
          invoke: () => {
            this.loseLife(), this.changeCurrentSection("downstairsLobby");
          },
        },
        {
          text: "QUIT",
          log: `Good effort. No, really. Clap. CLap.`,
          targetRoomName: null,
        },
      ],
    },
    office: {
      message: `There is paper scattered everywhere. An old service bell sits on the desk invitingly, but you can see what looks like a persons leg in the office behind. What would you like to do?`,
      choices: [
        {
          text: "Bing the bell",
          targetRoomName: "deathByFalling",
        },
        {
          text: "No",
          log: `player was playing for ${this.hoursPast} hours`,
          targetRoomName: null,
        },
      ],
    },
    outside: {
      message: `You stand on the doorstep of the hotel breathing the cool, fresh autumn air. You have escaped with ${this.playerLives} lives left. But have you left other lives inside...`,
      choices: [
        {
          text: "GET THE FUCK OUT OF HERE!",
          log: `Enjoy your life...`,
          targetRoomName: null,
        },
        {
          text: "Turn back and go in",
          targetRoomName: "startOfGame",
          invoke: () => {
            this.changeCurrentSection("downstairsLobby");
          },
        },
      ],
    },
    deathByFalling: {
      message: `You bing the bell. As its shockingly loud ring echoes, you start to hear a cracking sound. The ceiling above you collapses and you are crushed to death.`,
      choices: [
        {
          text: "START AGAIN",
          targetRoomName: "startOfGame",
          log: "YOU RAN OUT OF LIVES. SORRY. GOODBYE",
          invoke: () => {
            this.loseLife(), this.changeCurrentSection("downstairsLobby");
          },
        },
        {
          text: "QUIT",
          log: `Good effort. No, really. Clap. CLap.`,
          targetRoomName: null,
        },
      ],
    },
  };
};

module.exports = GameObject;
