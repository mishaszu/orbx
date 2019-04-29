const actions = {};

actions.__proto__.findProtoByKey = function findProtoByKey(key, orb) {
  if (!orb.__proto__) {
    return false;
  }
  if (orb.__proto__[key]) {
    return orb.__proto__;
  }
  return orb.findProtoByKey(key, orb.__proto__);
};

module.exports = actions;
