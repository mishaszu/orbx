const { Tee } = require('node-tee');
const link = require('./core.orb');

const myTee = Tee.new('Core component');
myTee.case('Should establish simple link between object orbs', expect => {
  const linker = link.spawn();
  const str1 = 'test1';
  const str2 = 'test2';
  console.time('test1');
  const orb1 = linker.orb({ a: str1 });
  const orb2 = orb1.orb({ b: str2 });
  console.timeEnd('test1');
  expect(orb2.b).toBe(str2);
  expect(orb2.a).toBe(str1);
});

myTee.case('Should estabilsh simple link between function orbs', expect => {
  const linker = link.spawn();
  function Test1() {}
  Test1.a = 1;
  const orb1 = linker.orb(Test1);
  function Test2() {}
  Test2.b = 2;
  const orb2 = orb1.orb(Test2);
  expect(orb2.b).toBe(2);
  expect(orb2.a).toBe(1);
});

myTee.case('Should create clean linkers', expect => {
  const linker1 = link.spawn();
  const orb1 = linker1.orb({ a: 1 });
  const linker2 = link.spawn();
  const orb2 = linker2.orb({ b: 2 });

  expect(orb1.__proto__.orbs.length).toBe(1);
  expect(orb2.__proto__.orbs.length).toBe(1);
});

myTee.case('Should access itself properties', expect => {
  const a = function Test() {console.log(this.a)}
  a.a = 2;
  console.log(a.bind(a))
})

module.exports = myTee;