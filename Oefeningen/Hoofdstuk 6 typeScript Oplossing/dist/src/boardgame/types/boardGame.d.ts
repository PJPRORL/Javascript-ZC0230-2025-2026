import type { GamePiece, Player, Position } from './gamePiece.js';
export interface Move {
    from?: Position;
    to: Position;
    piece: GamePiece;
}
export type GameState = 'InProgress' | 'Draw' | 'Win';
export type GameBoard = (GamePiece | null)[][];
export declare abstract class BoardGame {
    readonly board: GameBoard;
    state: GameState;
    protected constructor(size: number);
    get size(): number;
    renderBoard(): void;
    abstract applyMove(move: Move, board?: GameBoard): void;
    abstract readMove(): Move;
    abstract isValidMove(move: Move, board?: GameBoard): boolean;
    abstract getAvailableMoves(player: Player, board?: GameBoard): Move[];
    abstract getWinner(board?: GameBoard): Player | undefined;
}
//# sourceMappingURL=boardGame.d.ts.map