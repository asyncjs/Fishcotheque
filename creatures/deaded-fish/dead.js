/* global fishcotheque*/
fishcotheque.createCreature('dead', function (creature) {
  'use strict';

  const $ = fishcotheque.jQuery;

  var seabedOffset = $('.creature--sea-bed').height();

  // Your creature's root DOM element
  var el = creature.el;
  var fish = el.append('<div class="deady" />');

  // Some internal variables for the example creature
  var speed = 15;
  var scale = Math.random() + 0.25;
  var xScale = scale;
  var scarpering = false;

  var width = 100;
  var height = 84;
  var dims = {
    width: width,
    height: height,
  };

  var barf = $('<div class="creature--dead-barf"></div>');

  // Set the size of your creature
  creature.size(dims);

  // Position creature somewhere on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  // Click detection
  el.on('click', function () {
    el.trigger('scarper!');
  });

  el.on('scarper!', function () {
    creature.chat('Gaaaahaaaaaaahahaha');
    el.trigger('barf');
    scarpering = true;
    setTimeout(function () {
      scarpering = false;
    }, 500);
  });

  creature.bind('touch', function (c) {
    if (!c.environment) {
      el.trigger('scarper!');
    }
  });

  window._dead = creature;

  el.on('barf', function () {
    fish.append(barf);
    setTimeout(function () {
      barf.remove();
    }, 700);
  })

  // Set a random size for the creature
  el.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Load external CSS file
  fishcotheque.loadCSS('creatures/deaded-fish/dead.css');

  // Generate a random number between two values
  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower);
    var minima = Math.min(upper, lower);
    var value = Math.random() * (maxima - minima);
    return value + minima;
  }

  function getFloating(c) {
    return Math.sin(c * 5 * Math.PI / 180);
  }


  var ctr = 0;

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function (e) {
    ctr++;
   // fishcotheque.isRunning = false;


    // Calculate position
    var oldpos = creature.position();
    var newpos = {
      top: oldpos.top + getFloating(ctr),
      left: oldpos.left + (scarpering ? speed : 0),
    };

    // Collision detection with the edge of the screen
    if ((newpos.left > canvasSize.width) || newpos.left < -el.width()) {

      // Reverse direction
      newpos.left = oldpos.left;

      // Set a new random vertical position
      newpos.top = rnd(seabedOffset, canvasSize.height - seabedOffset);

      // Flip the direction of travel
      speed = -speed;

      // Set a new random size
      scale = Math.random() + 0.25;

      // Flip the direction of the image
      xScale = (speed > 0) ? scale : -scale;

      // Update creature dimensions
      el.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });
    }

    // Move creature
    creature.position(newpos);
  });
});
