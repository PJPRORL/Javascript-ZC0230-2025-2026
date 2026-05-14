import {BoardGame, type GameBoard, type Move, type SpecificBoardGameConstructor} from '../types/boardGame.js'
import type {Player, Position} from '../types/gamePiece.js'
import {O} from './O.js'
import {X} from './x.js'

const winningCombinations: [Position, Position, Position][] = [
    // Rows
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    // Columns
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    // Diagonals
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
]

export class TicTacToe extends BoardGame {
    #computer = new X('Computer')
    #player = new O('Player')
    #remainingMoves = 9

    constructor(params: SpecificBoardGameConstructor) {
        super({size: 3, ...params})
    }

    applyMove(move: Move, board: GameBoard = this.board): void {
        const {
            to: [row, col],
            piece,
        } = move
        board[row]![col] = piece

        if (this.#remainingMoves === 0) {
            this.state = 'Draw'
        }

        if (this.board !== board) return

        this.#remainingMoves--

        if (this.#remainingMoves === 0) {
            this.state = 'Draw'
        }

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

    isValidMove(move: Move): boolean {
        return this.board[move.to[0]]![move.to[1]] === null
    }

    getAvailableMoves(player: Player, board: GameBoard = this.board): Move[] {
        if (this.getWinner()) return []

        const moves: Move[] = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i]![j] === null) {
                    moves.push({
                        piece: player === 'Computer' ? this.#computer : this.#player,
                        to: [i, j],
                    })
                }
            }
        }
        return moves
    }

    getWinner(board: GameBoard = this.board): Player | undefined {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination
            if (board[a[0]]![a[1]] !== board[b[0]]![b[1]] || board[a[0]]![a[1]] !== board[c[0]]![c[1]]) {
                continue
            }

            return board[a[0]]![a[1]]?.player
        }
        return undefined
    }
}
