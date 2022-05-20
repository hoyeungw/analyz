export class YMappable {
  head
  rows
  constructor({ head, rows }) { this.head = head, this.rows = rows }
  mapKeys(fn) {}
  mutateKeys(fn) {}
  map(keys, fn) {}
  mutate(keys, fn) {}
}