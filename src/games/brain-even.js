import brainGame from '../lib/brain-game';
import { isEven, randomInt } from '../lib/utils';
import taskGenerator from '../lib/task-generator';

const taskCount = 3;
const minValue = 1;
const maxValue = 100;

const generator = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => (isEven(number) ? 'yes' : 'no'),
);

const game = () => {
  const rules = 'Answer "yes" if a number is even, otherwise answer "no".';
  const tasks = generator(taskCount);
  brainGame(rules, tasks);
};

export default game;
