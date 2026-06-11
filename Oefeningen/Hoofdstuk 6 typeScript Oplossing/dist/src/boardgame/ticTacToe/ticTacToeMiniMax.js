import { MiniMax } from '../types/minimax.js';
import { TicTacToe } from './ticTacToe.js';
export class TicTacToeMiniMax extends MiniMax {
    constructor() {
        super(new TicTacToe(), 9);
    }
    evaluateBoard(board) {
        const winner = this.game.getWinner(board);
        if (winner === undefined)
            return 0;
        return winner === 'Computer' ? 10 : -10;
    }
}
//# sourceMappingURL=ticTacToeMiniMax.js.map