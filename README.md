# CORE-choose-your-own-adventure

### Aims of this sprint

- Handle more complex systems with OOP
- Refine our testing practises
- Get creative!

### Background

You may or may not have partaken in the 'Choose Your Own' genre of storybooks or computer games - either way, the concept is simple. You play a character in a certain situation, and then can choose what to do or where to go next. A classic is [The Oregon Trail](https://classicreload.com/oregon-trail.html) which was created for educational purposes, but spectacularly backfired into something entertaining, challenging and thought-provoking.

If you were to think about these games from a programming perspective, you could reduce them down to some key concepts:

- _State_ that represents what is happening or the situation of the game. Examples could be where your character is, what their inventory is, how long it has been since they last slept, what the weather is, and so on.
- _Actions_ that the player can choose to do. Examples could be to travel somewhere else, interact with something where they are, go to sleep, ponder the weather, and so on.

Object Oriented Programming is a natural fit for this sort of structure. The _state_ of the game can be represented by the data or properties of an encompassing 'Game' object; the _actions_ can be methods on the object that affect the state. The Game can hold other contents - say a Player, which has an Inventory, which holds an array of Items... and so on.

### Task

First, give the sample project a go. Run `npm install` and `npm run sample`. Get a feeling of how the choices you make are affecting the Game object properties.

Then you can delete the sample project. You'll be working in the root directory, so don't get confused.

We'll kick off by creating the objects and methods we'll need to make a **Haunted House** choose your own adventure game.

- Each object should be tested so that when you instantiate it with the 'new' keyword it is what you expect.
- Each method should be tested so you can see how the object's properties have changed when it has been called.

Try these out first before you do anything in the rooms.js file.

1. Let's test what happens when we create a new Game. Open up your `spec/game.spec.js` file. Complete the test so that you know the Game is created with the correct name property.

2. Add a default `playerName` to the Game object, and amend your test to expect this too.

3. We'll want players to be able to select a name. Create a method called `changePlayerName` that takes a new name, and sets `game.playerName` to the new name. Test this too.

4. This game should track a player's fear, so test that a new Game has a `playerFear` of 0.

5. Write and test a `changePlayerFear` method that increases / decreases the `playerFear` property by a given amount.

6. Write and test a `checkIfTooScared` method that accepts a number and returns true if the `playerFear` is higher than that number (and false if not).

7. Give players a default `playerInventory` of an empty array. Write and test methods that allow the player to add or remove an item from the inventory.

8. Write and test a `resetGame` method which resets `playerName`, `playerFear` and `playerInventory` to their default values.

Continue to add properties, write methods and test them until you feel entirely confident with the process.

### How to develop your game

- If you're feeling confident, you could start implementing the adventure part of your game now. Take another look at the sample to see how it is constructed, and read the `inquirer.api.md` file to see how to develop your own `rooms.js` file. Add your game name in the `play.js` file - otherwise, leave it alone! You can start your own game with `npm start`. There is no need to alter the `inquirer.js` file.

- If you want some more practise, then add some other methods to your game. They could change time, weather or other environmental variables in your game. If so, consider pulling out your player variables into a Player object, and giving Game a `.player` property of `new Player()`. Now your playerFear would be accessed at `game.player.fear`, and your player's `changeFear` method is called with `game.player.changeFear()` You'd need to update your tests accordingly.

- Alternatively if you're not inspired by the haunted house, try starting from scratch. You could try a battle game, perhaps along the lines of Pokemon. In this case, you would think of the 'rooms' as describing a series of choices and events (i.e. which Pokemon to deploy, which move to use etc, what happened when you used the move, etc.)

- Try making a two player game which keeps track of which player is acting as the player makes choices.

### Day 2

Refactor your game to use classes instead of explicitly attaching to the prototype chain. Because the data (the 'rooms') and inquirer's behaviour is abstracted out, you shouldn't need to change anything in your game design, and the tests should be called in the same way.

You should also get confident with having multiple constructors and your systems interacting with each other. Here's a few challenges you might wish to try out - remember to test everything!

- use an **Inventory** object to hold any items your player finds in the game. Shift any methods that currently interacting with your inventory to the Inventory prototype. So, for example, you chould call `game.inventory.check(item)` to return whether an item exists in the game's inventory.

- create a **Character** constructor, and shift any properties and methods related to the player into a new Character prototype. For example, you would call `game.player.checkFear()` to get the player's fear level

- now shift your **Inventory** to be a property of the **Character**, so the way to check the player's inventory would be `game.player.inventory.check(item)`.

- if you're using strings to represent items at the moment, why not instead create an **Item** class? Give your item instances `name` and `weight` properties. Give your **Character** constructor a `checkIfEncumbered()` method that tallies up the weight of their inventory. You could prevent them from moving to another room if they are carrying too much.

- make use of the `extends` keyword to create subclasses of items. For example, you could create a **Weapon** class that inherits the properties and methods of an **Item**, but also has a `damage` property and `attack` method.

Now you have abstracted a lot of the behaviours from the game, it is much easier to populate your game world with additional characters, each with their own inventories full of items. Try creating interesting interactions between Characters, like trading or fighting.
