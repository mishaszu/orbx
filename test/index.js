const { Pot } = require('node-tee');
const BasicOrbxInt = require('./mock-orbx-basic.int-pot');

const CoreTee = require('../src/core.orb.pot');
const FunctionsActionTee = require('../src/actions/functions.actions.pot');
const UtilsActionTee = require('../src/actions/utils.actions.pot');
const ValuesActionTee = require('../src/actions/values.actions.pot');

const myPot = Pot.new('link-orb');
myPot.register([CoreTee, FunctionsActionTee, UtilsActionTee, ValuesActionTee]);

myPot.run();
BasicOrbxInt.run();
