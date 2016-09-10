fishcotheque.createCreature('pufferfish', function (creature) {
  'use strict';

  var CHANGE_FRAME_EVERY = 300; // ms
  var MAIN_FRAME_SEQUENCE = [3, 2, 4, 2];
  var DANGER_PROXIMITY = 100;
  var isPuffed = false;
  var isHovered = false;

  // Your creature's root DOM element
  var element = creature.el;
  var el = element[0];

  // Some internal variables for the example creature
  var speed = 1;
  var scale = Math.random() * 0.75 + 0.25;
  //var scale = 1;

  // Set the size of your creature
  creature.size({
    width: 200,
    height: 100
  });

  var all = fishcotheque.all();
  // var creatures = Object.keys(allCreatures)
  // .map(function (name) {
  //   return allCreatures[name];
  // })
  // .filter(function (creature) {
  //   return !creature.environment && creature.name() !== 'pufferfish';
  // });

  var creaturesNames = ['ms-crab', 'sanic', 'dead', 'iains-fish', 'best-mermaid', 'rick'];
  var creatures = [];

  creaturesNames.forEach(function (name) {
    var creature = all[name];

    if (creature) {
      creatures.push(creature);
    }
  });

  all = null;

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
  .on('click', function (e) {
    creature.chat("Don't eat me");
  })
  .on('mouseover', function (e) {
    isHovered = true;
    creature.chat("I'm scared");

    setTimeout(function () {
      isHovered = false;
      isPuffed = false;
    }, 1000);
  });

  // Set a random size for the creature
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/pufferfish/pufferfish.css');

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

  function puffUp () {
    if (!isPuffed) {
      setFrame(1);
      isPuffed = true;
    }
  }

  function isCloseToOtherCreatures (newpos) {
    return creatures.some(function (otherCreature) {
      var position = otherCreature.position();

      if (Math.abs(position.top - newpos.top) <= DANGER_PROXIMITY &&
        Math.abs(position.left - newpos.left) <= DANGER_PROXIMITY) {
        //console.log(otherCreature.name(), otherCreature, {newpos, position});
        return true;
      }
    });
  }

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function(deltaT, now) {
    // Calculate position
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top,
          'left': oldpos.left + ((speed * deltaT) / 15),
        };

    if (isHovered || isCloseToOtherCreatures(newpos)) {
      puffUp();
    }

    else if (frameLastChanged === undefined || frameLastChanged + deltaT >= CHANGE_FRAME_EVERY) {
      updateFrame(MAIN_FRAME_SEQUENCE);
      frameLastChanged = 0;
    }

    else {
      frameLastChanged += deltaT;
    }

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
    }

    // Move creature
    creature.position(newpos);
  });
});

