const actions = {};
const ErrorMessage1 = `callback function provided for coldFn doesn't have name`;
const ErrorMessage2 = 'function with that name already existing in proto';

actions.__proto__.coldFn = function coldFn(fn, name) {
  let workString;
  if (!fn.name && !name) {
    throw Error(ErrorMessage1);
  } else if (name) {
    workString = name;
  } else if (fn.name) {
    workString = fn.name;
  }
  if (this[workString]) {
    throw Error(ErrorMessage2);
  }
  this[workString] = fn.bind(this);
};

actions.__proto__.hotFn = function hotFn(fn, name) {
  let workString;
  if (!fn.name && !name) {
    throw Error(ErrorMessage1);
  } else if (name) {
    workString = name;
  } else if (fn.name) {
    workString = fn.name;
  }
  if (this[workString]) {
    throw Error(ErrorMessage2);
  }
  this[workString] = fn;
}

module.exports = actions;
