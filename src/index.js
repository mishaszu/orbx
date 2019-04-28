/**
 * @file index.js main orbx files combining all functionality and providing orbx object
 * @author mishaszu <mishaszu@gmail.com>
 */
const core = require('./core.orb');
const actions = require('./actions.orb');

const orbx = Object.assign(core, actions);

module.exports = {
  orbx,
};
