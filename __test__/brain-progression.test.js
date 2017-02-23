import {
  makeProgression,
  randomProgression,
} from '../src/brain-progression';

describe('progression', () => {
  test('should work', () => {
    expect(makeProgression(2, 6, 1, 5)).toEqual([2, 3, 4, 5, 6]);
    expect(makeProgression(2, 20, 3, 5)).toEqual([2, 5, 8, 11, 14]);
    expect(makeProgression(2, 5, 4, 3)).toEqual([2]);
    expect(makeProgression(10, 9, 1, 5)).toEqual([]);
  });
});

describe('randomProgression', () => {
  const testRandomProgression = (params, start, step) => {
    const randomizer = { start: jest.fn(), step: jest.fn() };
    randomizer.start.mockReturnValue(start.value);
    randomizer.step.mockReturnValue(step.value);

    const expectedProgression = makeProgression(
      start.value, params.rangeEnd,
      step.value, params.count,
    );
    const actualProgression = randomProgression(params, randomizer);

    expect(randomizer.start.mock.calls[0]).toEqual([start.min, start.max]);
    expect(randomizer.step.mock.calls[0]).toEqual([step.min, step.max]);
    expect(actualProgression).toEqual(expectedProgression);
  };

  test('should work', () => {
    testRandomProgression(
      { rangeStart: 10, rangeEnd: 100, minStep: 1, maxStep: 3, count: 5 },
      { min: 10, max: 92, value: 20 },
      { min: 1, max: 3, value: 2 },
    );
    testRandomProgression(
      { rangeStart: 10, rangeEnd: 16, minStep: 1, maxStep: 3, count: 5 },
      { min: 10, max: 10, value: 10 },
      { min: 1, max: 3, value: 2 },
    );
  });
});
