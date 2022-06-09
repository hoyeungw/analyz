import { gather } from '@vect/vector-init'

export class Flatward {
  head
  rows
  constructor(head, rows) {
    this.head = head
    this.rows = rows
  }
  static build(head, rows) { return new Flatward(head, rows) }
  static from(o = {}) { return new Flatward(o.head, o.rows) }

  matrix() { return this.rowsIndexed() |> gather }

  * rowsIndexed() {
    yield this.head
    for (let i = 0, h = this.rows.length; i < h; i++) yield this.rows[i]
  }
  * columnsIndexed() {
    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j)
  }
  * columnIndexed(yi) {
    yield this.head[yi]
    for (let i = 0, h = this.rows.length; i < h; i++) yield this[i][yi]
  }
}