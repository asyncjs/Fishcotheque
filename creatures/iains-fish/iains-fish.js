/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('iains-fish', function (creature) {

  'use strict';

  var jQuery = fishcotheque.jQuery;
  var element = creature.el;
  var canvasSize = fishcotheque.size();
  var speed = -4;
  var direction = -1;

  var scale = Math.random() + 0.25;

  var width = 200;
  var height = 200;

  var svg = '<?xml version="1.0" encoding="utf-8"?> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="iains-fish" x="0px" y="0px"viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"> <style type="text/css"> .st0{fill:none;} .st1{fill:#231F20;} .st2{fill:url(#XMLID_2_);} </style> <pattern  width="28.8" height="28.8" patternUnits="userSpaceOnUse" id="_x31_0_dpi_60_x25_" viewBox="4.3 -33.1 28.8 28.8" style="overflow:visible;"> <g> <polygon class="st0" points="4.3,-33.1 33.1,-33.1 33.1,-4.3 4.3,-4.3     "/> <g> <path class="st1" d="M33.1,0c2.4,0,4.3-1.9,4.3-4.3s-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3S30.7,0,33.1,0z"/> <path class="st1" d="M18.7,0C21.1,0,23-1.9,23-4.3s-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3S16.3,0,18.7,0z"/> <path class="st1" d="M33.1-14.4c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3 C28.8-16.3,30.7-14.4,33.1-14.4z"/> <path class="st1" d="M18.7-14.4c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3 C14.4-16.3,16.3-14.4,18.7-14.4z"/> <path class="st1" d="M11.5-7.2c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3C7.2-9.1,9.1-7.2,11.5-7.2z"/> <path class="st1" d="M25.9-7.2c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3C21.6-9.1,23.5-7.2,25.9-7.2z"/> <path class="st1" d="M11.5-21.6c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3 C7.2-23.5,9.1-21.6,11.5-21.6z"/> <path class="st1" d="M25.9-21.6c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3C21.6-23.5,23.5-21.6,25.9-21.6z"/> </g> <g> <path class="st1" d="M4.3,0c2.4,0,4.3-1.9,4.3-4.3S6.7-8.6,4.3-8.6C1.9-8.6,0-6.7,0-4.3S1.9,0,4.3,0z"/> <path class="st1" d="M4.3-14.4c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3C1.9-23,0-21.1,0-18.7C0-16.3,1.9-14.4,4.3-14.4z"/> </g> <g> <path class="st1" d="M33.1-28.8c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3 C28.8-30.7,30.7-28.8,33.1-28.8z"/> <path class="st1" d="M18.7-28.8c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3 C14.4-30.7,16.3-28.8,18.7-28.8z"/> </g> <g> <path class="st1" d="M4.3-28.8c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.3,1.9-4.3,4.3C0-30.7,1.9-28.8,4.3-28.8z"/> </g> </g> </pattern> <pattern  id="XMLID_2_" xlink:href="#_x31_0_dpi_60_x25_" patternTransform="matrix(2.5 0 0 2.5 11873.583 11148.8408)"> </pattern> <path id="XMLID_4_" class="st2" d="M456,238c0,0,0,85.2,0,96c-1-23.7-55.1-46-88.2-46c0,32.2-76,46-162,46 c-44.4,0-78.9-20.5-109.5-32.3c-34.6-13.4-71.6-41.2-71.6-41.2s40.3-30.3,75.7-47.5c28-13.6,65.2-26,105.6-26 c86.1,0,160,17.8,160,50c33,0,87.1-26.2,88.1-49.9c0,11.2,1.9,50.6,1.9,50.6"/> </svg>';

  element.html(jQuery(svg));

  creature.size({ width: width, height: height });

  creature.position({
    top: rnd(0, canvasSize.height - height),
    left: rnd(0, canvasSize.width - width)
  });

  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  var $svg = jQuery('.iains-fish');

  fishcotheque.bind('tick', function() {

    var randomColour = '#' + Math.floor(Math.random() * 16777215).toString(16);

    $svg.css({ fill: randomColour});
    jQuery('.st1').css({ fill: randomColour });

    speed += ((Math.random() - 0.5) * 2);

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

      direction = (direction == 1) ? -1 : 1;

      element.css({
        'transform': 'scaleX(' + direction + ')'
      });
    }
    creature.position(newpos);
  });

});
