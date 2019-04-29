const Functions = require('./functions.actions');
const Values = require('./values.actions');
const Utils = require('./utils.actions');

module.exports = Object.assign(Functions, Values, Utils);
