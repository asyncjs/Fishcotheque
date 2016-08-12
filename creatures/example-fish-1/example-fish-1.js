/**
 * @see https://github.com/asyncjs/Fishcotheque/wiki/api
 */

fishcotheque.createCreature('example-fish-1', function (creature) {
  'use strict';

  var jQuery = fishcotheque.jQuery;
  var element = creature.el;
  var speed = 1;
  var scale = Math.random() + 0.25;

  // Set the size of your creature.
  creature.size({width: 85, height: 60});

  // Start in the middle.
  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  jQuery("<img/>")
    .attr("src", "creatures/example-fish-1/example-fish-1.png")
    .appendTo(element);

  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  fishcotheque.bind('tick', function() {
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top,
          'left': oldpos.left + speed,
        };

    // collision detection.
    if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {
      newpos.left = oldpos.left;
      newpos.top = rnd(0, canvasSize.height);
      speed = -speed;
      scale = Math.random() + 0.25;
      var xScale = (speed > 0) ? scale : -scale;
      element.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });
      creature.chat("Here I come...");
    }
    creature.position(newpos);
  });
});
