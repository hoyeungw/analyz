import { select }    from '@vect/columns-select'
import { transpose } from '@vect/matrix-algebra'
import { zipper }    from '@vect/vector-zipper'
import { Labels }    from '@analyz/mappable'

export class YSelectable {
  head
  rows
  constructor({head, rows}) { this.head = head, this.rows = rows }
  select(keys) {
    const ys = Labels.prototype.indexesAt.call(this.head, keys)
    this.head = ys.map(({as}) => as), this.rows = select(this.rows, ys.map(({at}) => at))
    return this
    // return new YSelectable({head: ys.map(({as}) => as), rows: select(this.rows, ys.map(({at}) => at))})
  }
  filter(y, by) {
    const yi = this.head.indexOf(y)
    this.rows = this.rows.filter(row => by(row[yi]))
    return this
    // return new YSelectable({side: this.head.slice(), rows: this.rows.filter(row => by(row[yi]))})
  }
  sortKeys(comp) {
    const list = zipper(this.head, transpose(this.rows), (key, col) => ({key, col}))
    list.sort((a, b) => comp(a.key, b.key))
    this.head = list.map(({key}) => key), this.rows = transpose(list.map(({col}) => col))
    return this
    // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }
  sortKeysBy(xi, comp) {
    const list = zipper(this.head, transpose(this.rows), (key, col) => ({x: col[xi], key, col}))
    list.sort((a, b) => comp(a.x, b.x))
    this.head = list.map(({key}) => key), this.rows = transpose(list.map(({col}) => col))
    return this
    // return new YSelectable({head: list.map(({key}) => key), rows: transpose(list.map(({col}) => col))})
  }
}


