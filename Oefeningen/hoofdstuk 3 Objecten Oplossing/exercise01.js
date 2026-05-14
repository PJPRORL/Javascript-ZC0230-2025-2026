// Oefening 1a:
const theHobbita = {
  title: 'The Hobbit',
  author: 'J.R.R. Tolkien',
  published: 1937,
}

const nineteenEightyFoura = {
  title: '1984',
  author: 'George Orwell',
  published: 1949,
  wordCount: 88900,
}

const prideAndPrejudicea = {
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  published: 1813,
  wordCount: 124713,
}

console.log('1a:');
console.log(theHobbita);
console.log(nineteenEightyFoura);
console.log(prideAndPrejudicea);

console.log(`Totaal woorden 1984 en P&P: ${nineteenEightyFoura.wordCount + prideAndPrejudicea.wordCount}`);

// Oefening 2b:
const theHobbit = {
  title: 'The Hobbit',
  author: 'J.R.R. Tolkien',
  published: 1937,
  getInfo() {
    const baseInfo = `${this.title} by ${this.author}, published in ${this.published}`;
    return this.wordCount ? `${baseInfo} (${this.wordCount} words)` : baseInfo;
  },
}

const nineteenEightyFour = {
  title: '1984',
  author: 'George Orwell',
  published: 1949,
  wordCount: 88900,
  getInfo() {
    const baseInfo = `${this.title} by ${this.author}, published in ${this.published}`;
    return this.wordCount ? `${baseInfo} (${this.wordCount} words)` : baseInfo;
  },
}

const prideAndPrejudice = {
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  published: 1813,
  wordCount: 124713,
  getInfo() {
    const baseInfo = `${this.title} by ${this.author}, published in ${this.published}`;
    return this.wordCount ? `${baseInfo} (${this.wordCount} words)` : baseInfo;
  },
}

console.log('\n1b:');
console.log(theHobbit.getInfo());
console.log(nineteenEightyFour.getInfo());
console.log(prideAndPrejudice.getInfo());

theHobbit.wordCount = 95356;
console.log(theHobbit.getInfo());