fishcotheque.createCreature("niall-fish-1", function(creature) {
  var element = creature.el;
  var canvasSize = fishcotheque.size();
  var pngSize = {width : 170, height : 200};
  var scale = 0.5;
  var drag = 0.99;
  var chattedAlready = false;
  var afkTime = 0;
  var target = "mouse";
  var test = false;
  var mousePos = {
    x : 1,
    y : 1
  };
  var speed = {
    x : 0.0005,
    y : 0.0005
  };
  var lastMousePos = {};
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

    if (afkTime > 60){
      target = "fish";
      chosenFish = chooseFishTarget();
    } else {
      target = "mouse";
    }
  }

  function chooseFishTarget() {
    var allCreatures = fishcotheque.all();
    var creatureNames = Object.keys(allCreatures);
    var chosenName = creatureNames[Math.round(Math.random() *creatureNames.length)];
    var chosenFish = allCreatures[chosenName]

    return {pos : chosenFish._position, dim : chosenFish._size};
  }

  function speak() {
    creature.chat("Got you!");
    chattedAlready = true;
  }

  document.querySelector("body").addEventListener("mousemove", function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  fishcotheque.bind('tick', function() {
    if (lastMousePos.x == mousePos.x && lastMousePos.y == mousePos.y){
      afkTime += 1;

    } else {
      afkTime = 0;
    }

    if (target == "mouse") {
      fish.vel.x -= speed.x *(fish.pos.x -mousePos.x);
      fish.vel.y -= speed.y *(fish.pos.y -mousePos.y);
    } else {
      fish.vel.x -= speed.x *(fish.pos.x -chosenFish.pos.left +chosenFish.dim.width /2);
      fish.vel.y -= speed.y *(fish.pos.y -chosenFish.pos.top +chosenFish.dim.height /2);
    }

    fish.vel.x *= drag;
    fish.vel.y *= drag;

    fish.pos.x += fish.vel.x;
    fish.pos.y += fish.vel.y;

    if (target == "mouse"){
      if (Math.abs(fish.pos.x -mousePos.x) < pngSize.width *scale /2 && Math.abs(fish.pos.y -mousePos.y) < pngSize.height *scale /2) {
        speak();
        resetFish();
      }

    } else {
      var xDiff = Math.abs(fish.pos.x - chosenFish.pos.left + chosenFish.dim.width /2);
      var yDiff = Math.abs(fish.pos.y - chosenFish.pos.top + chosenFish.dim.height /2);

      if (xDiff < pngSize.width /2 + chosenFish.dim.width /2 && yDiff < pngSize.height /2 + chosenFish.dim.height /2) {
        speak();
        resetFish();
      }
    }

    if (fish.vel.x > 0) {
      facing = scale;
    } else {
      facing = -scale;
    }

    element.css({
      'transform': 'scale(' + facing + ',' + scale + ')'
    });

    creature.position({
      top: fish.pos.y -pngSize.height /2,
      left: fish.pos.x -pngSize.width /2
    });

    lastMousePos = Object.assign({}, mousePos);
  });
});
