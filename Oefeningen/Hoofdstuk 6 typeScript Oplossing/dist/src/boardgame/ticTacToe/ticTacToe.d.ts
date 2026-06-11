import { BoardGame, type GameBoard, type Move } from '../types/boardGame.js';
import type { Player } from '../types/gamePiece.js';
export declare class TicTacToe extends BoardGame {
    #private;
    constructor();
    applyMove({ to: [row, col], piece }: Move, board?: GameBoard): void;
    readMove(): Move;
    isValidMove(move: Move, board?: GameBoard): boolean;
    getAvailableMoves(player: Player, board?: GameBoard): Move[];
    getWinner(board?: GameBoard): Player | undefined;
}
//# sourceMappingURL=ticTacToe.d.ts.map