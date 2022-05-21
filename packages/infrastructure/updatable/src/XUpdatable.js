// noinspection CommaExpressionJS

export class XUpdatable {
  /** @type {Array} */ side
  /** @type {Array} */ rows
  constructor({side, rows}) { this.side = side, this.rows = rows }
  set(x, row) {
    if (~(x = this.side.indexOf(x))) { this.rows[x] = row }
    return this
  }
  delete(x) {
    if (~(x = this.side.indexOf(x))) { this.side.splice(x, 1), this.rows.splice(x, 1) }
    return this
  }
  prepend(x, row) { return this.side.unshift(x), this.rows.unshift(row), this }
  append(x, row) { return this.side.push(x), this.rows.push(row), this }
  shift() { return [ this.side.unshift(), this.rows.unshift() ] }
  pop() { return [ this.side.pop(), this.rows.pop() ] }
  grow(from, to, as, at) {
    if (~(from = this.side.indexOf(from)) && ~(at = this.side.indexOf(at))) {
      this.side.splice(at + 1, 0, as)
      this.rows.splice(at + 1, 0, this.rows[from].map(to))
    }
    return this
  }
}
