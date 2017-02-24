import { runGame, taskGenerator, randomInt } from '../lib/utils';

const minValue = 1;
const maxValue = 100;
const answerOptions = { yes: 'yes', no: 'no' };
const rule = [
  `Answer "${answerOptions.yes}" if a number is even, `,
  `otherwise answer "${answerOptions.no}".`,
].join('');

const isEven = n => n % 2 === 0;

const generateTasks = taskGenerator(
  () => randomInt(minValue, maxValue),
  number => number.toString(),
  number => (isEven(number) ? answerOptions.yes : answerOptions.no),
);

export default (taskCount = 0) => {
  const tasks = generateTasks(taskCount);
  runGame(rule, tasks);
};
