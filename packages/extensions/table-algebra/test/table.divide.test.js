import { Table }           from '@analyz/table'
import { decoTable, says } from '@spare/logger'
import { Algebra }         from '../src/Algebra'

const table = Table.from({
  head: ['date', 'symbol', 'ast', 'liab', 'eqt'],
  rows: [
    ['2025', 'AAPL', 1000, 500, 500],
    ['2024', 'AAPL', 800, 500, 300],
    ['2023', 'AAPL', 700, 450, 250],
    ['2025', 'MSFT', 900, 300, 600],
    ['2024', 'MSFT', 780, 280, 500],
    ['2023', 'MSFT', 710, 260, 450],
  ],
  title: 'balance'
})

const keys = ['symbol', 'liab']

const [selected, remained] = Algebra.separate(table, keys)
selected |> decoTable |> says['pick from included']
remained |> decoTable |> says['remained from included']
