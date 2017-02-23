import { balance } from '../../../src/games/brain-balance/utils';

test('balance', () => {
  expect(balance(13)).toBe(22);
  expect(balance(114)).toBe(222);
  expect(balance(411)).toBe(222);
  expect(balance(-411)).toBe(-222);
  expect(balance(3434)).toBe(3344);
  expect(balance(215)).toBe(233);
  expect(balance(4181)).toBe(3344);
  expect(balance(355)).toBe(445);
});
