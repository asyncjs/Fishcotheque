/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('squido', function (creature) {

  'use strict';

  // It can be useful to create a shortcut to jQuery
  var jQuery = fishcotheque.jQuery;

  // Your creature's root DOM element
  var element = creature.el;

  // Some internal variables for the example creature
  var speed = 2;
  var scale = Math.random() + 0.25;

  // Set the size of your creature
  creature.size({
    width: 225,
    height: 300
  });

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  // Click detection
  element.on('click', function (e) {
    creature.chat('Leave me alone!');
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/squido/squido.css');

  // Generate a random number between two values
  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function() {

    // Calculate position
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top - speed,
          'left': oldpos.left,
        };

    // Collision detection with the edge of the screen
    if (newpos.top < 0 - element.height()) {

      // Set a new random vertical position
      newpos.left = rnd(0, canvasSize.width);
      newpos.top = canvasSize.height + element.height();

      // Set a new random size
      scale = Math.random() + 0.25;

      // Update creature dimensions
      element.css({
        'transform': 'scale(' + scale + ',' + scale + ')'
      });

      creature.chat('Here I come again...');
    }

    // Move creature
    creature.position(newpos);
  });
});
