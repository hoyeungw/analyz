'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var table = require('@analyz/table');
var comparer = require('@aryth/comparer');
var columnsSelect = require('@vect/columns-select');
var vectorAlgebra = require('@vect/vector-algebra');
var vectorIndex = require('@vect/vector-index');
var vectorSelect = require('@vect/vector-select');
var vectorZipper = require('@vect/vector-zipper');
var enumJoinModes = require('@analys/enum-join-modes');
var matrixIndex = require('@vect/matrix-index');
var vectorInit = require('@vect/vector-init');

function isMatch(vecL, vecR, hi) {
  for (let i = 0; i < hi; i++) if (vecL[i] !== vecR[i]) return false;

  return true;
}
/** @typedef {{key:*[],vector:*[]}} Separated */


class Rows extends Array {
  constructor(hi) {
    super(hi);
  }

  matchRowBy(rowA, hi) {
    return this.find(rowB => isMatch(rowA, rowB, hi));
  }

  matchIndexBy(rowA, hi) {
    return this.findIndex(rowB => isMatch(rowA, rowB, hi));
  }

}
class Join {
  static make(mode) {
    if (mode === enumJoinModes.UNION) {
      return Join.union;
    }

    if (mode === enumJoinModes.LEFT) {
      return Join.left;
    }

    if (mode === enumJoinModes.RIGHT) {
      return Join.right;
    }

    if (mode === enumJoinModes.INTERSECT) {
      return Join.intersect;
    }

    return Join.intersect;
  }

  static joinRows(mode, verso, recto, depth, fill) {
    if (mode === enumJoinModes.UNION) {
      return Join.union(verso, recto, depth, fill);
    }

    if (mode === enumJoinModes.LEFT) {
      return Join.left(verso, recto, depth, fill);
    }

    if (mode === enumJoinModes.RIGHT) {
      return Join.right(verso, recto, depth, fill);
    }

    if (mode === enumJoinModes.INTERSECT) {
      return Join.intersect(verso, recto, depth, fill);
    }

    return Join.intersect(verso, recto, depth, fill);
  }

  static intersect(verso, recto, depth, fill) {
    const rows = [],
          matchRightBy = Rows.prototype.matchRowBy.bind(recto);

    for (let i = 0, ht = verso.length; i < ht; i++) {
      const rowL = verso[i],
            rowR = matchRightBy(rowL, depth);
      if (rowR) rows.push(vectorAlgebra.merge(rowL, rowR.slice(depth)));
    }

    return rows;
  }

  static union(verso, recto, depth, fill) {
    const rows = [],
          indexRightBy = Rows.prototype.matchIndexBy.bind(recto);
    const indsL = [],
          indsR = []; // matchedIndex for left and right

    for (let indL = 0, htL = verso.length, rowL, indR; indL < htL; indL++) {
      if ((rowL = verso[indL]) && ~(indR = indexRightBy(rowL, depth))) {
        indsL.push(indL), indsR.push(indR);
        rows.push(vectorAlgebra.merge(verso[indL], recto[indR].slice(depth)));
      }
    }

    const wdR = matrixIndex.width(recto) - depth;

    for (let ind of vectorAlgebra.difference(vectorInit.indexes(verso.length), indsL)) {
      rows.push(vectorAlgebra.merge(verso[ind], vectorInit.iso(wdR, fill)));
    }

    const wdL = matrixIndex.width(verso) - depth;

    for (let ind of vectorAlgebra.difference(vectorInit.indexes(recto.length), indsR)) {
      rows.push(vectorAlgebra.merges(recto[ind].slice(0, depth), vectorInit.iso(wdL, fill), recto[ind].slice(depth)));
    }

    return rows;
  }

  static left(verso, recto, depth, fill) {
    const ht = verso.length,
          wdR = matrixIndex.width(recto) - depth,
          rows = Array(ht);
    const matchRightBy = Rows.prototype.matchRowBy.bind(recto);

    for (let i = 0; i < ht; i++) {
      const rowL = verso[i],
            rowR = matchRightBy(rowL, depth);
      rows[i] = vectorAlgebra.merge(rowL, (rowR === null || rowR === void 0 ? void 0 : rowR.slice(depth)) ?? vectorInit.iso(wdR, fill));
    }

    return rows;
  }

