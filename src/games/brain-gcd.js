import { run, taskGenerator } from '../lib/game';
import { gcd, randomInt } from '../lib/utils';

const taskCount = 3;
const minValue = 2;
const maxValue = 100;
const rules = 'Find the greatest common divisor of the given numbers.';

const generateTasks = taskGenerator(
  () => ({
    a: randomInt(minValue, maxValue),
    b: randomInt(minValue, maxValue),
  }),
  ({ a, b }) => `${a} ${b}`,
  ({ a, b }) => gcd(a, b).toString(),
);

const runGame = () => {
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
