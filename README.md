# Async Fishcotheque

Welcome to the Async Fishcotheque, a collaborative canvas of weird and wonderful animated sea creatures created as part of the 2016 Brighton Digital Festival.

 - About the project: [https://asyncjs.com/fishcotheque/](https://asyncjs.com/fishcotheque/)

 - Visit the fishcotheque: [https://fishcotheque.asyncjs.com/](https://fishcotheque.asyncjs.com/)


## Creating a creature

There are two types of creature that can be created in the fishcotheque:

 - **Environment** (e.g. background objects)
 - **Creatures**

The method for creating both of these is identical, and is documented below. The only difference between the two is where to put the files.


### Getting started

1. [download the Fishcotheque](https://github.com/asyncjs/Fishcotheque/zipball/master) (or `git clone` this repository) and open up `index.html` in your browser. Hopefully you'll see the Fishcotheque.

2. Create a new directory for your new creation: 
  - If it is going to be a creature, create it into the `/creatures` directory.
  - If it is going to be a new background object, create it in the `/environment` directory.

3. Create a new JavaScript file within this new directory. Give it the same name as the directory.

4. Add the path to this new JavaScript file to the `/javascript/creatures.js` file.

5. Within the new JavaScript file, create a function that calls the `fishcotheque.createCreature()` method. Further details for how to do this are below.


### Submitting your creature

Once you have finished creating your creature, you need to share it with us so we can add it to the site. If you know how to make a Github _pull request_ then please do. Otherwise give either @asyncjs, Ali (@larister), or Pete (@thegingerbloke) a shout and we'll help you to add it to the site.

## Example creatures

There are two example creatures already in the repo for you to play with.

Also, creatures from the [JavaScript Jungle](https://github.com/asyncjs/Javascript-Jungle) can be used as a reference, as they generally use the same logic. Note that they reference a variable `jj` that is changed to `fishcotheque` here.

### Simple example

The example below creates a simple canvas circle and moves it around. You can use SVG or just CSS with background images if you prefer.

```javascript
fishcotheque.createCreature('my-creature', function (creature) {
  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width   = canvas.width  = 100,
      height  = canvas.height = 100,
      world   = fishcotheque.size(),
      top = 50,
      left = fishcotheque.center().left - (width / 2);

  creature.size({width: width, height: height});
  creature.position({top: top, left: left});
  creature.el.append(canvas);

  context.fillStyle = "#8ED6FF";
  context.beginPath();
  context.arc(50, 50, width / 2, 0, Math.PI * 2, true); 
  context.closePath();
  context.fill();

  fishcotheque.bind('tick', function () {
    if (top > world.height) {
      top = -height;
    } else {
      top  += 5;
    }
    if (left > world.width) {
      left = -width;
    } else {
      left += 10;
    }
    creature.position({top: top, left: left});
  });
});
```


## API

There are a number of methods available for you to use with your creature.

### fishcotheque

This the global object; this is where the
environment is controlled. You can use it to get the size of the
screen, listen to global events or even fire your own. You can access this
anywhere in your world.

#### fishcotheque.createCreature(name, func)

This is the main method you'll use to create new creatures. A creature
is just a layer (`<div>`) in the fishcotheque.

 - `name` - A name for your creature, it needs to be unique to the fishcotheque.
 - `func` - A function that will be passed your creature object to work on.

```javascript
fishcotheque.createCreature('billy', function (creature) {
   // Give your creature a size.
   creature.size({width: 50, height: 50});

   // Centre your creature in the world.
   var worldCenter = fishcotheque.center();
   creature.position({
     top:  worldCenter.top  - 25,
     left: worldCenter.left - 25
   });
});
```

#### fishcotheque.size()

This grabs the size of the world and returns you an object with a width and
height property `{width: 1024, height: 780}`.

```javascript
var worldSize = fishcotheque.size();
```

#### fishcotheque.center()

This returns the co-ordinates of the center of the world as a top and left
property `{left: 512, top: 365}`.

```javascript
var center = fishcotheque.center();
```

#### fishcotheque.bind(topic, callback)

This lets you listen in to global events that can be fired using `fishcotheque.trigger()`.
It works in the same way as jQuery.bind('click').

 - `topic`    - The name of the topic that you want to subscribe to.
 - `callback` - A callback that will be called when the topic is published.
               Different topics will provide different arguments to the
               callback.

```javascript
fishcotheque.bind('tick', function (frame) {
  // This function will be called 30 times a second. You can use it
  // to animate your creatures.

  // Move a creature down the screen in 5px increments.
  creature.el.css('top', '+= 5px')
});
```

#### fishcotheque.trigger(topic, arg1, arg2)

This triggers a function on the global object so that any other creature can
listen in (they can do this with `fishcotheque.bind()`).

Note that, the 'Chat' creature will automatically publish any global events to the chat console. See `fishcotheque.chat()` and `Creature.chat()`.

```javascript
// Others can listen in.
fishcotheque.bind('fishy-messages', function (message) {
  console.log('Fishy says ' + message);
});

fishcotheque.trigger('fishy-messages', 'hello guys!');
```

#### fishcotheque.get(creatureName)

Get another creature object in the world to interact with it.

 - `creatureName` - The name of the creature that you want to get.

```javascript
// Others can listen in.
var whale = fishcotheque.get('whale');

// Do something magical with the whale creature.
```

#### fishcotheque.all()

Get _all_ the creatures in the world as an object of name/creature pairs.

```javascript
// Others can listen in.
var allCreatures = fishcotheque.all();

$.each(allCreatures, function (creature, name) {
  // Trigger a hello event on all creatures.
  creature.trigger('hello', 'This is my hello message');
});
```

#### fishcotheque.chat(message, [creature])

Publish a chat message, which will be displayed in the chat bar, by the 'Chat' creature.

The optional `creature` argument can be either a Creature instance object, or a string that represents the name to associate with the message.

```javascript
fishcotheque.chat("Hello Fishcotheque!", myCreature);
fishcotheque.chat("Hello Fishcotheque!", "JimBob");
```

## Creature

The entire Fishcotheque is composed of creature objects. These are just layers (`<div>`s)
that sit in the canvas. You can create a creature using the `fishcotheque.createCreature()`
method. Once you have a creature you can do pretty much anything you want
with it eg. draw canvas, svg or just plain old html and css.

There are numerous methods that you can call on the creature. Also feel
free to add new methods to your creature for others to call.

```javascript
fishcotheque.createCreature('cake', function (creature) {
  creature.size({width: 50, height: 50});

  creature.el.css('background-color', 'pink');

  // Add a new method to your creature
  creature.eatSlice = function () {
     // Tell others.
     creature.trigger('eaten');

     // Get smaller.
     creature.size({width: '-= 10px', height: '-10px'});
  };
});

fishcotheque.createCreature('dog', function (creature) {
  creature.size({width: 100, height: 50});

  var cake = fishcotheque.get('cake');

  // Call a method on the cake creature.
  cake.eatSlice();
});
```

#### .el

This is your creatures element wrapped in jQuery. You can call any jQuery
methods on it, insert elements into it etc.

```javascript
fishcotheque.createCreature('fish', function (creature) {
  creature.size({width: 100, height: 50});
  creature.el.append($('<div />'));
  creature.el.css('background-color', 'red');
});
```

### .name()

Get the name of a creature.

```javascript
fishcotheque.createCreature('fish', function (creature) {
  creature.size({width: 100, height: 50});

  creature.name(); // 'fish'
});
```

#### .bind()/.trigger()

These behave in the same way as the global `fishcotheque.bind()/fishcotheque.trigger()` but events
are only fired on the creature themselves. eg. `creature.bind()` will
be called when `creature.trigger()` is fired.

#### .size(dimensions)

Set/Get the size of your creature. You need to do this immediately for your
creature to appear at all.

 - `dimensions` - An object with "width" and "height" properties (as numbers).

```javascript
fishcotheque.createCreature('cake', function (creature) {
  creature.size({width: 50, height: 50});
  creature.size(); // => {width: 50, height: 50}
});
```

#### .position(position)

Get/Set the position of the creature in the Fishcotheque. You can use this in
conjunction with `fishcotheque.size()` and `fishcotheque.center()`.

 - `position` - An object with "top" and "left" and "zIndex" properties (as numbers).

```javascript
fishcotheque.createCreature('cake', function (creature) {
  creature.size({width: 50, height: 50});

  creature.position({top: 20, left: 20});
  creature.position(); // => {top: 20, left: 20, zindex: 0}
});
```

#### .data(data)

Data allows you to set metadata about your creature for other creatures to
read. You can always add properties to the creature itself if you prefer.

 - `data` - An object of metadata you can add to your creature.

```javascript
fishcotheque.createCreature('cake', function (creature) {
  creature.size({width: 50, height: 50});

  creature.data({age: 20});
  creature.data().age; // => 20
});
```

#### .chat(message)

Publish a chat message, which will be displayed in the chat bar, by the 'Chat' creature.

This is a shorthand for `fishcotheque.chat()` and automatically includes the creature's name in the chat console.

```javascript
fishcotheque.createCreature('fish', function (creature) {
    creature.chat("Bloop!");
});
```
