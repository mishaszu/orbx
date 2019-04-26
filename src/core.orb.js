const { registerPrimitivesEnum } = require('orbx-enum');
registerPrimitivesEnum();

const link = {};

link.__proto__.spawn = function spawn() {
  return Object.assign({ ...this }, { orbs: [] });
};

link.__proto__.orb = function orb(input) {
  Object.keys(input).forEach(k => {
    if (this[k] !== undefined) {
      throw Error(`Key: ${k} exist on parent`);
    }
  });
  const newOrb = Object.assign(Object.create(this), input, {
    render: input.type.is(Primitive.function) ? input.bind(input) : null,
    name: input.name,
    orbs: [],
  });
  this.orbs.push(newOrb);
  return newOrb;
};

module.exports = link;
