import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';

const game = () => {
  const rules = 'What is the result of the expression?';
  const tasks = l(
    brainTask.make('4 + 10', '14'),
    brainTask.make('25 - 11', '14'),
    brainTask.make('25 * 7', '175'),
  );
  brainGame(rules, tasks);
};

export default game;
