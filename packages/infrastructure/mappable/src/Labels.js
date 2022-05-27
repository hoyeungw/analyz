export class Labels extends Array {
  constructor(size) { super(size) }
  indexesOf(keys) {
    let inds = [], i
    for (let key of keys) if (~(i = this.indexOf(key))) inds.push(i)
    return inds
  }
  indexAt(key) {
    let at, from, as
    return Array.isArray(key)
      ? ([ from, as ] = key) && ~(at = this.indexOf(from)) ? { at, as } : null
      : (from = key, as = key) && ~(at = this.indexOf(from)) ? { at, as } : null
  }
  indexesAt(keys) {
    let inds = [], info, { indexAt } = Labels.prototype
    for (let key of keys) if ((info = indexAt.call(this, key))) inds.push(info)
    return inds
  }
}

export const { indexesOf, indexesAt } = Labels.prototype
