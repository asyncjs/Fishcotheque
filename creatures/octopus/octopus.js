fishcotheque.createCreature('octopus', function (creature) {

  'use strict';

  // Shortcut to jQuery
  var $ = fishcotheque.jQuery;

  // Octopus root DOM element
  var element = creature.el;

  // Internal variables for the octopus
  var scale = 0.2;
  
  element.css({
    'transform': 'scale(' + scale + ',' + scale + ')'
  });

  // Set the size of octopus
  creature.size({
    width: 950,
    height:825
  });

  // Position octopus on the canvas
  var canvasSize = fishcotheque.size();
  creature.position({
    top: 150,
    left: 650
  });
  
  // add normal class so octopus displays correctly on init
  element.addClass("normal");
  
  
  // scuttle left/right:
  
  
  // Flex:
  function flex (timeInterval){
  
  creature.chat('Welcome to the gun show!');
		 
		  setInterval(function() { 
		  
		    setTimeout(function() { 
		    
		      // remove flex class
		      element.removeClass("flex");
		    
		      // add normal class
		      element.addClass("normal");    
		    }, timeInterval);  
		  
		    // remove normal class
		    element.removeClass("normal");
		    
		    // add flex class
		    element.addClass("flex");    
		  }, timeInterval * 2);
  }
        
  
  
  // Hide:
  function hide () {
    creature.chat('and just like that...!');
		  
		  $(this).fadeOut(rnd(4000,2000));
		  
		  setTimeout(function() {
		    $(element).fadeIn(rnd(8000,4000));
		  },10000);
  
  };
  

  
  
  // Collision detection:



  setInterval(function(){
		  switch (rnd(1, 2)) {
		    case 1:
		      flex(1000);
		      break;
		    case 2:
		      hide();
		      break;
		    default:
		      flex(1000);
		  } // switch
		}, 3000);

  
  // Load external CSS file
  fishcotheque.loadCSS('creatures/octopus/octopus.css');

  // Generate a random number between two values
  function rnd(lower, upper) {
    var maxima = Math.max(upper, lower),
        minima = Math.min(upper, lower),
        value = Math.random() * (maxima - minima);
    return value + minima;
  }

  // Update the creature's state every time we redraw the fishcotheque
  fishcotheque.bind('tick', function() {
		  // code here
  }); // bind to tick fn
});
