let mergeObjects = (object1, object2) => {
    const mergedObject = {
        object1: {
            a: 1,
            b: 2,
            c: 3,
        },
        object2: {
            b: 4,
            c: 5,
            d: 6,
        }
    };

    return mergedObject;
}

const object1 = {
    a: 1,
    b: 2,
    c: 3,
};

const object2 = {
    b: 4,
    c: 5,
    d: 6,
};

console.log(mergeObjects(object1, object2));