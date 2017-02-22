import readlineSync from 'readline-sync';
import { head, tail, isEmpty } from 'hexlet-pairs-data';
import brainTask from './brain-task';

const step = (tasks, name) => {
  if (isEmpty(tasks)) {
    console.log(`Congratulations, ${name}!`);
    return;
  }

  const task = head(tasks);
  const question = brainTask.question(task);
  const expectedAnswer = brainTask.answer(task);

  console.log(`Question: ${question}`);
  const userAnswer = readlineSync.question('Your answer: ');

  if (userAnswer === expectedAnswer) {
    console.log('Correct!');
    step(tail(tasks), name);
  } else {
    console.log(`'${userAnswer}' is a wrong answer ;(. The correct answer was '${expectedAnswer}'.`);
    console.log(`Let's try again, ${name}!`);
  }
};

const game = (rules, tasks) => {
  console.log(`Welcome to the Brain Games!\n${rules}\n`);

  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!\n`);

  step(tasks, name);
};

export default game;
