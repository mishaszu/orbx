try {
  addPrelude(window);
} catch (e) {
  addPrelude(global);
}

function addPrelude(window) {
  const EnumElement = {
    type: 'enum',
  };
  // EnumElement.__proto__.is = function is(comparisonElement) {
  // if (comparisonElement.type && comparisonElement.type !== 'enum') {
  // throw Error('Trying to compare enum and not enum type');
  // }
  // return comparisonElement.value === this.value;
  // };
  function Enum(...arr) {
    const obj = {};
    let id = 1;
    arr.forEach(element => {
      const enumObj = {
        value: element,
      };
      enumObj.__proto__.__enum__ = true;
      enumObj.__proto__.is = function(otherEnum) {
        if (!otherEnum.__enum__) {
          throw Error('Trying to compare enum and not enum type');
        }
        return otherEnum.value === this.value;
      };
      obj[element] = enumObj;
    });
    return obj;
  }

  window.Primitive = Enum('function', 'object', 'array', 'string', 'number');

  Function.prototype.type = Primitive.function;
  Object.prototype.type = Primitive.object;
  Array.prototype.type = Primitive.array;
  String.prototype.type = Primitive.string;
  Number.prototype.type = Primitive.number;
}
