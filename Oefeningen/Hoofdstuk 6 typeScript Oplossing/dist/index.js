import { exercise2 } from './src/boardgame/exercise2.js';
import { exercise1 } from './src/gameManager/exercise1.js';
import { showMenu } from './src/utils/showMenu.js';
const exercises = {
    'Exercise 1': exercise1,
    'Exercise 2': exercise2,
};
console.log(`Available exercises:`);
const exercise = showMenu(exercises, `Select an exercise by typing its index:`);
console.clear();
exercise();
//# sourceMappingURL=index.js.map