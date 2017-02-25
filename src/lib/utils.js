import readlineSync from 'readline-sync';
import Game from './Game';

const randomInt = (min, max) => min + Math.floor(Math.random() * ((max - min) + 1));

const createTask = (question, answer) => ({ question, answer });

const taskGenerator = (generateData, generateQuestion, generateAnswer) => {
  const generate = (n) => {
    const iter = (i, acc) => {
      if (i < 0) {
        return acc;
      }

      const data = generateData();
      const task = createTask(generateQuestion(data), generateAnswer(data));

      return iter(i - 1, [...acc, task]);
    };

    return iter(n - 1, []);
  };

  return generate;
};

const playGame = (game) => {
  if (game.isGameOver()) {
    console.log(`${game.giveGoodbye()}`);
    return;
  }

  console.log(`Question: ${game.giveQuestion()}`);
  const userAnswer = readlineSync.question('Your answer: ');
  const answeredGame = game.takeAnswer(userAnswer);
  console.log(`${answeredGame.lastResult}\n`);

  playGame(answeredGame);
};

const runGame = (rule = '', tasks = []) => {
  const game = new Game(rule, tasks).start();
  console.log(game.giveGreeting());

  const userName = readlineSync.question('May I have your name? ');
  const readyGame = game.takeUserName(userName);
  console.log(readyGame.giveHelloToUser());

  playGame(readyGame);
};

export { runGame, taskGenerator, createTask, randomInt };
