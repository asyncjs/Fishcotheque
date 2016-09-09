/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('rick', function (creature) {

	var jQuery = fishcotheque.jQuery,
		element = creature.el,
		speed = 1,
  	scale = Math.random() + 0.5,
  	worldSize = fishcotheque.size(),
  	width = 100,
  	left = fishcotheque.center().left - (width / 2);

	creature.size({
		width: 150,
		height: 150
	});

	creature.position({
		top: rnd(0, worldSize.height),
    left: rnd(0, worldSize.width)
	});

	element.on('click', function (e) {
    creature.chat('Never gonna give you up!');
  });

  element.css({
    'transform': 'scale(' + (-scale) + ',' + scale + ')',
    'cursor': 'pointer'
  });

	fishcotheque.loadCSS('creatures/rick/rick.css');

  fishcotheque.bind('tick', function() {
    var oldpos = creature.position(),
        newpos = {
          'top': oldpos.top,
          'left': oldpos.left + speed,
        };

    if ((newpos.left > worldSize.width) || newpos.left < -element.width()) {
      newpos.left = oldpos.left;
      newpos.top = rnd(0, worldSize.height);
      speed = -speed;
      scale = Math.random() + 0.25;
      var xScale = (speed > 0) ? scale : -scale;
      element.css({
        'transform': 'scale(' + xScale + ',' + scale + ')'
      });
      creature.chat('Never gonna let you down!');
    }
    creature.position(newpos);
  });
});