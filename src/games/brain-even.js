import { run, taskGenerator } from '../lib/game';
import { isEven, randomInt } from '../lib/utils';

const taskCount = 3;
const minValue = 1;
const maxValue = 100;
const rules = 'Answer "yes" if a number is even, otherwise answer "no".';
const answerOptions = { yes: 'yes', no: 'no' };

const generateTasks = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => (isEven(number) ? answerOptions.yes : answerOptions.no),
);

const runGame = () => {
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
