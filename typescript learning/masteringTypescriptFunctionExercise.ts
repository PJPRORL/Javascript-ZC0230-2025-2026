/* Exercise 1 - twofer */

function twoFer (name: string = "you"): string{
    return `one for ${name}, one for me`;
}

console.log(twoFer());
console.log(twoFer("Jeroen"));

/* Exercise 2 - leapYear */

function isLeapYear (year: number): boolean{
    if (year % 400 === 0) {
        return true;
    }
    else
    {
        return false;
    }
}

console.log(isLeapYear(2012));
console.log(isLeapYear(2013));