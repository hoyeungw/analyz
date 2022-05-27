import { DynamicCrostab, Crostab } from '@analyz/crostab';

function* indexedOf(sparse) {
  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      yield [x, y, row[y]];
    }
  }
}

function* indexedBy(sparse, by) {
  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      const v = row[y];
      if (by(x, y, v)) yield [x, y, v];
    }
  }
}

function* indexed(sparse, by, to) {
  if (!to) {
    return yield* !by ? indexedOf(sparse) : indexedBy(sparse, by);
  }

  let row;

  for (let x in sparse) {
    for (let y in row = sparse[x]) {
      const v = row[y];
      if (by(x, y, v)) yield to(x, y, v);
    }
  }
} // public field is not allowed to be assigned to Sparse instance

const sparseToCrostab = (sparse, element) => {
  const crostab = DynamicCrostab.build(element);

  for (let [x, y, v] of indexed(sparse)) crostab.update(x, y, v);

  return Crostab.from(crostab);
};

export { sparseToCrostab };
