/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('sea-bed', function (creature) {

  'use strict';

  var element = creature.el;

  fishcotheque.loadCSS('environment/sea-bed/sea-bed.css');

  creature.size({
    width: '100%'
  });

  creature.position({
    bottom: 0,
    left: 0
  });
});
