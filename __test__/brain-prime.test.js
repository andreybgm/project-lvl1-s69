import { isPrime } from '../src/brain-prime';

describe('isPrime', () => {
  test('should work', () => {
    expect(isPrime(1)).toBeTruthy();
    expect(isPrime(2)).toBeTruthy();
    expect(isPrime(17)).toBeTruthy();
    expect(isPrime(119)).toBeFalsy();
  });
});
