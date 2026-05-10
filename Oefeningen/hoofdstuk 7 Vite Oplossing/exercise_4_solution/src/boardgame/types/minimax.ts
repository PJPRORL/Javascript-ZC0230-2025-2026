import type {BoardGame, BoardGameConstructor, GameBoard, Move, SpecificBoardGameConstructor} from './boardGame.js'

export interface MiniMaxResult {
    score: number
    move?: Move
}

export interface MiniMaxConstructor extends Omit<BoardGameConstructor, 'size'> {
    game: new (options: SpecificBoardGameConstructor) => BoardGame
    maxDepth: number
}

export type SpecificMiniMaxConstructor = Omit<MiniMaxConstructor, 'maxDepth' | 'game'>

export abstract class MiniMax {
    protected readonly game: BoardGame
    protected readonly maxDepth: number

    protected constructor({game, maxDepth, onPlayerChange, ...rest}: MiniMaxConstructor) {
        this.maxDepth = maxDepth

        this.game = new game({
            onPlayerChange: player => {
                onPlayerChange?.(player)
                if (player === 'Computer') {
                    this.applyAIMove()
                }
            },
            ...rest,
        })
    }

    /**
     * This is a separate method from the constructor, because calling it in the constructor could trigger a call to a
     * #private method in a subclass. This method would then not be available since we're still in the constructor of
     * the superclass.
     * @protected
     */
    protected start(): void {
        if (this.game.currentPlayer === 'Computer') {
            this.applyAIMove()
        }
    }

    applyAIMove(): void {
        if (this.game.state === 'InProgress') {
            const computerMove = this.#minimax(this.game.board, this.maxDepth, true)
            this.game.applyMove(computerMove.move!, this.game.board)
        }
    }

    /**
     * @param board The board for which to determine the best move.
     * @param depth The maximum number of moves in the future to search for. A larger depth results in a more accurate
     * result, but als is much longer computer times.
     * @param isMaximizingPlayer Whether or not the current player is the maximizing player (the computer).
     * This should be true when the function is first called, and should be flipped for each recursive call.
     * @private
     */
    #minimax(board: GameBoard, depth: number, isMaximizingPlayer: boolean): MiniMaxResult {
        const moves = this.game.getAvailableMoves(isMaximizingPlayer ? 'Computer' : 'Player', board)

        if (depth === 0 || moves.length === 0) {
            return {score: this.evaluateBoard(board)}
        }

        const fn = isMaximizingPlayer ? Math.max : Math.min
        const result: MiniMaxResult = {
            score: isMaximizingPlayer ? -Infinity : Infinity,
        }

        for (const move of moves) {
            const nextBoard = board.map(row => [...row])
            this.game.applyMove(move, nextBoard)
            const newScore = fn(result.score, this.#minimax(nextBoard, depth - 1, !isMaximizingPlayer).score)

            if (result.score !== newScore) {
                result.score = newScore
                result.move = move
            }
        }
        return result
    }

    protected abstract evaluateBoard(board: GameBoard): number
}
