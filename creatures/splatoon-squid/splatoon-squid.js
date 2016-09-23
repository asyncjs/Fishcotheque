/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('splatoon-squid', function (creature) {

  'use strict';

  var jQuery = fishcotheque.jQuery;
  var element = creature.el;
  var speed = -2;
  var scale = Math.random() + 0.25;

  creature.size({width: 76, height: 68});

  var canvasSize = fishcotheque.size();
  creature.position({
    top: rnd(0, canvasSize.height),
    left: rnd(0, canvasSize.width)
  });

  element.css({
    'transform': 'scale(' + (-scale) + ',' + scale + ')',
    'cursor': 'pointer'
  });

  element.on('click', function (e) {
    speed = -speed;
    var xScale = (speed > 0) ? scale : -scale;
    element.css({
      'transform': 'scale(' + xScale + ',' + scale + ')'
    });
    creature.chat('Ouch!');
  });

  fishcotheque.loadCSS('creatures/splatoon-squid/splatoon-squid.css');

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

    if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {
      newpos.left = oldpos.left;
      newpos.top = rnd(0, canvasSize.height);
      speed = -speed;
      scale = Math.random() + 0.25;
      var xScale = (speed > 0) ? scale : -scale;
      element.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });
      creature.chat('I\'m turning!');
    }
    creature.position(newpos);
  });
});
