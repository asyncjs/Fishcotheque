fishcotheque.createCreature('bubbles', function (creature) {
  'use strict';

  var element = creature.el;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var bubbles = [];


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.width = "100%";
  canvas.style.height = "100%";

  var P_SPAWN_BUBBLES = 0.03;
  var P_RELOCATE = 0.0001;
  var MAX_SPAWN = 3;
  var MAX_SIZE = 0.8;


  fishcotheque.loadCSS('environment/bubbles/bubbles.css');

  creature.size({
    width: '100%',
    height: '100%'
  });

  var size = fishcotheque.size();

  var source = {
    x: Math.random() * size.width,
    y: size.height - 20,
  };

  creature.position({
    top: 0,
    left: 0,
  });

  var bubbleImage = new Image();
  bubbleImage.src = "environment/bubbles/bubble.png";
  bubbleImage.onload = start;

  function maybe(p) {
    return Math.random() < p;
  }

  function addBubble() {
    bubbles.push({s: _.now(), m: Math.random(), source: source});
  }

  function progress(b) {
    return (_.now() - b.s) / 10000;
  }

  function bsize(b) {
    return Math.min(b.m*progress(b), MAX_SIZE);
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(function (b) {
      var y = b.source.y - progress(b) * size.height;
      var x = b.source.x + Math.sin((progress(b)+b.s)*10) * 50;

      context.drawImage(bubbleImage, x, y, bubbleImage.width*bsize(b), bubbleImage.height*bsize(b));
    });
  }

  function reaper() {
    bubbles = bubbles.filter(function (b) {
      return progress(b) < 1;
    });
  }

  function start() {
    fishcotheque.bind('tick', function() {
      reaper();

      if (maybe(P_SPAWN_BUBBLES) && bubbles.length < 20) {
        addBubble();
      }

      if (maybe(P_RELOCATE)) {
        source = {x: Math.random() * size.width, y: source.y};
      }

      draw();
    });
  }

  element.append(canvas);
});
