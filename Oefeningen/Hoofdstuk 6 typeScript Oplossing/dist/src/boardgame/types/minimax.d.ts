import type { BoardGame, GameBoard, Move } from './boardGame.js';
export interface MiniMaxResult {
    score: number;
    move?: Move;
}
export declare abstract class MiniMax {
    #private;
    protected readonly game: BoardGame;
    protected readonly maxDepth: number;
    protected constructor(game: BoardGame, maxDepth: number);
    play(): void;
    protected abstract evaluateBoard(board: GameBoard): number;
}
//# sourceMappingURL=minimax.d.ts.map