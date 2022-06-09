import { gather } from '@vect/vector-init'

export class Flatward {
  side
  head
  rows
  title
  constructor(side, head, rows, title) {
    this.side = side ?? []
    this.head = head ?? []
    this.rows = rows ?? []
    this.title = title
  }
  static from(o = {}) { return new Flatward(o.side, o.head, o.rows, o.title) }
  static build(side, head, rows, title) { return new Flatward(side, head, rows, title) }
  matrix() {
    const rows = []
    for (let row of this.rowsIndexed()) { rows.push(gather(row))}
    return rows
  }
  * rowsIndexed() {
    yield this.headIndexed()
    for (let i = 0, h = this.side.length; i < h; i++) yield this.rowIndexed(i)
  }
  * columnsIndexed() {
    yield this.sideIndexed()
    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j)
  }
  * headIndexed() {
    yield this.title
    yield* this.head
  }
  * sideIndexed() {
    yield this.title
    yield* this.side
  }
  * rowIndexed(xi) {
    yield this.side[xi]
    yield* this.rows[xi]
  }
  * columnIndexed(yi) {
    yield this.head[yi]
    for (let i = 0, h = this.rows.length; i < h; i++) yield this.rows[i][yi]
  }
}