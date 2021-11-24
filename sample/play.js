const Game = require("./contents/game");

const newGame = new Game("test game");

newGame.startGame();

// // imports inquirer for CLI

// const inquirer = require("inquirer");

// // creates the game object/template
// const Game = function (gameName) {
//   this.gameName = gameName;
//   this.hoursPast = 0;
//   this.timesPlayed = 0;
// };

// Game.prototype.startGame = function () {
//   // method called to start the game. 'This' here refers to the newly instantiated game object itself. So this method passes the game object to the start game function
//   //   console.log(this);
//   goToNextRoom(this);
// };

// Game.prototype.incrementTimesPlayed = function () {
//   //self explanatory
//   this.timesPlayed += 1;
// };

// Game.prototype.increaseHours = function (numberOfHours) {
//   //self explanatory

//   this.hoursPast += numberOfHours;
// };

// // THE MAIN BIT - FUNCTION CALLED AT START OF GAME AND REALLY THE GUTS OF THE GAME. sets passed variable 'roomName' to "startGame"
// const goToNextRoom = async (game, roomName = "startGame") => {
//   const roomsPreChoice = getRooms(game);
//   //passes the game object to the 'get rooms function'. This returns an object which looks as follows:
//   /*
// {
//     startGame: {
//       message: `Welcome to the ${game.gameName}! What do you want to do?`,
//       choices: [
//         {
//           text: "Watch TV?",
//           targetRoomName: "watchTV",
//         },
//         {
//           text: "Play game?",
//           targetRoomName: "playGame",
//           invoke: function () {
//             game.incrementTimesPlayed();
//           },
//         },
//         {
//           text: "Not play?",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//     watchTV: {
//       message: "Looks like there is nothing on. Play game instead?",
//       invoke: () => game.increaseHours(1),
//       choices: [
//         {
//           text: "Yes",
//           invoke: function () {
//             game.incrementTimesPlayed();
//           },
//           targetRoomName: "playGame",
//         },
//         {
//           text: "No",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//     playGame: {
//       message: `Well done, you have played the game ${game.timesPlayed} times! Restart?`,
//       invoke: function () {
//         game.increaseHours(1);
//       },
//       choices: [
//         {
//           text: "Yes",
//           targetRoomName: "startGame",
//         },
//         {
//           text: "No",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//   };
// */

//   let thisRoom = roomsPreChoice[roomName];
//   //sets thisRoom to the roomName passed to the function, which at the STart is "startGame"
//   //Some rooms have an 'invoke' mothod other do not.
//   if (thisRoom.invoke) thisRoom.invoke();

//   const roomsPostInvoke = getRooms(game);
//   //sets roomspost involve to new object invluding any updates just done (as getRooms called with the updatd game object)
//   thisRoom = roomsPostInvoke[roomName];
//   //sets thisRoom to the updated version of the specific room

//   if (thisRoom.log)
//     console.log(`${roomName.toUpperCase()} LOG: ${thisRoom.log}`);
//   //If there'sa lof then print it

//   const inquiry = [
//     {
//       type: "list",
//       message: thisRoom.message,
//       choices: thisRoom.choices.map((choice) => choice.text),
//       name: "response",
//     },
//   ];
//   // run the message from the room and wait for the response
//   const { response } = await inquirer.prompt(inquiry);

//   const roomsPostChoice = getRooms(game);
//   thisRoom = roomsPostChoice[roomName];
//   const choice = thisRoom.choices.find((choice) => choice.text === response);

//   if (choice.invoke) choice.invoke();

//   if (choice.log)
//     console.log(
//       `log on target ${`${(
//         choice.targetRoom || "finish game"
//       ).toUpperCase()} LOG`}: ${choice.log}`
//     );

//   if (choice.targetRoomName) goToNextRoom(game, choice.targetRoomName);
//   else console.log("Thanks for playing!");
// };

// function getRooms(game) {
//   return {
//     startGame: {
//       message: `Welcome to the ${game.gameName}! What do you want to do?`,
//       choices: [
//         {
//           text: "Watch TV?",
//           targetRoomName: "watchTV",
//         },
//         {
//           text: "Play game?",
//           targetRoomName: "playGame",
//           invoke: function () {
//             game.incrementTimesPlayed();
//           },
//         },
//         {
//           text: "Not play?",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//     watchTV: {
//       message: "Looks like there is nothing on. Play game instead?",
//       invoke: () => game.increaseHours(1),
//       choices: [
//         {
//           text: "Yes",
//           invoke: function () {
//             game.incrementTimesPlayed();
//           },
//           targetRoomName: "playGame",
//         },
//         {
//           text: "No",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//     playGame: {
//       message: `Well done, you have played the game ${game.timesPlayed} times! Restart?`,
//       invoke: function () {
//         game.increaseHours(1);
//       },
//       choices: [
//         {
//           text: "Yes",
//           targetRoomName: "startGame",
//         },
//         {
//           text: "No",
//           log: `player was playing for ${game.hoursPast} hours`,
//           targetRoomName: null,
//         },
//       ],
//     },
//   };
// }

// const newGame = new Game("test game");

// newGame.startGame();
