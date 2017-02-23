import brainGame from '../../lib/brain-game';
import { randomInt } from '../../lib/utils';
import taskGenerator from '../../lib/task-generator';
import { randomProgression } from './utils';

const taskCount = 3;
const minRange = 1;
const maxRange = 999;
const minStep = 2;
const maxStep = 50;
const count = 10;

const generator = taskGenerator(
  () => {
    const progression = randomProgression(
      minRange, maxRange, minStep, maxStep, count);
    const missingIndex = randomInt(0, progression.length - 1);

    return { progression, missingIndex };
  },
  ({ progression, missingIndex }) => progression.reduce(
      (acc, n, index) =>
        [
          acc.length === 0 ? '' : `${acc} `,
          index === missingIndex ? '..' : n,
        ].join(''),
        '',
    ),
  ({ progression, missingIndex }) => progression[missingIndex].toString(),
);

const game = () => {
  const rules = 'What number is missing in this progression?';
  const tasks = generator(taskCount);
  brainGame(rules, tasks);
};

export default game;
