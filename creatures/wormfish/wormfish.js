fishcotheque.createCreature('wormfish', function (creature) {
  'use strict';

  var CHANGE_FRAME_EVERY = 400; // ms
  var MAIN_FRAME_SEQUENCE = [2, 1, 3, 1];

  // Your creature's root DOM element
  var element = creature.el;
  var el = element[0];

  // Some internal variables for the example creature
  var speed = 0.5;
  var scale = Math.random() * 0.75 + 0.25;
  //var scale = 1;

  // Set the size of your creature
  creature.size({
    width: 200,
    height: 100
  });

  // Generate a random number between two values
  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  // Position creature somewhere on the canvas
  var size = fishcotheque.size();
  creature.position({
    top: rnd(0, size.height * 0.8 + 0.2),
    left: rnd(0, size.width)
  });

  // Click detection
  element.on('click', function (e) {
    creature.chat('I am a wormfish');
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/wormfish/wormfish.css');

  var currentFrame, currentFrameIndex, frameLastChanged;

  function setFrame (pos) {
    if (currentFrame !== undefined) {
      el.classList.remove('pos' + currentFrame);
    }

    el.classList.add('pos' + pos);
    currentFrame = pos;
  }

  function updateFrame (sequence) {
    if (currentFrameIndex === undefined || currentFrameIndex + 1 >= sequence.length) {
      currentFrameIndex = 0;
    }

    else {
      currentFrameIndex ++;
    }

    var pos = sequence[currentFrameIndex];
    setFrame(pos);
  }

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function(deltaT, now) {
    if (frameLastChanged === undefined || frameLastChanged + deltaT >= CHANGE_FRAME_EVERY) {
      updateFrame(MAIN_FRAME_SEQUENCE);
      frameLastChanged = 0;
    }

    else {
      frameLastChanged += deltaT;
    }

    // Calculate position
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top,
          'left': oldpos.left + ((speed * deltaT) / 15),
        };

    // Collision detection with the edge of the screen
    if ((newpos.left > size.width) || newpos.left < -element.width()) {

      // Reverse direction
      newpos.left = oldpos.left;

      // Set a new random vertical position
      newpos.top = rnd(0, size.height);

      // Flip the direction of travel
      speed = -speed;

      // Set a new random size
      scale = Math.random() * 0.75 + 0.25;
      //scale = 1;

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
