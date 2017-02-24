import { runGame, taskGenerator, randomInt } from '../lib/utils';

const minValue = 1;
const maxValue = 100;
const answerOptions = { yes: 'yes', no: 'no' };
const rule = [
  `Answer "${answerOptions.yes}" if a number is prime, `,
  `otherwise answer "${answerOptions.no}".`,
].join('');

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

const generateTasks = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => (isPrime(number) ? answerOptions.yes : answerOptions.no),
);

export default (taskCount = 0) => {
  const tasks = generateTasks(taskCount);
  runGame(rule, tasks);
};

export { isPrime };
