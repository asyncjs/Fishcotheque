/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */
console.log('Loading!');

const init = (number) => {
  return function (creature) {
    console.log('created');
    'use strict';

    // It can be useful to create a shortcut to jQuery
    var jQuery = fishcotheque.jQuery;

    // Your creature's root DOM element
    var element = creature.el;
    element.attr('class', 'creature creature--clever-flockers');
    // Some internal variables for the example creature
    var speed = 1;
    var scale = Math.random() + 0.25;

    // Set the size of your creature
    creature.size({
      width: 85,
      height: 60
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
    fishcotheque.loadCSS('creatures/clever-flockers/style.css');

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
        newpos.top = rnd(0, canvasSize.height);

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

        creature.chat('Here I come...');
      }

      // Move creature
      creature.position(newpos);
    });
  }
};

const max = 10;
for (let i = 0; i < max; i++) {
    fishcotheque.createCreature('clever-flockers-' + i, init(i));
}
