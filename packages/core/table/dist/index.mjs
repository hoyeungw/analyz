import { Headward } from '@analyz/crostab';

class Table extends Headward {
  title;

  constructor(table) {
    super(table);
    this.title = table === null || table === void 0 ? void 0 : table.title;
  }

}

export { Table };
