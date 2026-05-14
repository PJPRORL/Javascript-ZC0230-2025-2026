import type {GameBoard} from '../types/boardGame.js'
import {MiniMax} from '../types/minimax.js'
import {TicTacToe} from './ticTacToe.js'

export class TicTacToeMiniMax extends MiniMax {
    constructor() {
        super(new TicTacToe(), 9)
    }

    protected evaluateBoard(board: GameBoard): number {
        const winner = this.game.getWinner(board)
        if (winner === undefined) return 0
        return winner === 'Computer' ? 10 : -10
    }
}
