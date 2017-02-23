import { run, taskGenerator } from './lib/game';
import { gcd, randomInt } from './lib/utils';

const game = () => {
  const taskCount = 3;
  const minValue = 2;
  const maxValue = 100;

  const generator = taskGenerator(
    () => ({
      a: randomInt(minValue, maxValue),
      b: randomInt(minValue, maxValue),
    }),
    ({ a, b }) => `${a} ${b}`,
    ({ a, b }) => gcd(a, b).toString(),
  );

  const rules = 'Find the greatest common divisor of the given numbers.';
  const tasks = generator(taskCount);
  run(rules, tasks);
};

export default game;
