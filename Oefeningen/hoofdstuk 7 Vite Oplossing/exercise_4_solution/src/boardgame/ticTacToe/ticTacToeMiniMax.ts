import type {GameBoard} from '../types/boardGame.js'
import {MiniMax, type SpecificMiniMaxConstructor} from '../types/minimax.js'
import {TicTacToe} from './ticTacToe.js'

export class TicTacToeMiniMax extends MiniMax {
    constructor(params: SpecificMiniMaxConstructor) {
        super({
            game: TicTacToe,
            maxDepth: 9,
            ...params,
        })
        this.start()
    }

    protected evaluateBoard(board: GameBoard): number {
        const winner = this.game.getWinner(board)
        if (winner === undefined) return 0
        return winner === 'Computer' ? 10 : -10
    }
}
