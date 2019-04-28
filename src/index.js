const core = require('./core.orb');
const actions = require('./actions.orb');

const orbx = Object.assign(core, actions);

module.exports = {
  orbx,
};
