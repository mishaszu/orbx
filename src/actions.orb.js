const actions = {};
const ErrorMessage1 = `callback function provided for coldFn doesn't have name`;
const ErrorMessage2 = 'function with that name already existing in proto';

/**
 * Take function and attache it to current object binding it. Executing function will change only the object and not its child. Other words if you call this function from child it will change prototype object value
 *
 *     const test = Object.create(actions);
 *     test.value = 0;
 *     test.coldFn(function add(){ this.value++ });
 *     test.add(); // test.value === 1;
 *     const test2 = Object.create(test);
 *     test2.add() // test2.value === undefined && test.value === 2
 *
 * @param {Function} fn callback function that will be set
 * @param {String} name function name if function is anonymus
 * @return {Void}
 * @public
 */
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

/**
 * Take function and attache it to current object checking if existing name exists on prototype chain
 *
 *     const test = Object.create(actions);
 *     test.value = 0;
 *     test.hotFn(function add(){ this.value++ });
 *     const test2 = Object.create(test);
 *     test2.value = 0;
 *     test.add() // test.value === 1 && test2.value === 0
 *     test2.add() // test.value === 1 && test2.value === 1
 *
 * @param {Function} fn callback function that will be set
 * @param {String} name function name if function is anonymus
 * @return {Void}
 * @public
 */
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
