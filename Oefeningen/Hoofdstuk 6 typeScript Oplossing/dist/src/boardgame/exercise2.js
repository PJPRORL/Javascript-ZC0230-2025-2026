import { showMenu } from '../utils/showMenu.js';
import { TicTacToeMiniMax } from './ticTacToe/ticTacToeMiniMax.js';
export function exercise2() {
    const games = {
        TicTacToe: TicTacToeMiniMax,
        // TODO: Add more games here (checkers, chess)
    };
    console.log(`Available games:`);
    const miniMax = new (showMenu(games, `Select a game by typing its index:`))();
    console.clear();
    miniMax.play();
}
//# sourceMappingURL=exercise2.js.map