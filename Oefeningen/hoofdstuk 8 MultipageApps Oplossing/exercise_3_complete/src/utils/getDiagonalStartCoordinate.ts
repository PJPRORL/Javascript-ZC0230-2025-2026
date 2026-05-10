import type {Position} from '../boardgame/types/gamePiece.ts'

/**
 * Calculate the starting coordinates of the main (\) and anti (/) diagonals that pass through the given cell.
 * This coordinates starts at the bottom of the board, and thus at the highest possible row index.
 *
 * @param row The row coordinate of the cell for which the diagonals must be calculated.
 * @param column The column coordinate of the cell for which the diagonals must be calculated.
 * @param size The total number of rows (or columns) of the n x n board.
 */
export function getDiagonalStartCoordinates(row: number, column: number, size: number): [Position, Position] {
    const maxIndex = size - 1

    // The \ diagonal.
    const mainDelta = Math.min(maxIndex - row, maxIndex - column)
    const mainStart: Position = [row + mainDelta, column + mainDelta]

    // The / diagonal.
    const antiDelta = Math.min(maxIndex - row, column)
    const antiStart: Position = [row + antiDelta, column - antiDelta]

    return [mainStart, antiStart]
}
