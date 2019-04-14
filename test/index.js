const { Pot } = require('node-tee');

const CoreTee = require('../src/core.orb.test');

const myPot = Pot.new('link-orb');
myPot.register([CoreTee]);

myPot.run();

