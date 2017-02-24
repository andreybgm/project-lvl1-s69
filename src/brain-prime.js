import { run, taskGenerator } from './lib/game';
import { randomInt } from './lib/utils';

const isPrime = (n) => {
  if (n < 2) {
    return true;
  }

  const iter = (i) => {
    if (i > Math.sqrt(n)) {
      return true;
    } else if (n % i === 0) {
      return false;
    }

    return iter(i + 1);
  };

  return iter(2);
};

const runGame = () => {
  const taskCount = 3;
  const minValue = 1;
  const maxValue = 100;

  const generateTasks = taskGenerator(
    () => randomInt(minValue, maxValue),
    number => number.toString(),
    number => (isPrime(number) ? 'yes' : 'no'),
  );

  const rules = 'Answer "yes" if a number is prime, otherwise answer "no".';
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
export { isPrime };
