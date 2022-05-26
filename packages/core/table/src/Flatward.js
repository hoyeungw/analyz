export class Flatward {
  head
  rows
  constructor({head, rows}) {
    this.head = head
    this.rows = rows
  }
  static from(table) { return new Flatward(table) }

  * rowsIndexed() {
    yield this.head
    for (let i = 0, h = this.side.length; i < h; i++) yield this.rows[i]
  }
  * columnsIndexed() {
    yield this.sideIndexed()
    for (let j = 0, w = this.head.length; j < w; j++) yield this.columnIndexed(j)
  }
  * columnIndexed(yi) {
    yield this.head[yi]
    for (let i = 0, h = this.rows.length; i < h; i++) yield this[i][yi]
  }
}