/* Maken van Arrays in Typescript */
const activeUsers: string[] = [];
activeUsers.push("Jeroen");

const ageList: number[] = [45, 56, 13];
ageList[0] = 99;
ageList.push(ageList[0]);

/* Maken van lijsten in Typescript */
const bools: Array<boolean> = [];
bools.push(bools[0] = true);

type Point = {
    x: number;
    y: number;
}

const coords: Point[] = [];
coords.push({x: 23, y: 8})

/* Maken van Multi Dimensionale Arrays in Typescript */
// @ts-ignore
const board: string[][] = [
    ["x", "o", "x"],
    ["x", "o", "x"],
    ["x", "o", "x"]
];