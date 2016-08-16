/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('sea-bg', function (creature) {

  'use strict';

  var element = creature.el;

  fishcotheque.loadCSS('environment/sea-bg/sea-bg.css');

  creature.size({
    width: '100%',
    height: '100%'
  });

  creature.position({
    top: 0,
    left: 0
  });
});
