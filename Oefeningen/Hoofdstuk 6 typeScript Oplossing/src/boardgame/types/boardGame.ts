import {padEvenly} from '../../utils/padEvenly.js'
import type {GamePiece, Player, Position} from './gamePiece.js'

export interface Move {
    from?: Position
    to: Position
    piece: GamePiece
}

export type GameState = 'InProgress' | 'Draw' | 'Win'
export type GameBoard = (GamePiece | null)[][]

export abstract class BoardGame {
    readonly board: GameBoard
    state: GameState = 'InProgress'

    protected constructor(size: number) {
        this.board = Array(size)
            .fill(null)
            .map(() => Array(size).fill(null))
    }

    get size(): number {
        return this.board.length
    }

    renderBoard(): void {
        const squareWidth = 3

        const headers = `${padEvenly('', squareWidth)}|${Array(this.size)
            .fill(null)
            .map((_, i) => `${padEvenly(i + 1, squareWidth)}|`)
            .join('')}`
        const rowSeparator = `${padEvenly('', squareWidth)}|${`${'-'.repeat(squareWidth)}|`.repeat(this.size)}`
        console.log(headers)
        console.log(rowSeparator)

        for (let i = 0; i < this.size; i++) {
            let row = `${padEvenly(i + 1, squareWidth)}|`
            for (let j = 0; j < this.size; j++) {
                const pieceString = this.board[i]![j] ?? ''
                row += `${padEvenly(pieceString, squareWidth)}|`
            }
            console.log(row)
            console.log(rowSeparator)
        }

        console.log()
    }

    abstract applyMove(move: Move, board?: GameBoard): void
    abstract readMove(): Move
    abstract isValidMove(move: Move, board?: GameBoard): boolean
    abstract getAvailableMoves(player: Player, board?: GameBoard): Move[]
    abstract getWinner(board?: GameBoard): Player | undefined
}
