import { run, taskGenerator } from '../../lib/game';
import { randomInt } from '../../lib/utils';
import { balance } from './utils';

const taskCount = 3;
const minValue = 100;
const maxValue = 9999;

const generator = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => balance(number).toString(),
);

const game = () => {
  const rules = 'Balance the given number.';
  const tasks = generator(taskCount);
  run(rules, tasks);
};

export default game;
