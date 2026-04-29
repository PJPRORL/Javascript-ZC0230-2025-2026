/* Creëren van functie met object als input */
function printName2 (cat: {first: string, last: string}) : void{
    console.log(`I have 2 cats, the first cat is ${cat.first}, the last cat is ${cat.last}`);
}

printName2({first: "Toulouse", last: "Marie"});

/* Creëren van object met random inputs */
type Point = { x: number; y: number };

function randomCoordinaten() : Point{
    return { x: Math.random(), y: Math.random() };
}

console.log(randomCoordinaten())

function doublePoint(point: Point): Point {
    return { x: point.x * 2, y: point.y * 2};
}

console.log(doublePoint);

/* Exercise nested objects - Chapter5: Object Types - Video: 31*/
type Song = {
    title: string;
    artist: string;
    numStreams: number;
    credits: {producer:string, writer: string};
};

function calculatePayout(song: Song): number {
    return song.numStreams * 0.0033;
}
//
function printSong(song: Song): void{
    console.log(`${song.title} - ${song.artist}`);
}

const mySong: Song = {
    title: "Unchained Melodyt",
    artist: "Righteous Brothers",
    numStreams: 76756788,
    credits: {
        producer: "Phil Spector",
        writer: "Alex North"
    }
}

const earnings = calculatePayout(mySong);
console.log(earnings);
printSong(mySong);

/* Introduction the optional property for Objects - Chapter5: Object Types - Video: 32*/

type PointOptional = {
    x: number;
    y: number;
    z?: number;
};

const myPoint: PointOptional = {x: 1, y: 3}
console.log(myPoint);

type User = {
    readonly id: number;
    username: string;
};

const user: User = {
    id: 22,
    username: "PJPRO"
}

console.log(user.id);

/* Introduction the optional property for Objects - Chapter5: Object Types - Video: 33*/

type Circle = {
    radius: number;
}

type Colorful = {
    color: string;
};

type ColorfulCircle = Circle & Colorful;

const happyFace: ColorfulCircle = {
    radius: 4,
    color: "yellow",
};

type Cat = {
    numLives: number;
}

type Dog = {
    breed: string;
}

type CatDog = Cat & Dog & {
    age: number;
};

const christy: CatDog = {
    numLives: 7,
    breed: "Husky",
    age: 9
};

console.log(happyFace);
console.log(christy);