import { indexesAt, indexesOf } from '@analyz/mappable'
import { fitRoll }              from '@vect/vector-index'
import { mutate }               from '@vect/vector-mapper'
import { keep }                 from '@vect/vector-update'

export class XSelectable {
  side
  rows
  constructor({ side, rows }) { this.side = side, this.rows = rows }

  select(keys) {
    const { side, rows } = this, inds = indexesOf.call(side, keys)
    keep(side, fitRoll(inds)), keep(rows, inds)
    return this
  }
  selectAs(keys) {
    const { side, rows } = this, inds = indexesAt.call(this.side, keys)
    side.splice(inds.length)
    mutate(side, (_, i) => inds[i].as), keep(rows, fitRoll(inds.map(({ at }) => at)))
    return this
  }
  filterKeys(by) {
    const { side, rows } = this, h = rows.length, inds = []
    for (let i = 0; i < h; i++) { if (by(side[i], i)) inds.push(i)}
    keep(side, inds), keep(rows, inds)
    return this
  }
  filterKeysBy(yi, by) {
    const { side, rows } = this, h = rows.length, inds = []
    for (let i = 0; i < h; i++) { if (by(rows[i][yi], i)) inds.push(i)}
    keep(side, inds), keep(rows, inds)
    return this
  }
  sortKeys(comp) {
    const { side, rows } = this, h = rows.length
    for (let i = 0; i < h; i++) { rows[i].key = side[i] }
    rows.sort((a, b) => comp(a.key, b.key))
    for (let i = 0; i < h; i++) { side[i] = rows[i].key, (delete rows[i].key) }
    return this
  }
  sortKeysBy(yi, comp) {
    const { side, rows } = this, h = rows.length
    for (let i = 0; i < h; i++) { rows[i].key = side[i] }
    rows.sort((a, b) => comp(a[yi], b[yi]))
    for (let i = 0; i < h; i++) { side[i] = rows[i].key, (delete rows[i].key) }
    return this
  }
}