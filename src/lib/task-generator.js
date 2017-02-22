import { l, cons, reverse } from 'hexlet-pairs-data';
import brainTask from '../lib/brain-task';

const tasksGenerator = (exprGenerator, question, answer) => {
  const generator = (n) => {
    const iter = (i, acc) => {
      if (i < 0) {
        return acc;
      }

      const exprData = exprGenerator();
      const task = brainTask.make(question(exprData), answer(exprData));

      return iter(i - 1, cons(task, acc));
    };

    return reverse(iter(n - 1, l()));
  };

  return generator;
};

export default tasksGenerator;
