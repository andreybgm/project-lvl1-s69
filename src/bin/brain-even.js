#! /usr/bin/env node
import readlineSync from 'readline-sync';

const isEven = n => n % 2 === 0;

const step = (numbers, name) => {
  if (numbers.length === 0) {
    console.log(`Congratulations, ${name}!`);
    return;
  }

  const number = numbers[0];
  const expected = isEven(number) ? 'yes' : 'no';

  console.log(`Question: ${number}`);
  const answer = readlineSync.question('Your answer: ');

  if (answer === expected) {
    console.log('Correct!');
    step(numbers.slice(1), name);
  } else {
    console.log(`'${answer}' is a wrong answer ;(. The correct answer was '${expected}'.`);
    console.log(`Let's try again, ${name}!`);
  }
};

const startGame = () => {
  console.log('Welcome to the Brain Games!');
  console.log('Answer "yes" if a number is even, otherwise answer "no".\n');

  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!\n`);

  step([15, 6, 15], name);
};

startGame();
