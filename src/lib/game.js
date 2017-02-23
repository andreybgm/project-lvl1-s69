import readlineSync from 'readline-sync';

const run = (rules, tasks) => {
  const iter = (remainingTasks, name) => {
    if (remainingTasks.length === 0) {
      console.log(`Congratulations, ${name}!`);
      return;
    }

    const task = remainingTasks[0];

    console.log(`Question: ${task.question}`);
    const userAnswer = readlineSync.question('Your answer: ');

    if (userAnswer === task.answer) {
      console.log('Correct!');
      iter(remainingTasks.slice(1), name);
    } else {
      console.log([
        `'${userAnswer}' is a wrong answer ;(. `,
        `The correct answer was '${task.answer}'.\n`,
        `Let's try again, ${name}!`,
      ].join(''));
    }
  };

  console.log(`Welcome to the Brain Games!\n${rules}\n`);

  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!\n`);

  iter(tasks, name);
};

const taskGenerator = (exprGenerator, question, answer) => {
  const generator = (n) => {
    const iter = (i, acc) => {
      if (i < 0) {
        return acc;
      }

      const exprData = exprGenerator();
      const task = { question: question(exprData), answer: answer(exprData) };

      return iter(i - 1, [...acc, task]);
    };

    return iter(n - 1, []);
  };

  return generator;
};

export { run, taskGenerator };
