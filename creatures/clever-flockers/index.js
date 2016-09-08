/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */
console.log('Loading!');

const attractors = [[
    Infinity // x
  , Infinity // y
  , 150 // dist
  , 0.25 // spd
], [
  Infinity, 0,
  -150, 0.25,
]]

const max = 50;
const flock = Boids({
  boids: max,              // The amount of boids to use
  // speedLimit: 5,          // Max steps to take per tick
  // accelerationLimit: 1,   // Max acceleration per tick
  // separationDistance: 100, // Radius at which boids avoid others
  // alignmentDistance: 180, // Radius at which boids align with others
  // cohesionDistance: 180,  // Radius at which boids approach others
  // separationForce: 0.25,  // Speed to avoid at
  // alignmentForce: 0.25,   // Speed to align with other boids
  // cohesionForce: 1.5,     // Speed to move towards other boids
  // attractors: attractors,
    boids: max
    , speedLimit: 2
    , accelerationLimit: 0.5
    , attractors: attractors
})

const init = (number) => {
  return function (creature) {
    console.log('created');
    'use strict';

    // It can be useful to create a shortcut to jQuery
    var jQuery = fishcotheque.jQuery;

    // Your creature's root DOM element
    var element = creature.el;
    element.attr('class', 'creature creature--clever-flockers');
    // Some internal variables for the example creature
    var speed = 1;
    var scale = /*Math.random() +*/ 0.25;

    // Set the size of your creature
    creature.size({
      width: 85,
      height: 60
    });

    // Position creature somewhere on the canvas
    var canvasSize = fishcotheque.size();
    creature.position({
      top: rnd(0, canvasSize.height),
      left: rnd(0, canvasSize.width)
    });

    // Click detection
    element.on('click', function (e) {
      creature.chat('Leave me alone!');
    });

    // Set a random size for the creature
    element.css({
      'transform': 'scale(' + scale + ',' + scale + ')'
    });

    // Load external CSS file
    fishcotheque.loadCSS('creatures/clever-flockers/style.css');

    // Generate a random number between two values
    function rnd(lower, upper) {
      var maxima = Math.max(upper, lower),
          minima = Math.min(upper, lower),
          value = Math.random() * (maxima - minima);
      return value + minima;
    }

    // Update the creature's state every time we redraw the fishcotheque
    fishcotheque.bind('tick', function() {
      if (number === 0) {
          flock.tick()
      }
      // Calculate position
      var oldpos = creature.position();
          // newpos = {
          //   'top': oldpos.top,
          //   'left': oldpos.left + speed,
          // };

      let boid = flock.boids[number],
        newpos = {
        left: boid[0] + canvasSize.width / 2,
        top: boid[1] + canvasSize.height / 2,
      };

      

      // // Collision detection with the edge of the screen
      // if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {
      //
      //   // Reverse direction
      //   newpos.left = oldpos.left;
      //
      //   // Set a new random vertical position
      //   newpos.top = rnd(0, canvasSize.height);
      //
      //   // Flip the direction of travel
      //   speed = -speed;
      //
      //   // Set a new random size
      //   scale = Math.random() + 0.25;
      //
      //   // Flip the direction of the image
      //   var xScale = (speed > 0) ? scale : -scale;
      //
      //   // Update creature dimensions
      //   element.css({
      //     'transform': 'scale(' + xScale + ',' + scale + ')'
      //   });
      //
      //   creature.chat('Here I come...');
      // }

      // Move creature
      creature.position(newpos);
    });
  }
};


for (let i = 0; i < max; i++) {
    fishcotheque.createCreature('clever-flockers-' + i, init(i));
}

//////////////////////////////////////////////////////////////////////////
var POSITIONX = 0
  , POSITIONY = 1
  , SPEEDX = 2
  , SPEEDY = 3
  , ACCELERATIONX = 4
  , ACCELERATIONY = 5



function Boids(opts, callback) {
  if (!(this instanceof Boids)) return new Boids(opts, callback)

  opts = opts || {}
  callback = callback || function(){}

  this.speedLimitRoot = opts.speedLimit || 0
  this.accelerationLimitRoot = opts.accelerationLimit || 1
  this.speedLimit = Math.pow(this.speedLimitRoot, 2)
  this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2)
  this.separationDistance = Math.pow(opts.separationDistance || 60, 2)
  this.alignmentDistance = Math.pow(opts.alignmentDistance || 180, 2)
  this.cohesionDistance = Math.pow(opts.cohesionDistance || 180, 2)
  this.separationForce = opts.separationForce || 0.15
  this.cohesionForce = opts.cohesionForce || 0.1
  this.alignmentForce = opts.alignmentForce || opts.alignment || 0.25
  this.attractors = opts.attractors || []

  var boids = this.boids = []
  for (var i = 0, l = opts.boids === undefined ? 50 : opts.boids; i < l; i += 1) {
    boids[i] = [
        Math.random()*25, Math.random()*25 // position
      , 0, 0                               // speed
      , 0, 0                               // acceleration
    ]
  }

  this.callback = callback

  // this.on('tick', function() {
  //   callback(boids)
  // })
}

