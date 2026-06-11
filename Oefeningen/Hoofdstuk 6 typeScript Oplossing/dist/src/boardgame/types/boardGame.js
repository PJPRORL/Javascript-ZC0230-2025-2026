import { padEvenly } from '../../utils/padEvenly.js';
export class BoardGame {
    board;
    state = 'InProgress';
    constructor(size) {
        this.board = Array(size)
            .fill(null)
            .map(() => Array(size).fill(null));
    }
    get size() {
        return this.board.length;
    }
    renderBoard() {
        const squareWidth = 3;
        const headers = `${padEvenly('', squareWidth)}|${Array(this.size)
            .fill(null)
            .map((_, i) => `${padEvenly(i + 1, squareWidth)}|`)
            .join('')}`;
        const rowSeparator = `${padEvenly('', squareWidth)}|${`${'-'.repeat(squareWidth)}|`.repeat(this.size)}`;
        console.log(headers);
        console.log(rowSeparator);
        for (let i = 0; i < this.size; i++) {
            let row = `${padEvenly(i + 1, squareWidth)}|`;
            for (let j = 0; j < this.size; j++) {
                const pieceString = this.board[i][j] ?? '';
                row += `${padEvenly(pieceString, squareWidth)}|`;
            }
            console.log(row);
            console.log(rowSeparator);
        }
        console.log();
    }
}
//# sourceMappingURL=boardGame.js.map