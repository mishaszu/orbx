const actions = {};
const ErrorMessage1 = key => `can't find prototype with key: ${key}`;

actions.__proto__.setOnProto = function setOnProto(key, value) {
  const proto = this.findProtoByKey(key, this);
  if (!proto) {
    throw Error(ErrorMessage1(key));
  }
  proto[key] = value;
};

module.exports = actions;
