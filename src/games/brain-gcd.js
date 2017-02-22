import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';

const game = () => {
  const rules = 'Find the greatest common divisor of the given numbers.';
  const tasks = l(
    brainTask.make('25 50', '25'),
    brainTask.make('100 52', '4'),
    brainTask.make('3 9', '3'),
  );
  brainGame(rules, tasks);
};

export default game;
