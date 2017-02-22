import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';

const game = () => {
  const rules = 'Answer "yes" if a number is even, otherwise answer "no".';
  const tasks = l(
    brainTask.make('15', 'no'),
    brainTask.make('6', 'yes'),
    brainTask.make('15', 'no'),
  );
  brainGame(rules, tasks);
};

export default game;
