export class Labels extends Array {
  constructor(size) { super(size) }
  indexesOf(keys) { return keys.map(key => this.indexOf(key)) }
  indexAt(key) { return Array.isArray(key) ? { at: this.indexOf(key[0]), as: key[1] } : { at: this.indexOf(key), as: key } }
  indexesAt(keys) { return keys.map(Labels.prototype.indexAt.bind(this)) }
}

export const { indexesOf, indexesAt } = Labels.prototype
