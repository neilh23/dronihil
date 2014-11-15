var fluid, flock;
var dronihil = fluid.registerNamespace('dronihil');

// normalised to 0 -> 1
function feedvals(component, xval, yval) {
  'use strict';
  var dt = dronihil.autoData[component.attr('id')];
  var t = dt.target;

  var xset = dt.xmin + xval*(dt.xrange);
  var yset = dt.ymin + yval*(dt.yrange);

  // console.log(dt['xname'] + " -> " + xset + " , " + dt['yname'] + " -> " + yset);
  t.set(dt.xname, xset);
  t.set(dt.yname, yset);

  var xpos = xval*2 - 1.0;
  var ypos = yval*2 - 1.0;
  // 1 - distance from origin (center) 0 - 1
  var d = Math.sqrt(xval*xval + yval*yval);
  var a = 0.5 + ((Math.atan(ypos/xpos)/Math.PI));

  // console.log('x: ' + xval + ' y: ' + yval + 'Hue: ' + (a*359) + ' sat + ' + (0.6 + d/3) + ' l: ' + (0.2 + d*0.7));
  component.css('background', jQuery.Color({ hue: (a*359), saturation: (0.1 + d/16), lightness: d*0.3}));
}

function bclick(component) {
  'use strict';
  if (dronihil.started !== true) {
    flock.enviro.shared.play();

    var as = flock.enviro.shared.audioStrategy;
    if (as.model.shouldInitIOS) {
      var s = as.source;
      (s.start || s.noteOn).call(as.source, 0);
      (s.stop || s.noteOff).call(as.source, 0);
      as.model.shouldInitIOS = false;
    }
    dronihil.started = true;
  }
  if (component.clicked) { return; }
  component.clicked = true;
  $('.drnbt').removeClass('btnactive');
  component.addClass('btnactive');
  var id = component.attr('id');
  dronihil.recording = id;
  $('body').on("mouseup mouseleave touchend touchcancel", function() {
    $('body').off('mousemove touchmove');
    component.clicked = false;
    component.removeClass('btnactive');
    dronihil.recording = undefined;
  });
  var maxw = $('body').width();
  var maxh = $('body').height();

  $('body').on ("mousemove touchmove", function(event) {
    var x, y;
    if (event.originalEvent !== undefined) {
      x = event.originalEvent.touches[0].pageX;
      y = event.originalEvent.touches[0].pageY;
    } else {
      x = event.pageX;
      y = event.pageY;
    }

    dronihil.recordVal = { xval: (maxw - x)/maxw, yval: y/maxh };
  });

}

function procAuto() {
  'use strict';
  var r = dronihil.recording;
  var idx;

  for (var id in dronihil.auto) {
    if (id === r) { continue; }

    // console.log('id: ' + id);
    idx = dronihil.place[id];
    var a = dronihil.auto[id];
    var k = a[idx];
    if (!k) { continue; }

    feedvals(dronihil.autoData[id].component, a[idx].xval, a[idx].yval);

    dronihil.place[id] = (++idx >= a.length) ? 0 : idx;
  }

  if (r) {
    var v = dronihil.recordVal;
    if (v) {
      var c = dronihil.auto[r] || (dronihil.auto[r] = []);
      idx = c.length;
      c[idx] = v;
      dronihil.place[id] = idx;
      feedvals(dronihil.autoData[r].component, v.xval, v.yval);
      
    }
  }
}

(function() { 
  'use strict';

  dronihil.auto = {};
  dronihil.autoData = {};
  dronihil.place = {};
  dronihil.addAuto = function( args ) {
    var cmp = args.component;
    //cmp.mousedown( function() { bclick(cmp); });
    cmp.on("mousedown touchstart", function(ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      bclick(cmp);
    });
    args.xrange = args.xmax - args.xmin;
    args.yrange = args.ymax - args.ymin;
    dronihil.autoData[cmp.attr('id')] = args;
    feedvals(cmp, Math.random(), Math.random());
  };

  dronihil.play = function() { 
    dronihil.s1 = flock.synth(
    {
      synthDef: {
        id: 'carrier',
        ugen: 'flock.ugen.triOsc',
        freq: {
          id: 'fcarrier',
          ugen: 'flock.ugen.sinOsc',
          freq: 0.25,
          add: 190,
          mul: 32
        },
        mul: {
          id: 'wobble',
          ugen: 'flock.ugen.sinOsc',
          freq: {
            id: 'wwobble',
            ugen: 'flock.ugen.sinOsc',
            freq: 0.01,
            add: 1.8,
            mul: 1.7
          },
          add: 0.3,
          mul: 0.3
        }
      }
    });

    dronihil.s2 = flock.synth(
    {
      synthDef: {
        id: 'carrier',
        ugen: 'flock.ugen.sin',
        freq: {
          id: 'fcarrier',
          ugen: 'flock.ugen.sinOsc',
          freq: 0.25,
          add: 120,
          mul: 35
        },
        mul: {
          id: 'wobble',
          ugen: 'flock.ugen.sinOsc',
          freq: {
            id: 'wwobble',
            ugen: 'flock.ugen.sinOsc',
            freq: 0.06,
            add: 2.5,
            mul: 1.5
          },
          add: 0.3,
          mul: 0.3
        }
      }
    });

    dronihil.s3 = flock.synth(
    {
      synthDef: {
        id: 'carrier',
        ugen: 'flock.ugen.sinOsc',
        freq: {
          id: 'dcarrier',
          ugen: 'flock.ugen.sinOsc',
          freq: {
            id: 'fcarrier',
            ugen: 'flock.ugen.lfNoise',
            freq: 220,
            add: 59.0,
            mul: 8.5
          },
          add: 80.0,
          mul: 110
        },
        mul: {
          id: 'wobble',
          ugen: 'flock.ugen.sinOsc',
          freq: {
            id: 'wwobble',
            ugen: 'flock.ugen.sinOsc',
            freq: 0.06,
            add: 90,
            mul: 1.5
          },
          add: 0.55,
          mul: 0.2
        }
      }

    });

    // uncomment for solo/mute
    // dronihil.s1.set("carrier.mul", 0);
    // dronihil.s2.set("carrier.mul", 0);
   //  dronihil.s3.set("carrier.mul", 0);
    // If you're on iOS, you will need to call in a listener for
    // some kind of user input action, such a button click or touch handler.
    // This is because iOS will only play sound if the user initiated it.
    // flock.enviro.shared.play();
    setInterval(function() { procAuto(); }, 100 );
  };

}());

