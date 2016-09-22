fishcotheque.createCreature("niall-fish-1", function(creature) {
  var element = creature.el;
  var canvasSize = fishcotheque.size();
  var pngSize = {width : 170, height : 200};
  var scale = 0.5;
  var drag = 0.99;
  var chattedAlready = false;
  var mousePos = {
    x : 1,
    y : 1
  };
  resetFish()

  fishcotheque.loadCSS('creatures/niall-fish-1/niall-fish-1.css');

  creature.size({width: pngSize.width, height: pngSize.width});

  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  creature.position({
    top: fish.pos.y,
    left: fish.pos.x
  });

  function resetFish() {
    fish = {
      vel : {x : 0, y : 0},
      pos : {x : Math.random() * canvasSize.width, y : Math.random() * canvasSize.height}
    }
  }

  document.querySelector("body").addEventListener("mousemove", function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  fishcotheque.bind('tick', function() {
    speed = {
      x : 0.0005,
      y : 0.0005
    }

    fish.vel.x -= speed.x *(fish.pos.x -mousePos.x)
    fish.vel.y -= speed.y *(fish.pos.y -mousePos.y)

    fish.vel.x *= drag
    fish.vel.y *= drag

    fish.pos.x += fish.vel.x
    fish.pos.y += fish.vel.y

    if (Math.abs(fish.pos.x -mousePos.x) < pngSize.width *scale /2 && Math.abs(fish.pos.y -mousePos.y) < pngSize.height *scale /2) {
      creature.chat("Got you!");
      chattedAlready = true;
      resetFish()
    }

    if (fish.vel.x > 0) {
      facing = scale
    } else {
      facing = -scale
    }

    element.css({
      'transform': 'scale(' + facing + ',' + scale + ')'
    });

    creature.position({
      top: fish.pos.y -pngSize.height /2,
      left: fish.pos.x -pngSize.width /2
    });
  });
});
