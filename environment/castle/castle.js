
fishcotheque.createCreature('castle', function (creature) {

  'use strict';

  var element = creature.el;

  fishcotheque.loadCSS('environment/castle/castle.css');

  creature.position({
    bottom: 70,
    right: 0
  });
});
