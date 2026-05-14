const boards = [
  [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'X'],
  ],
  [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['O', 'X', 'O'],
  ],
  [
    ['X', 'O', 'X'],
    ['O', 'O', 'O'],
    ['O', 'X', 'X'],
  ],
  [
    ['X', 'O', 'X'],
    ['O', 'O', 'X'],
    ['X', 'X', 'O'],
  ],
]

const winningCombinations = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
]


function getTicTacToeWinner(board) {

  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board[a[0]][a[1]] !== board[b[0]][b[1]] || board[a[0]][a[1]] !== board[c[0]][c[1]]) {
      continue
    }

    const winner = board[a[0]][a[1]]
    /**
     * https://en.wikipedia.org/wiki/ANSI_escape_code
     * Hier hebben de characters volgende betekenis:
     *
     * - `\x1b[`: Dit is het escape character dat aangeeft dat er een speciale opmaakcode volgt.
     * - `1;32m`: Dit zijn de opmaakcodes, waarbij `1` staat voor vetgedrukt en `32` voor groene tekst.
     *    De `m` geeft aan dat het voorgaande styling definieert.
     * - `\x1b[0m`: Dit reset de opmaak naar de standaardinstellingen, zodat de volgende tekst terug de normale opmaak
     *   heeft.
     */
    board[a[0]][a[1]] = `\x1b[1;32m${winner}\x1b[0m`
    board[b[0]][b[1]] = `\x1b[1;32m${winner}\x1b[0m`
    board[c[0]][c[1]] = `\x1b[1;32m${winner}\x1b[0m`
    return [winner, board]
  }
  return [undefined, board]
}

for (const board of boards) {
  const [winner, validatedBoard] = getTicTacToeWinner(board)
  console.log(winner ? `De ${winner} speler heeft gewonnen in onderstaand bord:` : 'Er is geen winnaar in onderstaand bord:')
  console.table(validatedBoard)
}
