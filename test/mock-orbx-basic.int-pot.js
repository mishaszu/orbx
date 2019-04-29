const { Tee, Pot } = require('node-tee');
const Orbx = require('../src');

const myPot = Pot.new('Integration test for basic orbx functionality');
const myTee = Tee.new('Basic Orbx object');

myTee.case('Should build basic structure', expect => {
  const orb1 = Orbx.spawn();
  function Add1() {
    return this.value;
  }
  Add1.value = 1;
  const orb2 = orb1.orb(Add1);
  expect(orb2.name).toBe('Add1');
  expect(orb2.exec()).toBe(1);
  function Add2() {
    return this.value;
  }
  Add2.value = 2;
  const orb3 = orb2.orb(Add2);
  expect(orb3.name).toBe('Add2');
  expect(orb3.exec()).toBe(2);
  expect(orb3.__proto__.exec()).toBe(1);
});

myTee.case('Should run basic functions', expect => {
  const orb1 = Orbx.spawn();
  let count = 0;
  function Add1() {
    count++;
  }
  Add1.value = 1;
  Add1.value2 = 8;
  const orb2 = orb1.orb(Add1);
  orb2.coldFn(function() {
    this.value = 10;
  }, 'change');
  function Add2() {
    count++;
  }
  Add2.value = 2;
  const orb3 = orb2.orb(Add2);
  orb3.change();
  orb3.execUp();
  expect(orb2.value).toBe(10);
  expect(orb3.value).toBe(2);
  expect(count).toBe(2);
});

myPot.register([myTee]);

module.exports = myPot;
