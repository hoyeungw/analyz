import { transpose } from '@vect/matrix-algebra'
import { select }    from '@vect/vector-select'
import { zipper }    from '@vect/vector-zipper'
import { Labels }    from '@analyz/mappable'

export class XSelectable {
  side
  rows
  constructor({side, rows}) { this.side = side, this.rows = rows }
  select(keys) {
    const xs = Labels.prototype.indexesAt.call(this.side, keys)
    this.head = xs.map(({as}) => as), this.rows = select(this.rows, xs.map(({at}) => at))
    return this
    // return new XSelectable({head: xs.map(({as}) => as), rows: select(this.rows, xs.map(({at}) => at))})
  }
  filter(x, by) {
    const xi = this.side.indexOf(x)
    const columns = transpose(this.rows).filter(col => by(col[xi]))
    this.rows = transpose(columns)
    return this
    // return new XSelectable({side: this.side.slice(), rows: transpose(columns)})
  }
  sortKeys(comp) {
    const list = zipper(this.side, this.rows, (key, row) => ({key, row}))
    list.sort((a, b) => comp(a.key, b.key))
    this.side = list.map(({key}) => key), this.rows = list.map(({row}) => row)
    return this
    // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }
  sortKeysBy(yi, comp) {
    const list = zipper(this.side, this.rows, (key, row) => ({y: row[yi], key, row}))
    list.sort((a, b) => comp(a.y, b.y))
    this.side = list.map(({key}) => key), this.rows = list.map(({row}) => row)
    return this
    // return new XSelectable({side: list.map(({key}) => key), rows: list.map(({row}) => row)})
  }
}