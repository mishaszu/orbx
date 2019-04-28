const { Tee } = require('node-tee');
const link = require('./actions.orb');

const myTee = Tee.new('Actions component');

myTee.case('Cold function should set value on proto', expect => {
  const a = Object.create(link);
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
  const a = Object.create(link);
  a.coldFn(function add() {});
  const b = Object.create(a);
  try {
    b.coldFn(function add() {});
  } catch (e) {
    expect(e.message).toBe('function with that name already existing in proto');
  }
});

myTee.case(`Shuld throw error if function doesn't have name`, expect => {
  const a = Object.create(link);
  try {
    a.coldFn(function() {});
  } catch (e) {
    expect(e.message).toBe(
      `callback function provided for coldFn doesn't have name`,
    );
  }
});

myTee.case(`Should create hot function that doesn't affect proto`, expect => {
  const a = Object.create(link);
  a.value = 0;
  a.hotFn(function add(){this.value++});
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

module.exports = myTee;
