import { run, taskGenerator } from '../lib/game';
import { randomInt } from '../lib/utils';

const taskCount = 3;
const minValue = 1;
const maxValue = 100;
const rules = 'What is the result of the expression?';

const biExpression = (fn, fnStr) => ({
  question: args => `${args[0]} ${fnStr} ${args[1]}`,
  answer: args => (fn(args[0], args[1])).toString(),
});

const expressions = [
  biExpression((a, b) => a + b, '+'),
  biExpression((a, b) => a - b, '-'),
  biExpression((a, b) => a * b, '*'),
];

const generateTasks = taskGenerator(
  () => {
    const n = randomInt(0, expressions.length - 1);
    const expr = expressions[n];
    const args = [
      randomInt(minValue, maxValue),
      randomInt(minValue, maxValue),
    ];

    return { expr, args };
  },
  ({ expr, args }) => expr.question(args),
  ({ expr, args }) => expr.answer(args),
);

const runGame = () => {
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export default runGame;
