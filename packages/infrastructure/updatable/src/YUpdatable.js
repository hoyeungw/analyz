export class YUpdatable {
  /** @type {Array} */ head
  /** @type {Array} */ rows
  constructor({head, rows}) { this.head = head, this.rows = rows }
  set(y, column) {
    if (~(y = this.head.indexOf(y))) for (let i = 0, h = this.rows.length; i < h; i++) { this.rows[i][y] = column[i] }
    return this
  }
  delete(y) {
    if (~(y = this.head.indexOf(y))) { this.head.splice(y, 1), this.rows.map(row => row.splice(y, 1)) }
    return this
  }
  prepend(y, column) { return this.head.unshift(y), this.rows.unshift(column), this }
  append(y, column) { return this.head.push(y), this.rows.push(column), this }
  shift() { return [ this.head.unshift(), this.rows.unshift() ] }
  pop() { return [ this.head.pop(), this.rows.pop() ] }
  grow(from, to, as, at) {
    if (~(from = this.head.indexOf(from)) && ~(at = this.head.indexOf(at))) {
      at++
      this.head.splice(at, 0, as)
      this.rows.forEach(row => row.splice(at, 0, to(row[from])))
    }
    return this
  }
}
