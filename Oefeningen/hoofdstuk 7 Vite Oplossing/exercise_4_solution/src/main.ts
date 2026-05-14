import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './main.css'
import {Modal} from 'bootstrap'
import {TicTacToeMiniMax} from './boardgame/ticTacToe/ticTacToeMiniMax.ts'
import type {Player} from './boardgame/types/gamePiece.ts'
import homePage from './pages/home/home.html?raw'

// Import the home page HTML
const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = homePage

const boardContainer = document.querySelector<HTMLDivElement>('#game-board')!
const firstTurn = document.querySelectorAll<HTMLInputElement>('[name=first-turn]')!
const startButton = document.querySelector<HTMLButtonElement>('#start-button')!
const currentPlayer = document.querySelector<HTMLElement>('#current-player')!
const modalContent = document.querySelector<HTMLDivElement>('.modal-body > p')!

startButton.addEventListener('click', startGame)

function startGame(): void {
    new TicTacToeMiniMax({
        onBoardChange: board => {
            boardContainer.innerText = ''
            boardContainer.appendChild(board)
        },
        onDone: winner => {
            const gameOverModal = new Modal('#game-over-modal')
            modalContent.innerText = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`
            gameOverModal.show()
        },
        onPlayerChange: player => {
            currentPlayer.innerText = player
        },
        initialPlayer: (Array.from(firstTurn).find(x => x.checked)?.value as Player) ?? 'Player',
    })
}
