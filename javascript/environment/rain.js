(function() {
  fishcotheque.createCreature('rain', function(layer) {
    var $rnd, droplet, id, raining, ws,
        jQuery = fishcotheque.jQuery,
        styleElem = jQuery("<style/>").appendTo("head");

    layer.data({
      background: true
    });
    ws = fishcotheque.size();
    layer.position({
      zIndex: 99
    });
    layer.size({
      width: ws.width,
      height: ws.height
    });

    styleElem.text(
      "div.droplet1 { background-image: url(../images/droplet1.png); background-size : 30px 30px; width : 30px; height : 30px; }" +
      "div.droplet2 { background-image: url(../images/droplet2.png); background-size : 30px 30px; width : 30px; height : 30px; }"
    );

    raining = 0;
    $rnd = function(m) {
      return Math.floor(Math.random() * m);
    };
    droplet = [];
    for (id = 1; id <= 2; id++) {
      droplet[id] = new Image();
      droplet[id].src = "images/droplet" + id + ".png";
    }
    fishcotheque.bind('clock', function(h, m) {
      if (!raining && h === $rnd(12) && m === 0) {
        return fishcotheque.trigger('rain');
      }
    });

    return fishcotheque.bind('rain', function(weight) {
      var $rl, canvas, context, ly;
      context = [];
      for (ly = 0; ly <= 2; ly++) {
        canvas = document.createElement('canvas');
        canvas.className = "full";
        canvas.width = ws.width;
        canvas.height = ws.height;
        layer.el.append(canvas);
        context[ly] = canvas.getContext('2d');
      }
      fishcotheque.bind('clock', function(h, m) {
        if (raining && $rnd(5) === 1) {
          return context[2].drawImage(droplet[1 + $rnd(2)], $rnd(ws.width), $rnd(ws.height), 30, 30);
        }
      });
      fishcotheque.chat("And the heavens open...", layer);
      fishcotheque.trigger('rain:start', layer);
      raining = 1;
      $rl = function(cx, skew, sh, cl) {
        var $anim, x, _ref;
        cx.strokeStyle = cl;
        cx.lineWidth = 1;
        cx.lineCap = "square";
        cx.beginPath();
        for (x = -skew, _ref = canvas.width; -skew <= _ref ? x <= _ref : x >= _ref; -skew <= _ref ? x++ : x--) {
          cx.moveTo(x, 0);
          cx.lineTo(x + skew, canvas.height);
          cx.stroke();
          cx.closePath();
          x += $rnd(20);
        }
        $anim = function(p) {
          return _.delay(function() {
            fishcotheque.jQuery(cx.canvas).css({
              left: Math.floor(Math.PI * (Math.pow(10, p)) % 10)
            });
            return $anim(++p > 10 ? 0 : p);
          }, 50);
        };
        return $anim(sh);
      };
      $rl(context[0], 50, 0, '#1B59E0');
      $rl(context[1], 70, 5, '#163882');
      return _.delay(function() {
        var cx, _i, _len, _results;
        raining = 0;
        fishcotheque.chat("Deluge over", layer);
        fishcotheque.trigger('rain:stop', layer);
        _results = [];
        for (_i = 0, _len = context.length; _i < _len; _i++) {
          cx = context[_i];
          _results.push(fishcotheque.jQuery(cx.canvas).remove());
        }
        return _results;
      }, 15000);
    });
  });
}).call(this);
