import Game, { states } from '../src/lib/Game';
import { createTask } from '../src/lib/utils';

const answerAndCheck = (game, tasks, answer, expectedState) => {
  const task = tasks[tasks.length - 1];

  const actualQuestion = game.giveQuestion();
  expect(actualQuestion).toEqual(task.question);

  const answeredGame = game.takeAnswer(answer);
  expect(answeredGame.fsm.current).toEqual(expectedState);
};

const answerLastAndCheckWin = (game, tasks) => {
  const task = tasks[tasks.length - 1];
  answerAndCheck(game, tasks, task.answer, states.win);
};

const answerLastAndCheckLoss = (game, tasks, wrongAnswer) =>
  answerAndCheck(game, tasks, wrongAnswer, states.loss);

const answerUntilLast = (game) => {
  if (game.tasks.length < 2) {
    return game;
  }

  const task = game.tasks[0];
  const answeredGame = game.takeAnswer(task.answer);

  return answerUntilLast(answeredGame);
};

describe('Game', () => {
  const rule = 'Who\'re you?';
  const allTasks = [
    createTask('Do you live on the Earth?', 'Yes'),
    createTask('Can you breathe?', 'Yes'),
    createTask('Are you a cow?', 'No'),
  ];
  const name = 'John Smith';
  const wrongAnswer = 'Yes';

  test('create the game', () => {
    const game = new Game(rule, []);
    expect(game.fsm.current).toEqual(states.notStarted);
  });

  test('start the game', () => {
    const game = new Game(rule, []).start();
    expect(game.fsm.current).toEqual(states.nameAsked);
  });

  test('accept a user name when there\'s no questions', () => {
    const game = new Game(rule, []).start().takeUserName(name);
    expect(game.fsm.current).toEqual(states.win);
    expect(game.userName).toEqual(name);
  });

  test('accept a user name when there\'s a single question', () => {
    const game = new Game(rule, allTasks.slice(0, 1)).start().takeUserName(name);
    expect(game.fsm.current).toEqual(states.questionAsked);
    expect(game.userName).toEqual(name);
  });

  test('the single question game', () => {
    const tasks = allTasks.slice(0, 1);
    const game = new Game(rule, tasks).start().takeUserName(name);
    answerLastAndCheckWin(game, tasks);
  });

  test('the multiple question game', () => {
    const game = new Game(rule, allTasks).start().takeUserName(name);
    const answeredGame = answerUntilLast(game);
    answerLastAndCheckWin(answeredGame, allTasks);
  });

  test('a wrong answer', () => {
    const game = new Game(rule, allTasks).start().takeUserName(name);
    const answeredGame = answerUntilLast(game);
    answerLastAndCheckLoss(answeredGame, allTasks, wrongAnswer);
  });

  test('a wrong call', () => {
    const game = new Game(rule, allTasks).start();

    expect(() => {
      game.takeAnswer(allTasks[0].answer);
    }).toThrow();
  });
});
