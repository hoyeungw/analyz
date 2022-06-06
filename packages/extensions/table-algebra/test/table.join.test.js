import { INTERSECT, LEFT, RIGHT, UNION } from '@analys/enum-join-modes'
import { Table }                         from '@analyz/table'
import { decoTable, says }               from '@spare/logger'
import { Algebra }                       from '../src/Algebra'

const MODES = { INTERSECT, LEFT, RIGHT, UNION }
const test = () => {
  const balance = Table.from({
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
  const income = Table.from({
    head: ['symbol', 'rev', 'cost', 'inc', 'date'],
    rows: [
      ['AAPL', 600, 500, 100, '2024'],
      ['AAPL', 500, 420, 80, '2023'],
      ['AAPL', 400, 330, 70, '2022'],
      ['MSFT', 580, 490, 90, '2024'],
      ['MSFT', 480, 400, 80, '2023'],
      ['MSFT', 420, 350, 70, '2022'],
    ],
    title: 'income'
  })

  balance |> decoTable |> says['balance']
  income |> decoTable |> says['income']

  const mode = 'INTERSECT'
  Algebra.joins(MODES[mode], ['date', 'symbol'], null, balance, income, income) |> decoTable |> says['joined'].by(mode)

  '' |> console.log
}

test()

