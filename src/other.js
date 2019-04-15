const functionPlay = {
  up() {
    if (this.render) {
      this.render()
    }
    if (this.__proto__ && this.__proto__.up) {
      this.__proto__.up()
    }
  },
  down() {
    if (this.render) {
      this.render()
    }
    this.orbs.forEach(o => {
      o.down()
    })
  },
}
const objectManipulations = {
  // DESC update field on proto 
  update(key, value){
    const find = (k, root) => {
      if (!root.__proto__) {
        return false
      }
      if (root.__proto__[k]){
        return this.__proto__
      }
      return find(k, root.prototype)
    }

    const objKey = find(key, this);
    if (!objKey) {
      throw Error("no key in parrents")
    }
    objKey[key] = value
  }
}
