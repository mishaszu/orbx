const { registerPrimitivesEnum } = require('orbx-enum');
registerPrimitivesEnum();

const core = {};

/**
 * Create clean version of orbx object
 *
 *     const test = core.spawn();
 */
core.__proto__.spawn = function spawn() {
  return Object.assign({ ...this }, { orbs: [], lvl: 0 });
};

/**
 * Create new child that add current object to prototype chain + new passed object. <br> - New object maight be any JS object (function, array, object, string, number).<br> - Function input is binded to `exec` method.<br> - Name property is assigned to `name` of new object.<br> - New object is set as child to its proto. To prevent that pass second argument = false.
 *
 *
 *     const test = core.spawn();
 *     function Component1(){console.log(this.vluae)}
 *     Component1.value = 1;
 *     const orb1 = test.orb(Component1);
 *     orb1.run() // 1;
 *
 * @param {(Function | Array | Object | String | Number)} input
 * @param {Boolean} record flag if input should be add to prototype child or not
 * @return {Void}
 * @public
 */
core.__proto__.orb = function orb(input, record = true) {
  Object.keys(input).forEach(k => {
    if (this[k] !== undefined) {
      throw Error(`Key: ${k} exist on parent`);
    }
  });
  const newOrb = Object.assign(Object.create(this), input, {
    exec: input.type.is(Primitive.function) ? input.bind(input) : null,
    name: input.name,
    lvl: this.lvl + 1,
    id: this.orbs.length,
    orbs: [],
  });
  if (record) {
    this.orbs.push(newOrb);
  }
  return newOrb;
};

module.exports = core;
