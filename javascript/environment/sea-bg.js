/**
 * @see https://github.com/asyncjs/Fishcotheque/wiki/api
 */

fishcotheque.createCreature('sea-bg', function (creature) {
  'use strict';

  var element = creature.el;

  creature.size({
    width: '100%',
    height: '100%'
  });

  creature.position({
    top: 0,
    left: 0
  });

  element.css({
    background: 'linear-gradient(to bottom, rgb(30,87,153) 0%, rgb(125,185,232) 100%)'
  });
});
