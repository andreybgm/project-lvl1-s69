import {
  progression,
  randomProgression,
} from '../../../src/games/brain-progression/utils';

test('progression', () => {
  expect(progression(2, 6, 1, 5)).toEqual([2, 3, 4, 5, 6]);
  expect(progression(2, 20, 3, 5)).toEqual([2, 5, 8, 11, 14]);
  expect(progression(2, 5, 4, 3)).toEqual([2]);
  expect(progression(10, 9, 1, 5)).toEqual([]);
});

const testRandomProgression = (input, startRandom, stepRandom) => {
  const randomizer = { start: jest.fn(), step: jest.fn() };
  randomizer.start.mockReturnValue(startRandom.returned);
  randomizer.step.mockReturnValue(stepRandom.returned);

  const expectedProgression = progression(
    startRandom.returned, input.rangeEnd,
    stepRandom.returned, input.count,
  );
  const actualProgression = randomProgression(
    input.rangeStart, input.rangeEnd,
    input.minStep, input.maxStep,
    input.count, randomizer,
  );

  expect(randomizer.start.mock.calls[0])
    .toEqual([startRandom.min, startRandom.max]);
  expect(randomizer.step.mock.calls[0])
    .toEqual([stepRandom.min, stepRandom.max]);
  expect(actualProgression).toEqual(expectedProgression);
};

test('randomProgression', () => {
  testRandomProgression(
    { rangeStart: 10, rangeEnd: 100, minStep: 1, maxStep: 3, count: 5 },
    { min: 10, max: 92, returned: 20 },
    { min: 1, max: 3, returned: 2 },
  );
  testRandomProgression(
    { rangeStart: 10, rangeEnd: 16, minStep: 1, maxStep: 3, count: 5 },
    { min: 10, max: 10, returned: 10 },
    { min: 1, max: 3, returned: 2 },
  );
});
