export class YUpdatable {
  head
  rows
  constructor({ head, rows }) { this.head = head, this.rows = rows }
  set(key, column) {}
  prepend(column) {}
  append(column) {}
  shift(column) {}
  pop(column) {}
  delete(key) {}
  grow(from, to, as, at) {}
}