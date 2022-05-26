import { INTERSECT, LEFT, RIGHT, UNION } from '@analys/enum-join-modes'
import { width }                         from '@vect/matrix-index'
import { difference, merge, merges }     from '@vect/vector-algebra'
import { indexes, iso }                  from '@vect/vector-init'

function isMatch(vecL, vecR, hi) {
  for (let i = 0; i < hi; i++) if (vecL[i] !== vecR[i]) return false
  return true
}

/** @typedef {{key:*[],vector:*[]}} Separated */
export class Rows extends Array {
  constructor(hi) { super(hi) }
  matchRowBy(rowA, hi) { return this.find(rowB => isMatch(rowA, rowB, hi)) }
  matchIndexBy(rowA, hi) { return this.findIndex(rowB => isMatch(rowA, rowB, hi)) }
}

export class Join {
  static make(mode) {
    if (mode === UNION) { return Join.union }
    if (mode === LEFT) { return Join.left }
    if (mode === RIGHT) { return Join.right }
    if (mode === INTERSECT) { return Join.intersect }
    return Join.intersect
  }
  static joinRows(mode, verso, recto, depth, fill) {
    if (mode === UNION) { return Join.union(verso, recto, depth, fill) }
    if (mode === LEFT) { return Join.left(verso, recto, depth, fill) }
    if (mode === RIGHT) { return Join.right(verso, recto, depth, fill) }
    if (mode === INTERSECT) { return Join.intersect(verso, recto, depth, fill) }
    return Join.intersect(verso, recto, depth, fill)
  }
  static intersect(verso, recto, depth, fill) {
    const rows         = [],
          matchRightBy = Rows.prototype.matchRowBy.bind(recto)
    for (let i = 0, ht = verso.length; i < ht; i++) {
      const rowL = verso[i],
            rowR = matchRightBy(rowL, depth)
      if (rowR) rows.push(merge(rowL, rowR.slice(depth)))
    }
    return rows
  }
  static union(verso, recto, depth, fill) {
    const rows         = [],
          indexRightBy = Rows.prototype.matchIndexBy.bind(recto)
    const indsL = [], indsR = []  // matchedIndex for left and right
    for (let indL = 0, htL = verso.length, rowL, indR; indL < htL; indL++) {
      if ((rowL = verso[indL]) && ~(indR = indexRightBy(rowL, depth))) {
        indsL.push(indL), indsR.push(indR)
        rows.push(merge(verso[indL], recto[indR].slice(depth)))
      }
    }
    const wdR = width(recto) - depth
    for (let ind of difference(indexes(verso.length), indsL)) {
      rows.push(merge(verso[ind], iso(wdR, fill)))
    }
    const wdL = width(verso) - depth
    for (let ind of difference(indexes(recto.length), indsR)) {
      rows.push(merges(recto[ind].slice(0, depth), iso(wdL, fill), recto[ind].slice(depth)))
    }
    return rows
  }
  static left(verso, recto, depth, fill) {
    const ht = verso.length, wdR = width(recto) - depth, rows = Array(ht)
    const matchRightBy = Rows.prototype.matchRowBy.bind(recto)
    for (let i = 0; i < ht; i++) {
      const rowL = verso[i],
            rowR = matchRightBy(rowL, depth)
      rows[i] = merge(rowL, rowR?.slice(depth) ?? iso(wdR, fill))
    }
    return rows
  }
  static right(verso, recto, depth, fill) {
    const ht = recto.length, wdL = width(verso) - depth, rows = Array(ht)
    const matchLeftBy = Rows.prototype.matchRowBy.bind(verso)
    for (let i = 0; i < ht; i++) {
      const rowR = recto[i],
            rowL = matchLeftBy(rowR, depth)
      rows[i] = rowL
        ? merge(rowL, rowR.slice(depth))
        : merges(rowR.slice(0, depth), iso(wdL, fill), rowR.slice(depth))
    }
    return rows
  }
}










