import * as pairs from 'hexlet-pairs';
import brainGame from '../lib/brain-game';
import { gcd, randomInt } from '../lib/utils';
import taskGenerator from '../lib/task-generator';

const taskCount = 3;
const minValue = 2;
const maxValue = 100;

const generator = taskGenerator(
  () => pairs.cons(
    randomInt(minValue, maxValue), randomInt(minValue, maxValue)),
  pair => `${pairs.car(pair)} ${pairs.cdr(pair)}`,
  pair => gcd(pairs.car(pair), pairs.cdr(pair)).toString(),
);

const game = () => {
  const rules = 'Find the greatest common divisor of the given numbers.';
  const tasks = generator(taskCount);
  brainGame(rules, tasks);
};

export default game;