Boids.prototype.tick = function() {
  var boids = this.boids
    , sepDist = this.separationDistance
    , sepForce = this.separationForce
    , cohDist = this.cohesionDistance
    , cohForce = this.cohesionForce
    , aliDist = this.alignmentDistance
    , aliForce = this.alignmentForce
    , speedLimit = this.speedLimit
    , accelerationLimit = this.accelerationLimit
    , accelerationLimitRoot = this.accelerationLimitRoot
    , speedLimitRoot = this.speedLimitRoot
    , size = boids.length
    , current = size
    , sforceX, sforceY
    , cforceX, cforceY
    , aforceX, aforceY
    , spareX, spareY
    , attractors = this.attractors
    , attractorCount = attractors.length
    , attractor
    , distSquared
    , currPos
    , length
    , target
    , ratio

  while (current--) {
    sforceX = 0; sforceY = 0
    cforceX = 0; cforceY = 0
    aforceX = 0; aforceY = 0
    currPos = boids[current]

    // Attractors
    target = attractorCount
    while (target--) {
      attractor = attractors[target]
      spareX = currPos[0] - attractor[0]
      spareY = currPos[1] - attractor[1]
      distSquared = spareX*spareX + spareY*spareY

      if (distSquared < attractor[2]*attractor[2]) {
        length = hypot(spareX, spareY)
        boids[current][SPEEDX] -= (attractor[3] * spareX / length) || 0
        boids[current][SPEEDY] -= (attractor[3] * spareY / length) || 0
      }
    }

    target = size
    while (target--) {
      if (target === current) continue
      spareX = currPos[0] - boids[target][0]
      spareY = currPos[1] - boids[target][1]
      distSquared = spareX*spareX + spareY*spareY

      if (distSquared < sepDist) {
        sforceX += spareX
        sforceY += spareY
      } else {
        if (distSquared < cohDist) {
          cforceX += spareX
          cforceY += spareY
        }
        if (distSquared < aliDist) {
          aforceX += boids[target][SPEEDX]
          aforceY += boids[target][SPEEDY]
        }
      }
    }

    // Separation
    length = hypot(sforceX, sforceY)
    boids[current][ACCELERATIONX] += (sepForce * sforceX / length) || 0
    boids[current][ACCELERATIONY] += (sepForce * sforceY / length) || 0
    // Cohesion
    length = hypot(cforceX, cforceY)
    boids[current][ACCELERATIONX] -= (cohForce * cforceX / length) || 0
    boids[current][ACCELERATIONY] -= (cohForce * cforceY / length) || 0
    // Alignment
    length = hypot(aforceX, aforceY)
    boids[current][ACCELERATIONX] -= (aliForce * aforceX / length) || 0
    boids[current][ACCELERATIONY] -= (aliForce * aforceY / length) || 0
  }
  current = size

  // Apply speed/acceleration for
  // this tick
  while (current--) {
    if (accelerationLimit) {
      distSquared = boids[current][ACCELERATIONX]*boids[current][ACCELERATIONX] + boids[current][ACCELERATIONY]*boids[current][ACCELERATIONY]
      if (distSquared > accelerationLimit) {
        ratio = accelerationLimitRoot / hypot(boids[current][ACCELERATIONX], boids[current][ACCELERATIONY])
        boids[current][ACCELERATIONX] *= ratio
        boids[current][ACCELERATIONY] *= ratio
      }
    }

    boids[current][SPEEDX] += boids[current][ACCELERATIONX]
    boids[current][SPEEDY] += boids[current][ACCELERATIONY]

    if (speedLimit) {
      distSquared = boids[current][SPEEDX]*boids[current][SPEEDX] + boids[current][SPEEDY]*boids[current][SPEEDY]
      if (distSquared > speedLimit) {
        ratio = speedLimitRoot / hypot(boids[current][SPEEDX], boids[current][SPEEDY])
        boids[current][SPEEDX] *= ratio
        boids[current][SPEEDY] *= ratio
      }
    }

    boids[current][POSITIONX] += boids[current][SPEEDX]
    boids[current][POSITIONY] += boids[current][SPEEDY]
  }

  this.callback(boids)
  // this.emit('tick', boids)
}

// double-dog-leg hypothenuse approximation
// http://forums.parallax.com/discussion/147522/dog-leg-hypotenuse-approximation
function hypot(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  var lo = Math.min(a, b)
  var hi = Math.max(a, b)
  return hi + 3 * lo / 32 + Math.max(0, 2 * lo - hi) / 8 + Math.max(0, 4 * lo - hi) / 16
}
