const { Pot } = require('node-tee');
require('../src/prelude.orb')

const CoreTee = require('../src/core.orb.test');

const myPot = Pot.new('link-orb');
myPot.register([CoreTee]);

myPot.run();

