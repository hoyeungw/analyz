import { Table }                      from '@analyz/table'
import { NUM_ASC }                    from '@aryth/comparer'
import { separate as separateMatrix } from '@vect/columns-select'
import { acquire, merge }             from '@vect/vector-algebra'
import { fitRoll, rollTop }           from '@vect/vector-index'
import { separate as separateVector } from '@vect/vector-select'
import { mutazip, zipper }            from '@vect/vector-zipper'
import { Join }                       from './Join.js'

/** @typedef {{head:*[],rows:*[][]}} TableLike */

export class Algebra {
  /**
   * @param {number} [mode=-1] - union:0,left:1,right:2,intersect:-1
   * @param {string[]} keys
   * @param {*} [fill]
   * @param {Table|TableLike} verso
   * @param {Table|TableLike} recto
   * @returns {Table|TableLike}
   */
  static join(mode, keys, fill, verso, recto) {
    if (!recto?.head?.length || !recto?.rows?.length) return verso
    if (!verso?.head?.length || !verso?.rows?.length) return null
    const indsL = fitRoll(keys.map(x => verso.head.indexOf(x))),
          indsR = fitRoll(keys.map(x => recto.head.indexOf(x)))
    const headL = rollTop(verso.head.slice(), indsL), rowsL = verso.rows.map(row => rollTop(row?.slice(), indsL))
    const headR = rollTop(recto.head.slice(), indsR), rowsR = recto.rows.map(row => rollTop(row?.slice(), indsR))
    return Table.build(
      merge(headL, headR.slice(keys.length)),
      Join.joinRows(mode, rowsL, rowsR, keys.length, fill),
      `${verso.title} ${recto.title}`
    )
  }
  static joins(mode, keys, fill, ...tables) {
    return tables.reduce((joined, nextTable) => Algebra.join(mode, keys, fill, joined, nextTable))
  }
  static separate(table, keys) {
    const selected = Table.build(), remained = Table.build()
    const { head, rows } = table
    const inds = keys.map(key => head.indexOf(key)).sort(NUM_ASC);
    ([selected.head, remained.head] = separateVector(head, inds));
    ([selected.rows, remained.rows] = separateMatrix(rows, inds))
    return [selected, remained]
  }

  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */
  static acquire(table, another) {
    acquire(table.head, another.head)
    mutazip(table.rows, another.rows, (va, vb) => acquire(va, vb))
    return table
  }

  /**
   * @param {Table|TableLike} table
   * @param {Table|TableLike} another
   * @returns {Table|TableLike}
   */
  static merge(table, another) {
    const head = merge(table.head, another.head)
    const rows = zipper(table.rows, another.rows, (va, vb) => merge(va, vb))
    return Table.build(head, rows)
  }
}
