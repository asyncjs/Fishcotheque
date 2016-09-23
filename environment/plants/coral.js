/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */
const max_coral = 3; 

function createCoral(num) {

    fishcotheque.createCreature('coral-' + num, function (creature) {

      'use strict';

      var element = creature.el;
      element.attr('class', 'creature creature--coral');

      fishcotheque.loadCSS('environment/plants/coral.css');

      // creature.size({
      //   width: '100%'
      // });

      creature.position({
        bottom: 100,
        left: Math.random() * 1000
      });
    });
}

for (var i = 0; i < max_coral; i++) {
    createCoral(i);
};
