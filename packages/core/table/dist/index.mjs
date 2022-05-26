import { Headward } from '@analyz/crostab';

const shallow = mx => mx.map(r => r.slice());

class Table extends Headward {
  title;

  constructor(table) {
    super(table);
    this.title = table === null || table === void 0 ? void 0 : table.title;
  }

  static from(o = {}) {
    return new Table(o);
  }

  slice() {
    let {
      head,
      rows,
      title
    } = this;
    return new Table({
      head: head.slice(),
      rows: shallow(rows),
      title
    });
  }

}

export { Table };
