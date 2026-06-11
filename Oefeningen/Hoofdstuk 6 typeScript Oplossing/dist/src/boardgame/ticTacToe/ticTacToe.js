import { BoardGame } from '../types/boardGame.js';
import { O } from './O.js';
import { X } from './x.js';
const winningCombinations = [
    // Rows
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    // Columns
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    // Diagonals
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];
export class TicTacToe extends BoardGame {
    #computer = new X('Computer');
    #player = new O('Player');
    #remainingMoves = 9;
    constructor() {
        super(3);
    }
    applyMove({ to: [row, col], piece }, board = this.board) {
        board[row][col] = piece;
        if (this.board !== board)
            return;
        this.#remainingMoves--;
        if (this.#remainingMoves === 0) {
            this.state = 'Draw';
        }
        if (this.getWinner(board)) {
            this.state = 'Win';
        }
    }
    readMove() {
        const position = prompt('Enter your move (row,col): ')?.split(',').map(Number).map(Math.floor);
        if (!position || position.length !== 2 || Number.isNaN(position[0]) || Number.isNaN(position[1]))
            return this.readMove();
        const row = position[0];
        const col = position[1];
        if (row < 1 || row > this.board.length || col < 1 || col > this.board.length)
            return this.readMove();
        const move = {
            to: [row - 1, col - 1],
            piece: this.#player,
        };
        return this.isValidMove(move) ? move : this.readMove();
    }
    isValidMove(move, board = this.board) {
        return board[move.to[0]][move.to[1]] === null;
    }
    getAvailableMoves(player, board = this.board) {
        if (this.getWinner(board))
            return [];
        const moves = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === null) {
                    moves.push({
                        piece: player === 'Computer' ? this.#computer : this.#player,
                        to: [i, j],
                    });
                }
            }
        }
        return moves;
    }
    getWinner(board = this.board) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a[0]][a[1]] !== board[b[0]][b[1]] || board[a[0]][a[1]] !== board[c[0]][c[1]]) {
                continue;
            }
            return board[a[0]][a[1]]?.player;
        }
        return undefined;
    }
}
//# sourceMappingURL=ticTacToe.js.map