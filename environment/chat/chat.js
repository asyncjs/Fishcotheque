/**
 * @see
 *   - [repo] https://github.com/asyncjs/Fishcotheque
 *   - [demo] https://fishcotheque.asyncjs.com
 *   - [about] https://asyncjs.com/fishcotheque/
 */

fishcotheque.createCreature('chat', function (creature) {

  'use strict';

  var jQuery = fishcotheque.jQuery,
      element = creature.el,
      $listEl = jQuery('<ul class="chat-list"/>').appendTo(element),
      isAnimating = false;

  fishcotheque.loadCSS('environment/chat/chat.css');

  creature
    .size({width: '100%'})
    .position({left: 0, bottom: 0, zIndex: 999})
    .data({background: true, isFullWidth: true});

  function log(message, creature){
    var creatureName = creature && creature.name ? creature.name() : creature || 'anon',
        nameElem, delimElem, messageElem, $itemEl;

    $itemEl = jQuery('<li class="chat-item"/>');
    nameElem = jQuery('<span class="chat-name"/>').text(creatureName);

    if (message){
      delimElem = jQuery('<span class="chat-delimiter">: </span>');
      messageElem = jQuery('<span class="chat-message"/>').html(message);
    }

    $itemEl.append(nameElem, delimElem, messageElem).appendTo($listEl);
    if (!isAnimating) {
      isAnimating = true;
      startShowTransition($itemEl);
    }
  };

  function startShowTransition ($el) {
    if ($el.hasClass('show')) { return; }
    $el.on('transitionend', onShowTransitionEnd.bind(null, $el));
    fishcotheque.bind('tick.show', function () {
      $el.addClass('show');
      fishcotheque.unbind('tick.show');
    });
  }

  function onShowTransitionEnd ($el) {
    isAnimating = false;
    var $items = $listEl.find('.chat-item:not(.hide)');
    if ($items.length > 0) {
        isAnimating = true;
        startShowTransition($items.first());
        startHideTransition($el);
    }
  }

  function startHideTransition ($el) {
    if ($el.hasClass('hide')) { return; }
    $el.on('transitionend', onHideTransitionEnd.bind(null, $el));
    fishcotheque.bind('tick.hide', function () {
       $el.addClass('hide');
       fishcotheque.unbind('tick.hide');
    });
  }

  function onHideTransitionEnd ($el) {
    $el.remove();
  }

  creature.bind('log', log);

  fishcotheque.chat = log;

  creature.constructor.prototype.chat = function(message){
    log(message, this);
    return this;
  };

  // Publish all global events
  fishcotheque.bind('all', function(eventName, creature){
    log(eventName, creature || 'fishcotheque');
  });

  log('Welcome to the Fishcotheque!', 'asyncjs');
});
