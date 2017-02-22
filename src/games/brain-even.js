import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';
import { isEven } from '../lib/utils';

const answer = n => (isEven(n) ? 'yes' : 'no');

const game = () => {
  const rules = 'Answer "yes" if a number is even, otherwise answer "no".';
  const tasks = l(
    brainTask.make('15', answer(15)),
    brainTask.make('6', answer(6)),
    brainTask.make('15', answer(15)),
  );
  brainGame(rules, tasks);
};

export default game;
