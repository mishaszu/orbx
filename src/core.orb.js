const { registerPrimitivesEnum } = require('orbx-enum');
registerPrimitivesEnum();

const core = {};

core.__proto__.spawn = function spawn() {
  return Object.assign({ ...this }, { orbs: [], lvl: 0 });
};

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
