const { Tee } = require('node-tee');
const orb = require('../core.orb');
const actions = require('./functions.actions');

const myTee = Tee.new('Action on Functions');

myTee.case('Cold function should set value on proto', expect => {
  const a = Object.create(actions);
  a.value = 1;
  a.coldFn(function add() {
    this.value++;
  });
  a.add();
  expect(a.value).toBe(2);
  const b = Object.create(a);
  b.value = 0;
  b.add();
  expect(a.value).toBe(3);
  expect(b.value).toBe(0);
});

myTee.case('Should throw error if function exists on proto', expect => {
  const a = Object.create(actions);
  a.coldFn(function add() {});
  const b = Object.create(a);
  try {
    b.coldFn(function add() {});
  } catch (e) {
    expect(e.message).toBe('function with that name already existing in proto');
  }
});

myTee.case(`Shuld throw error if function doesn't have name`, expect => {
  const a = Object.create(actions);
  try {
    a.coldFn(function() {});
  } catch (e) {
    expect(e.message).toBe(
      `callback function provided for coldFn doesn't have name`,
    );
  }
});

myTee.case(`Should create hot function that doesn't affect proto`, expect => {
  const a = Object.create(actions);
  a.value = 0;
  a.hotFn(function add() {
    this.value++;
  });
  a.add();
  expect(a.value).toBe(1);
  const b = Object.create(a);
  b.add();
  expect(a.value).toBe(1);
  expect(b.value).toBe(2);
  a.add();
  expect(a.value).toBe(2);
  expect(b.value).toBe(2);
});

myTee.case('Should run exec on all proto', expect => {
  let count = 0;
  const a = Object.create(actions);
  const orbx = Object.assign(orb, a);
  const orb1 = orbx.spawn();
  const orb2 = orb1.orb(function Add1() {
    count++;
  });
  const orb3 = orb2.orb(function Add1() {
    count++;
  });
  const orb4 = orb3.orb(function Add1() {
    count++;
  });
  orb4.execUp();
  expect(count).toBe(3);
});

myTee.case('Should run exec on all children', expect => {
  let count = 0;
  const a = Object.create(actions);
  const orbx = Object.assign(orb, a);
  const orb1 = orbx.spawn();
  const orb2 = orb1.orb(function Add1() {
    count++;
  });
  const orb3 = orb2.orb(function Add1() {
    count++;
  });
  const orb4 = orb3.orb(function Add1() {
    count++;
  });
  const orb5 = orb2.orb(function Add1() {
    count++;
  });
  orb1.execDown();
  expect(count).toBe(4);
});

module.exports = myTee;
