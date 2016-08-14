fishcotheque.createCreature('clock', function (creature) {
  var SPEED = 5,
      hours = 0,
      minutes = 1,
      minutesAccurate = 1,
      minutesCache,
      events = {
        '0':  'midnight',
        '6':  'morning',
        '8':  'breakfast',
        '12': 'midday',
        '13': 'lunch',
        '19': 'dinner',
        '21': 'nighttime'
      },
      data = creature.data(),
      el = creature.el;

  creature
    .position({right:0, bottom:0, zIndex:1000})
    .data({speed: SPEED, background: true});

  creature.el
    .css({
      'background': '#000',
      'color': '#fff',
      'padding': '8px',
      'font-family': 'monospace',
      'font-size' : '20px',
      'cursor': 'pointer'
    });

  // Create a clock that moves six times faster than normal.
  // eg. 10 mins = 1 hour.
  fishcotheque.bind('tick', function (deltaT) {
    minutesAccurate += (deltaT / 1000) * data.speed;

    if (minutesAccurate >= 60) {
      minutesAccurate = minutesAccurate % 60;
      hours += 1; // for large delays, there may be a bigger component to add to `hours`
    }

    minutes = ~~(minutesAccurate);

    if (minutesCache !== minutes){
      if (hours >= 24) {
        hours = 0;
      }

      // Update clock element
      el.html(
        (hours < 10 ? '0' + hours : hours) + ":" +
        (minutes  < 10 ? '0' + minutes  : minutes)
      );

      fishcotheque.trigger('clock', hours, minutes);

      if (minutes === 0 && events[hours]) {
        fishcotheque.trigger(events[hours]);
      }

      minutesCache = minutes;
    }
  });

  // Click the clock to start/stop
  el.click(function(){
    fishcotheque.isRunning ? fishcotheque.stop() : fishcotheque.start();
  });
});
