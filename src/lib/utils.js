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

export { isEven, gcd, randomInt, balance };
