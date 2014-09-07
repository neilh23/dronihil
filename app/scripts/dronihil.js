var fluid, flock;
var dronihil = fluid.registerNamespace('dronihil');

(function() { 
  'use strict';

  dronihil.play = function() { 
    dronihil.s1 = flock.synth(
    {
      synthDef: {
        id: 'carrier',
        ugen: 'flock.ugen.sin',
        freq: {
          id: 'fcarrier',
          ugen: 'flock.ugen.sinOsc',
          freq: 0.25,
          add: 95,
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
          add: 110,
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
        ugen: 'flock.ugen.dust',
        density: {
          id: 'dcarrier',
          ugen: 'flock.ugen.sinOsc',
          freq: {
            id: 'fcarrier',
            ugen: 'flock.ugen.sinOsc',
            freq: 0.25,
            add: 1.0,
            mul: 0.5
          },
          add: 8.0,
          mul: 100
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
          add: 0.85,
          mul: 0.2
        }
      }
    });
    // If you're on iOS, you will need to call in a listener for
    // some kind of user input action, such a button click or touch handler.
    // This is because iOS will only play sound if the user initiated it.
    flock.enviro.shared.play();
  };

}());
