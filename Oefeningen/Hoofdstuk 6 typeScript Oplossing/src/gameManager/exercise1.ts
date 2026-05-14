import {initialCharacters} from './data.js'
import {GameManager} from './gameManager.js'

export function exercise1(): void {
    const gameManager = new GameManager(initialCharacters)
    gameManager.start()
}
