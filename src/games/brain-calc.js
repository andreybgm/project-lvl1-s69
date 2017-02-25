import { runGame, taskGenerator, randomInt } from '../lib/utils';

const minValue = 1;
const maxValue = 100;
const rule = 'What is the result of the expression?';

const biExpression = (fn, fnStr) => ({
  calcQuestion: args => `${args[0]} ${fnStr} ${args[1]}`,
  calcAnswer: args => (fn(args[0], args[1])).toString(),
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
  ({ expr, args }) => expr.calcQuestion(args),
  ({ expr, args }) => expr.calcAnswer(args),
);

export default (taskCount = 0) => {
  const tasks = generateTasks(taskCount);
  runGame(rule, tasks);
};
