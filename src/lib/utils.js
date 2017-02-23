const isEven = n => n % 2 === 0;

const gcd = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const remainder = max % min;

  if (remainder === 0) {
    return min;
  }

  return gcd(min, remainder);
};

const randomInt = (min, max) =>
  min + Math.floor(Math.random() * ((max - min) + 1));

export { isEven, gcd, randomInt };
