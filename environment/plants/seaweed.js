/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('seaweed', function (creature) {

  'use strict';

  var element = creature.el;

  fishcotheque.loadCSS('environment/plants/seaweed.css');

  // creature.size({
  //   width: '100%'
  // });

  creature.position({
    bottom: 100,
    left: 10
  });
});
