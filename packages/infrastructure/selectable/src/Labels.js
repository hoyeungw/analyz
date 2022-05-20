export class Labels extends Array {
  constructor(size) { super(size) }
  indexAt(key) { return Array.isArray(key) ? { at: this.indexOf(key[0]), as: key[1] } : { at: this.indexOf(key), as: key } }
  indexesAt(keys) { return keys.map(Labels.prototype.indexAt.bind(this)) }
}