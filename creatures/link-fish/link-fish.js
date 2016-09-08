/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('link-fish', function (creature) {

    'use strict';

    console.log('link fish!');

    var jQuery      = fishcotheque.jQuery;
    var canvas      = document.createElement('canvas');
    var context     = canvas.getContext('2d');
    var element     = creature.el;                      // Your creature's root DOM element
    var img         = new Image();
    img.src         = 'creatures/link-fish/link.png';

    canvas.width    = 17;
    canvas.height   = 24;

    //
    var speed       = 2;
    var scale       = 2;
    var dir         = 'right';
    var width       = 17;
    var height      = 24;
    var top         = 50;
    var left        = fishcotheque.center().left - (width / 2);


    //
    var offsetX     = 51;
    var offsetY     = (dir == 'right' ? 50 : 75);;

    //
    var sequenceIdx             = 0;
    var sequence                = [3,4,5,6,5,4,3,2,1,0,1,2];
    var animationUpdateTime     = (1000 / 24);
    var timeSinceLastFrameSwap  = 0;

    // Set the size of your creature
    creature.size({ width: width, height: height });
    creature.position({ top: top, left: left });
    creature.el.append(canvas);

    // Position creature somewhere on the canvas
    var canvasSize = fishcotheque.size();

    // Set a random size for the creature
    element.css({ 'transform': 'scale(' + scale + ',' + scale + ')' });

    /*********************************
     * Functions
     *********************************/

    // Load external CSS file
    fishcotheque.loadCSS('creatures/link-fish/link-fish.css');


    /*********************************
     * The tick
     *********************************/

    // Update the creature's state every time we redraw the fishcotheque
    fishcotheque.bind('tick', function() {

        // assuming 60 fps
        timeSinceLastFrameSwap += (1000/60);

        // sprite animation
        if( timeSinceLastFrameSwap > animationUpdateTime ) {

            if( sequenceIdx < sequence.length -1 ) {
                sequenceIdx += 1;
            }
            else {
                sequenceIdx = 0;
            }


            var col = sequence[sequenceIdx] % 7;

            offsetX = col * width;
            offsetY = (dir == 'right' ? 50 : 75);

            // console.log(offsetX);

            timeSinceLastFrameSwap = 0;
        }

        // draw it!
        context.clearRect(0, 0, width, height);
        context.drawImage(img, offsetX, offsetY, width, height, 0, 0, width, height);


        // Calculate position
        var oldpos = creature.position();
        var newpos = {
              'top': oldpos.top,
              'left': oldpos.left + speed,
            };

        // Collision detection with the edge of the screen
        if ((newpos.left > canvasSize.width) || newpos.left < -element.width()) {

            // Reverse direction
            newpos.left = oldpos.left;

            dir = (dir == 'left' ? 'right' : 'left');

            // Set a new random vertical position
            newpos.top = (Math.random() * canvasSize.height) |0;

            // Flip the direction of travel
            speed = -speed;

            creature.chat('Taste sword!');
        }

        // Move creature
        creature.position(newpos);
    });
});
