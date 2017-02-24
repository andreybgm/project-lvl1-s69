import { runGame, taskGenerator, randomInt } from '../lib/utils';

const minValue = 2;
const maxValue = 100;
const rule = 'Find the greatest common divisor of the given numbers.';

const gcd = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const remainder = max % min;

  if (remainder === 0) {
    return min;
  }

  return gcd(min, remainder);
};

const generateTasks = taskGenerator(
  () => ({
    a: randomInt(minValue, maxValue),
    b: randomInt(minValue, maxValue),
  }),
  ({ a, b }) => `${a} ${b}`,
  ({ a, b }) => gcd(a, b).toString(),
);

export default (taskCount = 0) => {
  const tasks = generateTasks(taskCount);
  runGame(rule, tasks);
};
