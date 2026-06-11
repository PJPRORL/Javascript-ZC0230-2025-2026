export type Position = [number, number];
export type Player = 'Computer' | 'Player';
export declare abstract class GamePiece {
    readonly player: Player;
    constructor(player: Player);
    abstract toString(): string;
}
//# sourceMappingURL=gamePiece.d.ts.map