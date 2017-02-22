import { l } from 'hexlet-pairs-data';
import brainGame from '../lib/brain-game';
import brainTask from '../lib/brain-task';

const answer = n => n.toString();

const game = () => {
  const rules = 'What is the result of the expression?';
  const tasks = l(
    brainTask.make('4 + 10', answer(4 + 10)),
    brainTask.make('25 - 11', answer(25 - 11)),
    brainTask.make('25 * 7', answer(25 * 7)),
  );
  brainGame(rules, tasks);
};

export default game;
