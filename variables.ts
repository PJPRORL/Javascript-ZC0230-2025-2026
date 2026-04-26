let movieTitle: string = "Transformers";
let movieRank: number = 10;
movieRank -= 5;

let movieReviewed: boolean = false;
movieReviewed = true;

/* niet mogelijk door gebruik van Type */
//movieReviewed = "true";

/* Creëren van functies zonder vaste types */

function squareAny(num){
    return num * num;
}

squareAny(15)
squareAny("dfdsfs")
squareAny(false)

/* Creëren van functies met vaste types */
function square(num: number){
    return num * num;
}

function greet(person: string){
    return `Hi there, ${person}!`
}

function greetAndAge(person: string, age: number){
    return `Hi there, ${person}. What is your ${age}?!`
}

greet("jeroen")
square(3);
greetAndAge("Jeroen", 30)