import { deco, logger } from '@spare/logger'
import { Scarce }       from '../src/Scarce.js'

const kvs = [
  ['a', 1],
  ['a', 2],
  ['a', 3],
  ['b', 1],
  ['b', 2],
  ['c', 1],
]

const scarce = Scarce.build().collect(kvs)
scarce |> deco |> logger

