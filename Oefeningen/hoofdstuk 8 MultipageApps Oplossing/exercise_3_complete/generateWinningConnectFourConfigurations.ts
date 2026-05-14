type Coordinate = [number, number]
type Combination = [Coordinate, Coordinate, Coordinate, Coordinate]

import {writeFileSync} from 'node:fs'

function generateWinningConnectFourConfigurations() {
    const length = 7
    const combinations: Combination[] = []
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            // 1. Horizontal (Right)
            if (j + 3 < length) {
                combinations.push([
                    [i, j],
                    [i, j + 1],
                    [i, j + 2],
                    [i, j + 3],
                ])
            }

            // 2. Vertical (Down)
            if (i + 3 < length) {
                combinations.push([
                    [i, j],
                    [i + 1, j],
                    [i + 2, j],
                    [i + 3, j],
                ])
            }

            // 3. Diagonal Negative Slope (\)
            // Moves down and to the right
            if (i + 3 < length && j + 3 < length) {
                combinations.push([
                    [i, j],
                    [i + 1, j + 1],
                    [i + 2, j + 2],
                    [i + 3, j + 3],
                ])
            }

            // 4. Diagonal Positive Slope (/)
            // Moves up and to the right
            if (i - 3 >= 0 && j + 3 < length) {
                combinations.push([
                    [i, j],
                    [i - 1, j + 1],
                    [i - 2, j + 2],
                    [i - 3, j + 3],
                ])
            }
        }
    }

    return combinations
}

const combinations = generateWinningConnectFourConfigurations()

writeFileSync('./src/boardgame/connectFour/winningCombinations.json', JSON.stringify(combinations))
