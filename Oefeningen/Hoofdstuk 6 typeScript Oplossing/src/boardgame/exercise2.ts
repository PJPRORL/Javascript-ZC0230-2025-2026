import {showMenu} from '../utils/showMenu.js'
import {TicTacToeMiniMax} from './ticTacToe/ticTacToeMiniMax.js'
import type {MiniMax} from './types/minimax.js'

export function exercise2(): void {
    const games: Record<string, new () => MiniMax> = {
        TicTacToe: TicTacToeMiniMax,
        // TODO: Add more games here (checkers, chess)
    }

    console.log(`Available games:`)

    const miniMax = new (showMenu(games, `Select a game by typing its index:`))()

    console.clear()
    miniMax.play()
}
