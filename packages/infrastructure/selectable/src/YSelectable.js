import { select }    from '@vect/columns-select'
import { transpose } from '@vect/matrix-algebra'
import { zipper }    from '@vect/vector-zipper'
import { Labels }    from './Labels'

export class YSelectable {
  head
  rows
  constructor({head, rows}) { this.head = head, this.rows = rows }
  select(keys) {
    const ys = Labels.prototype.indexesAt.call(this.head, keys)
    return new YSelectable({head: ys.map(({as}) => as), rows: select(this.rows, ys.map(({at}) => at))})
  }
  filter(options) {}
  distinct(labels) {}
  sort(comp) {
    const li = zipper(this.head, transpose(this.rows), (key, col) => ({key, col}))
    li.sort((a, b) => comp(a.key, b.key))
    return new YSelectable({head: li.map(({key}) => key), rows: transpose(li.map(({col}) => col))})
  }
  sortOn(xi, comp) {
    const li = zipper(this.head, transpose(this.rows), (key, col) => ({x: col[xi], key, col}))
    li.sort((a, b) => comp(a.x, b.x))
    return new YSelectable({head: li.map(({key}) => key), rows: transpose(li.map(({col}) => col))})
  }
}


