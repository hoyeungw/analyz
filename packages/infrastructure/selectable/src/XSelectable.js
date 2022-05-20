import { select } from '@vect/vector-select'
import { zipper } from '@vect/vector-zipper'
import { Labels } from './Labels'

export class XSelectable {
  side
  rows
  constructor({side, rows}) { this.side = side, this.rows = rows }
  select(keys) {
    const xs = Labels.prototype.indexesAt.call(this.side, keys)
    return new XSelectable({head: xs.map(({as}) => as), rows: select(this.rows, xs.map(({at}) => at))})
  }
  filter(options) {}
  distinct(labels) {}
  sort(comp) {
    const li = zipper(this.side, this.rows, (key, row) => ({key, row}))
    li.sort((a, b) => comp(a.key, b.key))
    return new XSelectable({side: li.map(({key}) => key), rows: li.map(({row}) => row)})
  }
  sortOn(yi, comp) {
    const li = zipper(this.side, this.rows, (key, row) => ({y: row[yi], key, row}))
    li.sort((a, b) => comp(a.y, b.y))
    return new XSelectable({side: li.map(({key}) => key), rows: li.map(({row}) => row)})
  }
}