  static right(verso, recto, depth, fill) {
    const ht = recto.length,
          wdL = matrixIndex.width(verso) - depth,
          rows = Array(ht);
    const matchLeftBy = Rows.prototype.matchRowBy.bind(verso);

    for (let i = 0; i < ht; i++) {
      const rowR = recto[i],
            rowL = matchLeftBy(rowR, depth);
      rows[i] = rowL ? vectorAlgebra.merge(rowL, rowR.slice(depth)) : vectorAlgebra.merges(rowR.slice(0, depth), vectorInit.iso(wdL, fill), rowR.slice(depth));
    }

    return rows;
  }

}

/** @typedef {{head:*[],rows:*[][]}} TableLike */

class Algebra {
  /**
   * @param {number} [mode=-1] - union:0,left:1,right:2,intersect:-1
   * @param {string[]} keys
   * @param {*} [fill]
   * @param {Table|TableLike} verso
   * @param {Table|TableLike} recto
   * @returns {Table|TableLike}
   */
  static join(mode, keys, fill, verso, recto) {
    var _recto$head, _recto$rows, _verso$head, _verso$rows, _keys$map, _keys$map2;

    if (!(recto !== null && recto !== void 0 && (_recto$head = recto.head) !== null && _recto$head !== void 0 && _recto$head.length) || !(recto !== null && recto !== void 0 && (_recto$rows = recto.rows) !== null && _recto$rows !== void 0 && _recto$rows.length)) return verso;
    if (!(verso !== null && verso !== void 0 && (_verso$head = verso.head) !== null && _verso$head !== void 0 && _verso$head.length) || !(verso !== null && verso !== void 0 && (_verso$rows = verso.rows) !== null && _verso$rows !== void 0 && _verso$rows.length)) return null;
    const indsL = (_keys$map = keys.map(x => verso.head.indexOf(x)), vectorIndex.fitRoll(_keys$map)),
          indsR = (_keys$map2 = keys.map(x => recto.head.indexOf(x)), vectorIndex.fitRoll(_keys$map2));
    const headL = vectorIndex.rollTop(verso.head.slice(), indsL),
          rowsL = verso.rows.map(row => vectorIndex.rollTop(row === null || row === void 0 ? void 0 : row.slice(), indsL));
    const headR = vectorIndex.rollTop(recto.head.slice(), indsR),
          rowsR = recto.rows.map(row => vectorIndex.rollTop(row === null || row === void 0 ? void 0 : row.slice(), indsR));
    return table.Table.build(vectorAlgebra.merge(headL, headR.slice(keys.length)), Join.joinRows(mode, rowsL, rowsR, keys.length, fill), `${verso.title} ${recto.title}`);
  }

  static joins(mode, keys, fill, ...tables) {
    return tables.reduce((joined, nextTable) => Algebra.join(mode, keys, fill, joined, nextTable));
  }

  static separate(table$1, keys) {
    const selected = table.Table.build(),
          remained = table.Table.build();
    const {
      head,
      rows
    } = table$1;
    const inds = keys.map(key => head.indexOf(key)).sort(comparer.NUM_ASC);
    [selected.head, remained.head] = vectorSelect.separate(head, inds);
    [selected.rows, remained.rows] = columnsSelect.separate(rows, inds);
    return [selected, remained];
  }
  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */


  static acquire(table, another) {
    vectorAlgebra.acquire(table.head, another.head);
    vectorZipper.mutazip(table.rows, another.rows, (va, vb) => vectorAlgebra.acquire(va, vb));
    return table;
  }
  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */


  static merge(table$1, another) {
    const head = vectorAlgebra.merge(table$1.head, another.head);
    const rows = vectorZipper.zipper(table$1.rows, another.rows, (va, vb) => vectorAlgebra.merge(va, vb));
    return table.Table.build(head, rows);
  }

}

const INTERSECT = -1,
      UNION = 0,
      LEFT = 1,
      RIGHT = 2;

exports.Algebra = Algebra;
exports.INTERSECT = INTERSECT;
exports.LEFT = LEFT;
exports.RIGHT = RIGHT;
exports.UNION = UNION;
