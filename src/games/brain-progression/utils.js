import { randomInt } from '../../lib/utils';

const progression = (start, max, step, count) => {
  if (start > max) {
    return [];
  }

  const iter = (i, n, acc) => {
    if (i < 1 || n + step > max) {
      return acc;
    }

    return iter(i - 1, n + step, [...acc, n + step]);
  };

  return iter(count - 1, start, [start]);
};

const defaultRandomizer = ['start', 'step']
  .reduce((acc, key) => ({ ...acc, [key]: randomInt }), {});

const randomProgression = (rangeStart, rangeEnd, minStep, maxStep, count,
  randomizer = defaultRandomizer) => {
  const step = randomizer.step(minStep, maxStep);
  const rightmostStart = rangeEnd - (step * (count - 1));
  const maxStart = Math.max(rangeStart, rightmostStart);
  const start = randomizer.start(rangeStart, maxStart);
  const pr = progression(start, rangeEnd, step, count);

  return pr;
};

export { progression, randomProgression };
