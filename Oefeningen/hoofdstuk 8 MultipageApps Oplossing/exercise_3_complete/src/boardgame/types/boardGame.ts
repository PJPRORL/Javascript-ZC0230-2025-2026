import type {GamePiece, Player, Position} from './gamePiece.js'

export interface Move {
    from?: Position
    to: Position
    piece: GamePiece
}

export type GameState = 'InProgress' | 'Draw' | 'Win'
export type GameBoard = (GamePiece | null)[][]
export type OnBoardChange = (board: HTMLDivElement) => void
export type OnDone = (winner: Player | 'Draw') => void
export type OnPlayerChange = (player: Player) => void

export interface BoardGameConstructor {
    size: number
    onBoardChange: OnBoardChange
    onDone: OnDone
    initialPlayer: Player
    onPlayerChange?: OnPlayerChange
}

// TODO: Think of a better name...
export type SpecificBoardGameConstructor = Omit<BoardGameConstructor, 'size'>

export abstract class BoardGame {
    readonly board: GameBoard
    protected _state: GameState = 'InProgress'
    protected readonly onBoardChange: OnBoardChange
    protected readonly onDone: OnDone
    protected readonly onPlayerChange?: OnPlayerChange
    protected _currentPlayer: Player

    protected constructor({size, onBoardChange, onDone, onPlayerChange, initialPlayer}: BoardGameConstructor) {
        this.board = Array(size)
            .fill(null)
            .map(() => Array(size).fill(null))
        this._currentPlayer = initialPlayer

        this.onBoardChange = onBoardChange
        this.onPlayerChange = onPlayerChange
        this.onDone = onDone

        this.renderBoard()
    }

    get size(): number {
        return this.board.length
    }

    get state(): GameState {
        return this._state
    }

    get currentPlayer(): Player {
        return this._currentPlayer
    }

    protected toggleCurrentPlayer(): void {
        this._currentPlayer = this._currentPlayer === 'Player' ? 'Computer' : 'Player'
        this.onPlayerChange?.(this.currentPlayer)
    }

    protected set state(state: GameState) {
        this._state = state
        if (state !== 'InProgress') {
            this.onDone(state === 'Draw' ? 'Draw' : this.getWinner()!)
        }
    }

    renderBoard(): void {
        const board = document.createElement('div')
        board.className = 'board'

        for (let i = 0; i < this.size; i++) {
            const row = document.createElement('div')
            row.className = 'board-row'

            for (let j = 0; j < this.size; j++) {
                const button = document.createElement('button')
                button.className = 'board-cell'
                button.innerText = this.board?.at(i)?.at(j)?.toString() ?? ''
                button.dataset.row = i.toString()
                button.dataset.column = j.toString()
                button.addEventListener('click', () => {
                    if (this.state === 'InProgress' && this.currentPlayer === 'Player') {
                        this.readMove(i, j)
                    }
                })

                row.appendChild(button)
            }
            board.appendChild(row)
        }

        this.onBoardChange(board)
    }

    applyMove(_move: Move, board?: GameBoard): void {
        if (this.board !== board) return

        this.renderBoard()

        if (this.getWinner()) {
            this.state = 'Win'
        } else {
            this.toggleCurrentPlayer()
        }
    }

    abstract readMove(i: number, j: number): void
    abstract isValidMove(move: Move, board?: GameBoard): boolean
    abstract getAvailableMoves(player: Player, board?: GameBoard): Move[]
    abstract getWinner(board?: GameBoard): Player | undefined
}
