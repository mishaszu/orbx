const { Pot } = require('node-tee');

const CoreTee = require('../src/core.orb.pot');
const ActionTee = require('../src/actions.orb.pot');

const myPot = Pot.new('link-orb');
myPot.register([CoreTee, ActionTee]);

myPot.run();
