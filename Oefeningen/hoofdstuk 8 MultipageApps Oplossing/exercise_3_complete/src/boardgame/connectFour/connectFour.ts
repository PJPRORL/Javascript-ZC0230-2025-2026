import {getDiagonalStartCoordinates} from '../../utils/getDiagonalStartCoordinate.ts'
import {BoardGame, type GameBoard, type Move, type SpecificBoardGameConstructor} from '../types/boardGame.ts'
import type {Player} from '../types/gamePiece.ts'
import {Red} from './red.ts'
import {Yellow} from './yellow.ts'

export class ConnectFour extends BoardGame {
    #computer = new Red('Computer')
    #player = new Yellow('Player')
    #remainingMoves: number
    #lastMoves: Map<GameBoard, Move | null> = new Map()

    constructor(params: SpecificBoardGameConstructor) {
        const size = 7
        super({...params, size})
        this.#remainingMoves = size * size
    }

    applyMove(move: Move, board: GameBoard = this.board): void {
        const {
            to: [row, col],
            piece,
        } = move
        this.#lastMoves.set(board, move)

        board[row]![col] = piece

        if (this.board !== board) return

        this.#remainingMoves--

        if (this.#remainingMoves === 0) {
            this.state = 'Draw'
        }

        // Clear to ensure that there is no excessive memory usage.
        // Echt move in the search tree generates a new board, so the map can get
        // quite large.
        this.#lastMoves.clear()
        this.#lastMoves.set(board, move)

        super.applyMove(move, board)
    }

    readMove(i: number, j: number): void {
        const move: Move = {
            to: [i, j],
            piece: this.#player,
        }

        if (this.isValidMove(move)) {
            this.applyMove(move)
        }
    }

    isValidMove(move: Move, board: GameBoard = this.board): boolean {
        const [row, col] = move.to
        const isEmpty = board[row][col] === null
        const isBottomRow = row === this.size - 1 || board[row + 1][col] !== null
        return isEmpty && isBottomRow
    }

    getAvailableMoves(player: Player, board: GameBoard = this.board): Move[] {
        if (this.getWinner(board)) return []

        const moves: Move[] = []
        columnloop: for (let col = 0; col < this.size; col++) {
            for (let row = this.size - 1; row >= 0; row--) {
                const move: Move = {
                    piece: player === 'Computer' ? this.#computer : this.#player,
                    to: [row, col],
                }

                if (this.isValidMove(move, board)) {
                    moves.push(move)
                    // If this is the first valid move in the column, all higher cells must be invalid.
                    continue columnloop
                }
            }
        }
        return moves
    }

    getWinner(board: GameBoard = this.board): Player | undefined {
        const lastMove = this.#lastMoves.get(board)
        if (!lastMove) return undefined
        const [row, col] = lastMove.to

        const [mainStart, antiStart] = getDiagonalStartCoordinates(row, col, board.length)

        const consecutive = Math.max(
            // Horizontal
            this.checkAxis(board, row, 0, 0, this.size - 1),
            // Vertical
            this.checkAxis(board, 0, col, this.size - 1, 0),
            // Main diagonal
            this.checkDiagonal(board, mainStart[0], mainStart[1], -1, -1),
            // Anti diagonal
            this.checkDiagonal(board, antiStart[0], antiStart[1], -1, 1),
        )

        return consecutive >= 4 ? lastMove.piece.player : undefined
    }

    checkAxis(board: GameBoard, rowStart: number, colStart: number, deltaRow: number, deltaCol: number): number {
        const lastMove = this.#lastMoves.get(board)
        if (!lastMove) return 0

        const player = lastMove.piece
        let consecutive = 0

        outerLoop: for (let i = rowStart; i <= rowStart + deltaRow; i++) {
            for (let j = colStart; j <= colStart + deltaCol; j++) {
                consecutive = board[i][j] === player ? consecutive + 1 : 0
                if (consecutive === 4) break outerLoop
            }
        }

        return consecutive
    }

    checkDiagonal(board: GameBoard, rowStart: number, colStart: number, rowStep: number, colStep: number): number {
        const lastMove = this.#lastMoves.get(board)
        if (!lastMove) return 0

        const player = lastMove.piece.player
        let consecutive = 0

        let row = rowStart
        let col = colStart

        while (row >= 0 && col >= 0 && col <= this.size) {
            consecutive = board[row][col]?.player === player ? consecutive + 1 : 0
            row += rowStep
            col += colStep
        }

        return consecutive
    }
}
