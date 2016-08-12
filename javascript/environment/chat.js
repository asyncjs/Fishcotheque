fishcotheque.createCreature("chat", function (creature) {
    "use strict";

    // the div element for the layer.
    var jQuery = fishcotheque.jQuery,
        element = creature.el,
        $listEl = jQuery("<ul class='chat-list'></ul>").appendTo(element),
        styleElem = jQuery("<style/>").appendTo("head"),
        isAnimating = false;

    creature
        .size({width:"100%"})
        .position({left:0, bottom:0, zIndex:999})
        .data({background:true, isFullWidth:true});

    styleElem.text(
        ".creature[data-id=chat] {}" +
        ".chat-list { position: relative; list-style-type:none; min-height: 40px; margin:0; font-family:monospace; overflow:auto; height:100%; color:#fff; background-color:rgba(0,0,0,0.5); }" +
        ".chat-item { transition: all 0.5s; transform: translate3d(0, 100%, 0); position: absolute; left: 0; top: 0; padding: 10px; width: 100%; height: 100%; }" +
        ".chat-item.show { transform: translate3d(0, 0, 0); }" +
        ".chat-item.hide { transform: translate3d(-100%, 0, 0); transition-delay: 1s; }" +
        ".chat-name { color:#3f3; }" +
        ".chat-delimiter { color:#777; }" +
        ".chat-message { color:#ff9; font-weight:bold; }"
    );

    function log(message, creature){
        var creatureName = creature && creature.name ?
                creature.name() : creature || "anon",
            nameElem, delimElem, messageElem, $itemEl;

        $itemEl = jQuery("<li class='chat-item'></li>");
        nameElem = jQuery("<span class='chat-name'></span>").text(creatureName);

        if (message){
            delimElem = jQuery("<span class='chat-delimiter'>: </span>");
            messageElem = jQuery("<span class='chat-message'></span>").html(message);
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

    creature.bind("log", log);

    fishcotheque.chat = log;

    creature.constructor.prototype.chat = function(message){
        log(message, this);
        return this;
    };

    // Publish all global events
    fishcotheque.bind("all", function(eventName, creature){
       log(eventName, creature || "fishcotheque");
    });

    log("Welcome to the Fishcotheque!", "asyncjs");
});
