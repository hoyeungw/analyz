class XMappable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  mapKeys(fn) {}

  mutateKeys(fn) {}

  map(keys, fn) {}

  mutate(keys, fn) {}

}

class YMappable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  mapKeys(fn) {}

  mutateKeys(fn) {}

  map(keys, fn) {}

  mutate(keys, fn) {}

}

export { XMappable, YMappable };