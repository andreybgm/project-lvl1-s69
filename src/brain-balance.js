import { run, taskGenerator } from './lib/game';
import { randomInt } from './lib/utils';

const balance = (n) => {
  const nArr = Math.abs(n).toString().split('')
    .map(v => Number.parseInt(v, 10));
  const sign = n < 0 ? '-' : '';

  const iter = (acc) => {
    const min = Math.min(...acc);
    const max = Math.max(...acc);
    const isBalanced = max - min < 2;

    if (isBalanced) {
      const newStr = [...acc].sort().map(x => x.toString()).join('');
      const newN = Number.parseInt(`${sign}${newStr}`, 10);

      return newN;
    }

    const indexOfMin = acc.indexOf(min);
    const indexOfMax = acc.indexOf(max);
    const minIndex = Math.min(indexOfMin, indexOfMax);
    const maxIndex = Math.max(indexOfMin, indexOfMax);
    const computeNewMinMax = index =>
      (acc[index] === min ? acc[index] + 1 : acc[index] - 1);
    const newAcc = [
      ...(acc.slice(0, minIndex)),
      computeNewMinMax(minIndex),
      ...(acc.slice(minIndex + 1, maxIndex)),
      computeNewMinMax(maxIndex),
      ...(acc.slice(maxIndex + 1)),
    ];

    return iter(newAcc);
  };

  return iter(nArr);
};

const runGame = () => {
  const taskCount = 3;
  const minValue = 100;
  const maxValue = 9999;

  const generateTasks = taskGenerator(
    () => randomInt(minValue, maxValue),
    number => number.toString(),
    number => balance(number).toString(),
  );

  const rules = 'Balance the given number.';
  const tasks = generateTasks(taskCount);
  run(rules, tasks);
};

export { balance };
export default runGame;
