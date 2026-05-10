import type {GameBoard} from '../types/boardGame.ts'
import type {Player} from '../types/gamePiece.ts'
import {MiniMax, type SpecificMiniMaxConstructor} from '../types/minimax.ts'
import {ConnectFour} from './connectFour.ts'
import {winningCombinations} from './winningCombinations.ts'

export class ConnectFourMiniMax extends MiniMax {
    declare game: ConnectFour

    constructor(params: SpecificMiniMaxConstructor) {
        super({
            game: ConnectFour,
            maxDepth: 7,
            ...params,
        })

        this.start()
    }

    protected evaluateBoard(board: GameBoard): number {
        let score = 0

        // The middle column can be used for the most possible configurations.
        const midCol = Math.floor(this.game.size / 2)
        for (let row = 0; row < this.game.size; row++) {
            if (board[row][midCol]?.player === 'Computer') score += 25
            if (board[row][midCol]?.player === 'Player') score -= 25
        }

        for (const combination of winningCombinations) {
            const window = combination.map(pos => this.#getPlayerAtPosition(board, pos))
            score += this.#scoreWindow(window)
        }

        return score
    }

    #getPlayerAtPosition(board: GameBoard, [i, j]: [number, number]): Player | null {
        return board[i][j]?.player ?? null
    }

    #scoreWindow(window: (Player | null)[]): number {
        let score = 0
        const computerPieces = window.filter(p => p === 'Computer').length
        const playerPieces = window.filter(p => p === 'Player').length
        const empty = window.filter(p => p === null).length

        if (computerPieces === 4) return 10000
        if (computerPieces === 3 && empty === 1) score += 500
        if (computerPieces === 2 && empty === 2) score += 50
        if (playerPieces === 3 && computerPieces === 1) score += 100
        if (playerPieces === 2 && computerPieces === 1) score += 25

        // Since the player shouldn't win, this must be blocked at all costs and must therefor have a high penalty.
        if (playerPieces === 4) return -100000
        if (playerPieces === 3 && empty === 1) score -= 800
        if (playerPieces === 2 && empty === 2) score -= 50

        return score
    }
}
