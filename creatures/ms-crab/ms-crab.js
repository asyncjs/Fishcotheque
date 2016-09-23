/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('ms-crab', function (creature) {

  'use strict';

  // It can be useful to create a shortcut to jQuery
  var jQuery = fishcotheque.jQuery;

  // Your creature's root DOM element
  var element = creature.el;

  // Some internal variables for the example creature
  var speed = 0.8;
  var scale = Math.random() + 0.25;

  // Set the size of your creature
  creature.size({
    width: 197,
    height: 132
  });
  
  var seaBedHeight = 100;

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(canvasSize.height - seaBedHeight, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  // Click detection
  element.on('click', function (e) {
    creature.chat('Crab Crab Crab!');
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/ms-crab/ms-crab.css');

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
	  //debugger;
      newpos.top = rnd(canvasSize.height - (seaBedHeight + creature.size().height), canvasSize.height);

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

      creature.chat('I\'m a crab!');
    }

    // Move creature
    creature.position(newpos);
  });
});
