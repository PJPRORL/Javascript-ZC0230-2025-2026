export type Position = [number, number]
export type Player = 'Computer' | 'Player'

export abstract class GamePiece {
    readonly player: Player

    constructor(player: Player) {
        this.player = player
    }

    abstract toString(): string
}
