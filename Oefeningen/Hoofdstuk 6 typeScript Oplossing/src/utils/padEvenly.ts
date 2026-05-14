interface Stringable {
    toString(): string
}

export function padEvenly(str: Stringable, length: number): string {
    const convertedStr = str.toString()
    if (convertedStr.length >= length) {
        return convertedStr
    }

    const totalPadding = length - convertedStr.length
    const leftPadding = Math.floor(totalPadding / 2)
    const rightPadding = totalPadding - leftPadding

    return ' '.repeat(leftPadding) + convertedStr + ' '.repeat(rightPadding)
}
