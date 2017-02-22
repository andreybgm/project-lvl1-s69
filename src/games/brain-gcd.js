import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';
import { gcd } from '../lib/utils';

const answer = (a, b) => gcd(a, b).toString();

const game = () => {
  const rules = 'Find the greatest common divisor of the given numbers.';
  const tasks = l(
    brainTask.make('25 50', answer(25, 50)),
    brainTask.make('100 52', answer(100, 52)),
    brainTask.make('3 9', answer(3, 9)),
  );
  brainGame(rules, tasks);
};

export default game;
