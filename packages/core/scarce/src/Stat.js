import { ACCUM, AVERAGE, COUNT, FIRST, INCRE, LAST, MAX, MIN }                              from '@analys/enum-pivot-mode'
import { IntoAverage, IntoCount, IntoFirst, IntoLast, IntoList, IntoMax, IntoMin, IntoSum } from './intos.js'

export class Stat {
  static of(mode) {
    if (mode === ACCUM) return new IntoList()
    if (mode === AVERAGE) return new IntoAverage()
    if (mode === COUNT) return new IntoCount()
    if (mode === INCRE) return new IntoSum()
    if (mode === MAX) return new IntoMax()
    if (mode === MIN) return new IntoMin()
    if (mode === FIRST) return new IntoFirst()
    if (mode === LAST) return new IntoLast()
    return new IntoList()
  }
}