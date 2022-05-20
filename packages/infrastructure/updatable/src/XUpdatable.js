export class XUpdatable {
  side
  rows
  constructor({ side, rows }) { this.side = side, this.rows = rows }
  set(key, row) {}
  prepend(row) {}
  append(row) {}
  shift(row) {}
  pop(row) {}
  delete(key) {}
  grow(from, to, as, at) {}
}
