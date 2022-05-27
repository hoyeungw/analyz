import { ACCUM, AVERAGE, COUNT, FIRST, INCRE, LAST, MAX, MIN }                              from '@analys/enum-pivot-mode'
import { CrosAverage, CrosCount, CrosFirst, CrosLast, CrosList, CrosMax, CrosMin, CrosSum } from './extensions'

export class Stat {
  static of(mode) {
    if (mode === ACCUM) return new CrosList()
    if (mode === AVERAGE) return new CrosAverage()
    if (mode === COUNT) return new CrosCount()
    if (mode === INCRE) return new CrosSum()
    if (mode === MAX) return new CrosMax()
    if (mode === MIN) return new CrosMin()
    if (mode === FIRST) return new CrosFirst()
    if (mode === LAST) return new CrosLast()
    return new CrosList()
  }
}