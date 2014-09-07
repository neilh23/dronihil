#!/usr/bin/env bash

for F in bower_components/jquery/dist/*.js; do
  echo "/* jQuery bundled in flocking.js */" > ${F}
done
