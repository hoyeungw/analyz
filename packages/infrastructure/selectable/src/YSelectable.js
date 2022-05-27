import { indexesAt, indexesOf } from '@analyz/mappable'
import { transpose }            from '@vect/matrix-algebra'
import { fitRoll }              from '@vect/vector-index'
import { iterate, mutate }      from '@vect/vector-mapper'
import { keep }                 from '@vect/vector-update'

export class YSelectable {
  head
  rows
  constructor({ head, rows }) { this.head = head, this.rows = rows }

  select(keys) {
    const { head, rows } = this, inds = indexesOf.call(head, keys)
    keep(head, fitRoll(inds)), iterate(rows, row => keep(row, inds))
    return this
  }
  selectAs(keys) {
    const { head, rows } = this, inds = indexesAt.call(this.head, keys), fitInds = fitRoll(inds.map(({ at }) => at))
    head.splice(inds.length)
    mutate(head, (_, i) => inds[i].as), iterate(rows, row => keep(row, fitInds))
    return this
  }
  filterKeys(by) {
    const { head, rows } = this, w = head.length, inds = []
    for (let j = 0; j < w; j++) { if (by(head[j], j)) inds.push(j)}
    keep(head, inds), iterate(rows, row => keep(row, inds))
    return this
  }
  filterKeysBy(xi, by) {
    const { head, rows } = this, columns = transpose(rows), w = head.length, inds = []
    for (let j = 0; j < w; j++) { if (by(columns[j][xi], j)) inds.push(j)}
    keep(head, inds), iterate(rows, row => keep(row, inds))
    return this
  }
  sortKeys(comp) {
    const { head, rows } = this, columns = transpose(rows)
    for (let j = 0; j < head.length; j++) columns[j].key = head[j]
    const newRows = transpose(columns.sort((a, b) => comp(a.key, b.key)))
    mutate(head, (_, j) => columns[j].key)
    mutate(rows, (_, i) => newRows[i])
    return this
  }
  sortKeysBy(xi, comp) {
    const { head, rows } = this, columns = transpose(rows)
    for (let j = 0; j < head.length; j++) columns[j].key = head[j]
    const newRows = transpose(columns.sort((a, b) => comp(a[xi], b[xi])))
    mutate(head, (_, j) => columns[j].key)
    mutate(rows, (_, i) => newRows[i])
    return this
  }
}


