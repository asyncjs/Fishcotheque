/**
 * @see https://github.com/asyncjs/Fishcotheque/wiki/api
 */

fishcotheque.createCreature('sea-bed', function (creature) {
  'use strict';

  var element = creature.el;

  creature.size({
    width: '100%',
    height: 100
  });

  creature.position({
    bottom: 0,
    left: 0
  });

  element.css({
    background: 'linear-gradient(to bottom, rgb(238, 223, 195) 0%, rgb(245, 245, 220) 100%)'
  });
});
