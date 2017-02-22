import * as lists from 'hexlet-pairs-data';
import * as pairs from 'hexlet-pairs';
import brainGame from '../lib/brain-game';
import { randomInt } from '../lib/utils';
import taskGenerator from '../lib/task-generator';

const taskCount = 3;
const minValue = 1;
const maxValue = 100;

const makeExpression = (question, answer) => pairs.cons(question, answer);
const expressionQuestion = expr => pairs.car(expr);
const expressionAnswer = expr => pairs.cdr(expr);

const biQuestion = (pair, f) => `${pairs.car(pair)} ${f} ${pairs.cdr(pair)}`;

const expressions = lists.l(
  makeExpression(
    args => biQuestion(args, '+'),
    args => (pairs.car(args) + pairs.cdr(args)).toString(),
  ),
  makeExpression(
    args => biQuestion(args, '-'),
    args => (pairs.car(args) - pairs.cdr(args)).toString(),
  ),
  makeExpression(
    args => biQuestion(args, '*'),
    args => (pairs.car(args) * pairs.cdr(args)).toString(),
  ),
);

const generator = taskGenerator(
  () => {
    const n = randomInt(0, lists.length(expressions) - 1);
    const expr = lists.get(n, expressions);
    const args = pairs.cons(
      randomInt(minValue, maxValue),
      randomInt(minValue, maxValue),
    );
    const exprData = pairs.cons(expr, args);

    return exprData;
  },
  (exprData) => {
    const expr = pairs.car(exprData);
    const args = pairs.cdr(exprData);

    return expressionQuestion(expr)(args);
  },
  (exprData) => {
    const expr = pairs.car(exprData);
    const args = pairs.cdr(exprData);

    return expressionAnswer(expr)(args);
  },
);

const game = () => {
  const rules = 'What is the result of the expression?';
  const tasks = generator(taskCount);
  brainGame(rules, tasks);
};

export default game;
