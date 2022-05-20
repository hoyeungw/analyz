export class XMappable {
  side
  rows
  constructor({ side, rows }) { this.side = side, this.rows = rows }
  mapKeys(fn) {}
  mutateKeys(fn) {}
  map(keys, fn) {}
  mutate(keys, fn) {}
}