#!/usr/bin/env bash

# hack to stop jquery breaking
# there is a 'flocking-no-jquery.js', but flocking
# defines the 'all' js file in its bower.json

for F in bower_components/jquery/dist/*.js; do
  echo "/* jQuery bundled in flocking.js */" > ${F}
done
