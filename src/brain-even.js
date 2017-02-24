import { run, taskGenerator } from './lib/game';
import { isEven, randomInt } from './lib/utils';

const runGame = () => {
  const taskCount = 3;
  const minValue = 1;
  const maxValue = 100;

  const generateTasks = taskGenerator(
    () => randomInt(minValue, maxValue),
    number => number.toString(),
    number => (isEven(number) ? 'yes' : 'no'),
  );

  const rules = 'Answer "yes" if a number is even, otherwise answer "no".';
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
