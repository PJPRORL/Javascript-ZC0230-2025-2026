export class MiniMax {
    game;
    maxDepth;
    constructor(game, maxDepth) {
        this.game = game;
        this.maxDepth = maxDepth;
    }
    play() {
        const playerStarts = confirm('Do you want to have the first turn?');
        let currentPlayer = playerStarts ? 'Player' : 'Computer';
        while (this.game.state === 'InProgress') {
            if (currentPlayer === 'Player') {
                console.clear();
                this.game.renderBoard();
                const move = this.game.readMove();
                this.game.applyMove(move, this.game.board);
            }
            else {
                const computerMove = this.#minimax(this.game.board, this.maxDepth, true);
                this.game.applyMove(computerMove.move, this.game.board);
            }
            currentPlayer = currentPlayer === 'Player' ? 'Computer' : 'Player';
        }
        const winner = this.game.getWinner();
        console.log(winner ? `${winner} wins!` : "It's a draw!");
    }
    /**
     * @param board The board for which to determine the best move.
     * @param depth The maximum number of moves in the future to search for. A larger depth results in a more accurate
     * result, but als is much longer computer times.
     * @param isMaximizingPlayer Whether or not the current player is the maximizing player (the computer).
     * This should be true when the function is first called, and should be flipped for each recursive call.
     * @private
     */
    #minimax(board, depth, isMaximizingPlayer) {
        const moves = this.game.getAvailableMoves(isMaximizingPlayer ? 'Computer' : 'Player', board);
        if (depth === 0 || moves.length === 0) {
            return { score: this.evaluateBoard(board) };
        }
        const fn = isMaximizingPlayer ? Math.max : Math.min;
        const result = {
            score: isMaximizingPlayer ? -Infinity : Infinity,
        };
        for (const move of moves) {
            const nextBoard = board.map(row => [...row]);
            this.game.applyMove(move, nextBoard);
            const newScore = fn(result.score, this.#minimax(nextBoard, depth - 1, !isMaximizingPlayer).score);
            if (result.score !== newScore) {
                result.score = newScore;
                result.move = move;
            }
        }
        return result;
    }
}
//# sourceMappingURL=minimax.js.map