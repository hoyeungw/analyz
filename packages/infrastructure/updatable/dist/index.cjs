'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var columnsUpdate = require('@vect/columns-update');

class XUpdatable {
  /** @type {Array} */
  side;
  /** @type {Array} */

  rows;

  constructor({
    side,
    rows
  }) {
    this.side = side, this.rows = rows;
  }

  set(x, row) {
    if (~(x = this.side.indexOf(x))) {
      this.rows[x] = row;
    }

    return this;
  }

  delete(x) {
    if (~(x = this.side.indexOf(x))) {
      this.side.splice(x, 1), this.rows.splice(x, 1);
    }

    return this;
  }

  prepend(x, row) {
    return this.side.unshift(x), this.rows.unshift(row), this;
  }

  append(x, row) {
    return this.side.push(x), this.rows.push(row), this;
  }

  shift() {
    return [this.side.unshift(), this.rows.shift()];
  }

  pop() {
    return [this.side.pop(), this.rows.pop()];
  }

  grow(from, to, as, at) {
    if (~(from = this.side.indexOf(from)) && ~(at = this.side.indexOf(at))) {
      this.side.splice(at + 1, 0, as);
      this.rows.splice(at + 1, 0, this.rows[from].map(to));
    }

    return this;
  }

}

class YUpdatable {
  /** @type {Array} */
  head;
  /** @type {Array} */

  rows;

  constructor({
    head,
    rows
  }) {
    this.head = head, this.rows = rows;
  }

  set(y, column) {
    if (~(y = this.head.indexOf(y))) for (let i = 0, h = this.rows.length; i < h; i++) {
      this.rows[i][y] = column[i];
    }
    return this;
  }

  delete(y) {
    if (~(y = this.head.indexOf(y))) {
      this.head.splice(y, 1), this.rows.map(row => row.splice(y, 1));
    }

    return this;
  }

  prepend(y, column) {
    return this.head.unshift(y), columnsUpdate.unshift(this.rows, column), this;
  }

  append(y, column) {
    return this.head.push(y), columnsUpdate.push(this.rows, column), this;
  }

  shift() {
    return [this.head.unshift(), columnsUpdate.shift(this.rows)];
  }

  pop() {
    return [this.head.pop(), columnsUpdate.pop(this.rows)];
  }

  grow(from, to, as, at) {
    if (~(from = this.head.indexOf(from)) && ~(at = this.head.indexOf(at))) {
      at++;
      this.head.splice(at, 0, as);
      this.rows.forEach(row => row.splice(at, 0, to(row[from])));
    }

    return this;
  }

}

exports.XUpdatable = XUpdatable;
exports.YUpdatable = YUpdatable;
