const { Tee } = require('node-tee');
const orb = require('../core.orb');
const Values = require('./values.actions');
const Utils = require('./utils.actions');

const myTee = Tee.new(`Actions on Values`);

myTee.case('Should set value on proto', expect => {
  const a = Object.create(Values);
  const orbx = Object.assign(orb, a, Utils);
  const orb1 = orbx.spawn();
  const orb2 = orb1.orb({ value1: 1 });
  const orb3 = orb2.orb({ value2: 2 });
  const orb4 = orb3.orb({ value3: 3 });
  orb4.setOnProto('value2', 4);
  expect(orb2.value1).toBe(1);
  expect(orb3.value2).toBe(4);
  expect(orb4.value3).toBe(3);
});

module.exports = myTee;
