import { Table } from '@analyz/table';
import { NUM_ASC } from '@aryth/comparer';
import { separate as separate$1 } from '@vect/columns-select';
import { merge, difference, merges, acquire } from '@vect/vector-algebra';
import { fitRoll, rollTop } from '@vect/vector-index';
import { separate } from '@vect/vector-select';
import { mutazip, zipper } from '@vect/vector-zipper';
import { UNION as UNION$1, LEFT as LEFT$1, RIGHT as RIGHT$1, INTERSECT as INTERSECT$1 } from '@analys/enum-join-modes';
import { width } from '@vect/matrix-index';
import { indexes, iso } from '@vect/vector-init';

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
    if (mode === UNION$1) {
      return Join.union;
    }

    if (mode === LEFT$1) {
      return Join.left;
    }

    if (mode === RIGHT$1) {
      return Join.right;
    }

    if (mode === INTERSECT$1) {
      return Join.intersect;
    }

    return Join.intersect;
  }

  static joinRows(mode, verso, recto, depth, fill) {
    if (mode === UNION$1) {
      return Join.union(verso, recto, depth, fill);
    }

    if (mode === LEFT$1) {
      return Join.left(verso, recto, depth, fill);
    }

    if (mode === RIGHT$1) {
      return Join.right(verso, recto, depth, fill);
    }

    if (mode === INTERSECT$1) {
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
      if (rowR) rows.push(merge(rowL, rowR.slice(depth)));
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
        rows.push(merge(verso[indL], recto[indR].slice(depth)));
      }
    }

    const wdR = width(recto) - depth;

    for (let ind of difference(indexes(verso.length), indsL)) {
      rows.push(merge(verso[ind], iso(wdR, fill)));
    }

    const wdL = width(verso) - depth;

    for (let ind of difference(indexes(recto.length), indsR)) {
      rows.push(merges(recto[ind].slice(0, depth), iso(wdL, fill), recto[ind].slice(depth)));
    }

    return rows;
  }

  static left(verso, recto, depth, fill) {
    const ht = verso.length,
          wdR = width(recto) - depth,
          rows = Array(ht);
    const matchRightBy = Rows.prototype.matchRowBy.bind(recto);

    for (let i = 0; i < ht; i++) {
      const rowL = verso[i],
            rowR = matchRightBy(rowL, depth);
      rows[i] = merge(rowL, (rowR === null || rowR === void 0 ? void 0 : rowR.slice(depth)) ?? iso(wdR, fill));
    }

    return rows;
  }

  static right(verso, recto, depth, fill) {
    const ht = recto.length,
          wdL = width(verso) - depth,
          rows = Array(ht);
    const matchLeftBy = Rows.prototype.matchRowBy.bind(verso);

    for (let i = 0; i < ht; i++) {
      const rowR = recto[i],
            rowL = matchLeftBy(rowR, depth);
      rows[i] = rowL ? merge(rowL, rowR.slice(depth)) : merges(rowR.slice(0, depth), iso(wdL, fill), rowR.slice(depth));
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
    const indsL = (_keys$map = keys.map(x => verso.head.indexOf(x)), fitRoll(_keys$map)),
          indsR = (_keys$map2 = keys.map(x => recto.head.indexOf(x)), fitRoll(_keys$map2));
    const headL = rollTop(verso.head.slice(), indsL),
          rowsL = verso.rows.map(row => rollTop(row === null || row === void 0 ? void 0 : row.slice(), indsL));
    const headR = rollTop(recto.head.slice(), indsR),
          rowsR = recto.rows.map(row => rollTop(row === null || row === void 0 ? void 0 : row.slice(), indsR));
    return Table.build(merge(headL, headR.slice(keys.length)), Join.joinRows(mode, rowsL, rowsR, keys.length, fill), `${verso.title} ${recto.title}`);
  }

  static joins(mode, keys, fill, ...tables) {
    return tables.reduce((joined, nextTable) => Algebra.join(mode, keys, fill, joined, nextTable));
  }

  static separate(table, keys) {
    const selected = Table.build(),
          remained = Table.build();
    const {
      head,
      rows
    } = table;
    const inds = keys.map(key => head.indexOf(key)).sort(NUM_ASC);
    [selected.head, remained.head] = separate(head, inds);
    [selected.rows, remained.rows] = separate$1(rows, inds);
    return [selected, remained];
  }
  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */


  static acquire(table, another) {
    acquire(table.head, another.head);
    mutazip(table.rows, another.rows, (va, vb) => acquire(va, vb));
    return table;
  }
  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */


  static merge(table, another) {
    const head = merge(table.head, another.head);
    const rows = zipper(table.rows, another.rows, (va, vb) => merge(va, vb));
    return Table.build(head, rows);
  }

}

const INTERSECT = -1,
      UNION = 0,
      LEFT = 1,
      RIGHT = 2;

export { Algebra, INTERSECT, LEFT, RIGHT, UNION };
