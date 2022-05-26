import { says }     from '@spare/xr'
import { gather }   from '@vect/vector-init'
import { Flatward } from '../src/Flatward'

const crostab = new Flatward({
  side: [ 'A', 'B', 'C', 'D', 'E' ],
  head: [ 'a', 'b', 'c', 'd' ],
  rows: [
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
    [ 0, 1, 2, 3 ],
  ]
})

for (let column of crostab.columnsIndexed()) {
  column |> gather |> says['column']
}

for (let row of crostab.rowsIndexed()) {
  row |> gather |> says['column']
}
