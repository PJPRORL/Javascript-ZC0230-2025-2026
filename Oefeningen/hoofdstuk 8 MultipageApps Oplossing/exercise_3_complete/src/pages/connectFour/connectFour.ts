import {Modal} from 'bootstrap'
import {ConnectFourMiniMax} from '../../boardgame/connectFour/connectFourMiniMax.ts'
import type {Player} from '../../boardgame/types/gamePiece.ts'
import {Page} from '../../router/page.ts'
import HTML from './connectFour.html?raw'

export class ConnectFourPage extends Page {
    #boardContainer = this.body.querySelector<HTMLDivElement>('#game-board')!
    #firstTurn = this.body.querySelectorAll<HTMLInputElement>('[name=first-turn]')!
    #startButton = this.body.querySelector<HTMLButtonElement>('#start-button')!
    #currentPlayer = this.body.querySelector<HTMLElement>('#current-player')!
    #modalContent = this.body.querySelector<HTMLDivElement>('.modal-body > p')!

    constructor() {
        super(HTML)

        this.#startButton.addEventListener('click', () => this.startGame())
    }

    startGame(): void {
        new ConnectFourMiniMax({
            onBoardChange: board => {
                this.#boardContainer.innerText = ''
                this.#boardContainer.appendChild(board)
            },
            onDone: winner => {
                const gameOverModal = new Modal('#game-over-modal')
                this.#modalContent.innerText = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`
                gameOverModal.show()
            },
            onPlayerChange: player => {
                this.#currentPlayer.innerText = player
            },
            initialPlayer: (Array.from(this.#firstTurn).find(x => x.checked)?.value as Player) ?? 'Player',
        })
    }
}
