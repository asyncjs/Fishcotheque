fishcotheque.createCreature('wormfish', function (creature) {
  'use strict';

  // Your creature's root DOM element
  var element = creature.el;
  var el = element[0];

  // Some internal variables for the example creature
  var speed = 1;
  var scale = Math.random() + 0.25;

  // Set the size of your creature
  creature.size({
    width: 400,
    height: 200
  });

  // Generate a random number between two values
  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  // Click detection
  // element.on('click', function (e) {
  //   creature.chat();
  // });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/wormfish/wormfish.css');

  var count = 0;

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function() {
    count ++;

    if (count === 10) {
      el.classList.add('pos1');
      el.classList.remove('pos3');
    }

    else if (count === 20) {
      el.classList.add('pos2');
      el.classList.remove('pos1');
    }

    else if (count === 30) {
      el.classList.add('pos3');
      el.classList.remove('pos2');
      count = 0;
    }

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
      scale = Math.random() * 0.25 + 0.1;

      // Flip the direction of the image
      var xScale = (speed > 0) ? scale : -scale;

      // Update creature dimensions
      element.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });

      //creature.chat('Here I come...');
    }

    // Move creature
    creature.position(newpos);
  });
});
