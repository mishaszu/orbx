const link = {
  orbs: [],
  orb(b){
    Object.keys(b).forEach(k => {
      if(this[k] !== undefined) {
        throw Error(`Key: ${k} exist on parent`)
      }
    })
    const newOrb = Object.assign(
      Object.create(this),
      b,
      {
        render: b.prototype.constructor,
        name: b.name,
        up: this.up,
        down: this.down,
        orbs: []
      },
    );
    this.orbs.push(newOrb)
    return newOrb
  },
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

console.time('test')
function App() {console.log('test')}
console.log('App; ', App.prototype)
App.prototype.constructor()
App.a = 1 
const obj1 = link.orb(App);
console.log(obj1);
obj1.render()

function Header() {
  console.log('get from proto: ', `{ a: ${this.a} }`)
}
Header.b = 2

console.log("-----")
const obj2 = obj1.orb(Header)
obj2.up()
console.log("-----")
link.down()
console.timeEnd('test')
console.log("-----")
obj2.update('a', 6)
console.log(obj1)
console.log(obj2)
