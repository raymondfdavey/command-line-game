const inquirer = require('inquirer');
const getRooms = require('./rooms');

const goToNextRoom = async (game, roomName = 'startGame') => {
  const roomsPreChoice = getRooms(game);

  let thisRoom = roomsPreChoice[roomName];
  if (thisRoom.invoke) thisRoom.invoke();

  const roomsPostInvoke = getRooms(game);
  thisRoom = roomsPostInvoke[roomName];

  if (thisRoom.log)
    console.log(`${roomName.toUpperCase()} LOG: ${thisRoom.log}`);

  const inquiry = [
    {
      type: 'list',
      message: thisRoom.message,
      choices: thisRoom.choices.map(choice => choice.text),
      name: 'response',
    },
  ];

  const { response } = await inquirer.prompt(inquiry);

  const roomsPostChoice = getRooms(game);
  thisRoom = roomsPostChoice[roomName];
  const choice = thisRoom.choices.find(choice => choice.text === response);

  if (choice.invoke) choice.invoke();

  if (choice.log)
    console.log(
      `log on target ${`${(
        choice.targetRoom || 'finish game'
      ).toUpperCase()} LOG`}: ${choice.log}`,
    );

  if (choice.targetRoomName) goToNextRoom(game, choice.targetRoomName);
  else console.log('Thanks for playing!');
};

module.exports = goToNextRoom;
