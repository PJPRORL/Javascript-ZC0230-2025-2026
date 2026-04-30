"use strict";
/* Exercise 1 - twofer */
function twoFer(name = "you") {
    return `one for ${name}, one for me`;
}
console.log(twoFer());
console.log(twoFer("Jeroen"));
/* Exercise 2 - leapYear */
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isLeapYear(2027));
console.log(isLeapYear(2000));
/* oplossing leerkracht
*
* function isLeapYear (year: number): boolean{
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2012));
console.log(isLeapYear(2013));
*
* */ 
