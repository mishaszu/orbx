const { Tee } = require('node-tee');
const orb = require('../core.orb');
const actions = require('./utils.actions');

const myTee = Tee.new(`Action's utils`);

myTee.case('Should find key on proto', expect => {
  const a = Object.create(actions);
  const orbx = Object.assign(orb, a);
  const orb1 = orbx.spawn();
  function Add1() {}
  Add1.value = 1;
  const orb2 = orb1.orb(Add1);
  function Add2() {}
  Add2.foo = 3;
  const orb3 = orb2.orb(Add2);
  expect(orbx.findProtoByKey('value', orb3).name).toBe('Add1');
});

module.exports = myTee;
