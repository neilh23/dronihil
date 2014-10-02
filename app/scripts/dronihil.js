var fluid, flock;
var dronihil = fluid.registerNamespace('dronihil');

function xinspect(o,i){
    if(typeof i=='undefined')i='';
    if(i.length>50)return '[MAX ITERATIONS]';
    var r=[];
    for(var p in o){
        var t=typeof o[p];
        r.push(i+'"'+p+'" ('+t+') => '+(t=='object' ? 'object:'+xinspect(o[p],i+'  ') : o[p]+''));
    }
    return r.join(i+'\n');
}

(function() { 
  'use strict';

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
          add: 150,
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
          add: 210,
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
    // dronihil.s3.set("carrier.mul", 0);
    // If you're on iOS, you will need to call in a listener for
    // some kind of user input action, such a button click or touch handler.
    // This is because iOS will only play sound if the user initiated it.
    flock.enviro.shared.play();
  };
}());

