# How to use inquirer.js

The 'playing' part of the game we have abstracted out for you. It uses a package called [inquirer](https://www.npmjs.com/package/inquirer/v/5.0.1) which is a tool for allowing users to interact with the command line. You don't need to worry about this aspect, but checkout their Github repo examples folder if you are interested in seeing some ways it can work. We've taken this out because it is by it's nature _asynchronous_ logic - often, the code needs to wait for a player to give input into the game before it can continue. That's stuff you will learn about next week!

To enable inquirer to do its job, the data in the game has to be held in a particular way. You can see this in the basic example we've included, under the `getRooms` function. You can think of a 'room' as a physical place where the character is at this point, but really the room's message can represent any output from the game, from _'You are standing in the kitchen. It is dark, and there is an unnerving noise coming from upstairs'_ to _'What do you want to do with the bag of oranges?'_. The `getRooms` function returns an object collection of all the possible interactions in your game in the following format, which you must stick to!

- each room will need a unique key name - you'll refer to this, so make it logical! You need to have one called `startGame` - that's what triggers on `npm start`. For others, think along the lines of 'kitchen' or 'chooseInteractionWithOranges'
- it will need a `message` property, which is what will be displayed to the user on going to that room
- it will need a `choices` property, which should be an array of _choices_ (described below)
- it can also have an `invoke` property, which is a function you want to call on the player going to this room
- it can also have a `log` property, which will console log anything you want on choosing that option - use this for debugging purposes!

- each _choice_ also needs to be an object
- each should have a `text` property, which is what will be displayed on the screen for the user to select, e.g. _'Go upstairs'_ or _'Eat an orange'_
- each should have a `targetRoomName` property, which is the key of the next room you want to show. If you don't have a `targetRoom`, the game will end
- each can also have an `invoke` property, which is a function you want to call on choosing that option - make sure you don't duplicate behaviour you applied in your target's `invokeRoom` function
- each can also have a `log` property, which again, will console log anything you like debugging purposes when that option is chosen

Remember that you have access to properties or methods in your Game object via the `game` parameter you have passed in! For example, you can see three places where `game` is accessed in this option.

```js
function getRooms (game) {
  return {
    // more options...
    watchTV: {
      message: "Looks like there is nothing on. Play game instead?",
      invoke: function () {
        game.increaseHours(1) // here, a method from the game is called
      }
      choices: [
        {
          text: "Yes",
          invoke: function () {
            game.incrementTimesPlayed() // again, here
          },
          targetRoomName: "playGame"
        },
        {
          text: "No",
          log: `player was playing for ${game.hoursPast} hours`, // here we read one of the game's properties.
          targetRoomName: null
        }
      ]
    },
    // even more options
  }
}
```

### Debugging

NONE of your 'rooms' can refer to something that doesn't exist yet in your game. So if you refer in ANY room to `player.character.name`, then FROM THE START your game must at least have a `player.character` object, so it's not trying to get property 'name' of undefined.

Any gaps like this will give you an 'unhandled Promise rejection' error (you'll come across plenty of these when we cover async & Promises!) and end the game - read the message and that will point you to what doesn't exist.
