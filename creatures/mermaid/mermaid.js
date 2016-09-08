/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('best-mermaid', function (creature) {

  'use strict';

  // Your creature's root DOM element
  var element = creature.el;

  creature.chat('I\'m a beautiful mermaid!');

  // Some internal variables for the example creature
  var speedVector = { x: 1, y: 1 };
  var scale = 1;
  var velocity = 2.5;

  // Set the size of your creature
  creature.size({
    width: 160,
    height: 160
  });

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/mermaid/mermaid.css');

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function() {
    var down = (rnd(0, velocity) * speedVector.y)
    var right = (rnd(0, velocity) * speedVector.x)

    // Calculate position
    var oldpos = creature.position();
    var newpos = {
      'top': oldpos.top + down,
      'left': oldpos.left + right
    };

    // Collision detection with the edge of the screen
    if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {

      // Reverse direction
      newpos.left = oldpos.left - right;

      // Flip the direction of travel
      speedVector.x = -speedVector.x;
    }

    // Collision detection with the edge of the screen
    if ((newpos.top > canvasSize.height) || newpos.top < -element.height()) {

      // Reverse direction
      newpos.top = oldpos.top - down;

      // Flip the direction of travel
      speedVector.y = -speedVector.y;
    }

    // Flip the direction of the image
    var xScale = (speedVector.x > 0) ? scale : -scale;

    // Update creature dimensions
    element.css({
      'transform': 'scale(' + xScale + ',' + scale + ')'
    });

    // Move creature
    creature.position(newpos);
  });
});

// Generate a random number between two values
function rnd(lower, upper) {
  var maxima = Math.max(upper, lower),
      minima = Math.min(upper, lower),
      value = Math.random() * (maxima - minima);
  return value + minima;
}
