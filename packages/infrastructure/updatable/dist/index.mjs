class XUpdatable {
  side;
  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  set(key, row) {}

  prepend(row) {}

  append(row) {}

  shift(row) {}

  pop(row) {}

  delete(key) {}

  grow(from, to, as, at) {}

}

class YUpdatable {
  head;
  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  set(key, column) {}

  prepend(column) {}

  append(column) {}

  shift(column) {}

  pop(column) {}

  delete(key) {}

  grow(from, to, as, at) {}

}

export { XUpdatable, YUpdatable };
