fishcotheque.createCreature('jellyfish', function (creature) {
  'use strict';

  var CHANGE_FRAME_EVERY = 400; // ms
  var MAIN_FRAME_SEQUENCE = [1, 2];
  var isActive = false;
  var isHovered = false;

  // Your creature's root DOM element
  var element = creature.el;
  var el = element[0];

  // Some internal variables for the example creature
  var speed = 0.8;
  var scale = Math.random() * 0.75 + 0.25;

  // Set the size of your creature
  creature.size({
    width: 300,
    height: 300
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
    left: rnd(0, size.width),
  });

  // Click detection
  element
  .on('mouseover', function (event) {
    isHovered = true;
    creature.chat("Zzzzzap");

    setTimeout(function () {
      isHovered = false;
    }, 1000);
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/jellyfish/jellyfish.css');

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

  function activate () {
    if (!isActive) {
      setFrame(3);
      frameLastChanged = 0;
      isActive = true;
    }
  }

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function(deltaT, now) {
    // Calculate position
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top - ((speed * deltaT) / 15),
          'left': oldpos.left + ((speed * deltaT) / 15),
        };

    if (isHovered && !isActive) {
      activate();
    }

    else {
      isActive = false;

      if (frameLastChanged === undefined || frameLastChanged + deltaT >= CHANGE_FRAME_EVERY) {
        updateFrame(MAIN_FRAME_SEQUENCE);
        frameLastChanged = 0;
      }

      else {
        frameLastChanged += deltaT;
      }
    }

    // Collision detection with the edge of the screen
    if (
      (newpos.left > size.width) || newpos.left < -element.width() ||
      (newpos.top > size.height) || newpos.top < -element.height()
    ) {

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
        'transform': 'scale(' + xScale + ',' + scale + ') rotate(30deg)'
      });
    }

    // Move creature
    creature.position(newpos);
  });
});

