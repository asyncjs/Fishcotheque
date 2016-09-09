/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('shark-shadow', function (creature) {

  'use strict';

  // It can be useful to create a shortcut to jQuery
  var jQuery = fishcotheque.jQuery;

  // Your creature's root DOM element
  var element = creature.el;

  var seabedOffset = jQuery('.creature--sea-bed').height();

  // Some internal variables for the example creature
  var speed = 0.5;
  var scale = Math.random() + 0.25;

  // Set the size of your creature
  creature.size({
    width: 194,
    height: 128
  });

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height - seabedOffset - element.height()),
    left: rnd(0, canvasSize.width)
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/shark-shadow/shark-shadow.css');

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
          'top': oldpos.top,
          'left': oldpos.left + speed,
        };

    // Collision detection with the edge of the screen
    if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {

      // Reverse direction
      newpos.left = oldpos.left;

      // Set a new random vertical position
      newpos.top = rnd(0, canvasSize.height - seabedOffset - element.height());

      // Flip the direction of travel
      speed = -speed;

      // Set a new random size
      scale = Math.random() + 0.25;

      // Flip the direction of the image
      var xScale = (speed > 0) ? scale : -scale;

      // Update creature dimensions
      element.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });

      creature.chat('I\'M HUNGRY...');
    }

    // Move creature
    creature.position(newpos);
  });
});
