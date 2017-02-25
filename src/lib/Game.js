import StateMachine from 'javascript-state-machine';

const states = {
  notStarted: 'notStarted',
  nameAsked: 'nameAsked',
  questionAsked: 'questionAsked',
  loss: 'loss',
  win: 'win',
};

const events = {
  start: 'start',
  takeName: 'takeName',
  acceptAnswer: 'acceptAnswer',
  win: 'win',
  loss: 'loss',
};

const createFsm = (initial = states.notStarted) => StateMachine.create({
  initial,
  events: [
    { name: events.start, from: states.notStarted, to: states.nameAsked },
    { name: events.takeName, from: states.nameAsked, to: states.questionAsked },
    { name: events.acceptAnswer, from: states.questionAsked, to: states.questionAsked },
    { name: events.win, from: [states.nameAsked, states.questionAsked], to: events.win },
    { name: events.loss, from: states.questionAsked, to: states.loss },
  ],
});

const sendFsmEvent = (fsm, event) => {
  const newFsm = createFsm(fsm.current);
  newFsm[event](); // Danger: mutation

  return newFsm;
};

const correctMessage = 'Correct!';

export default class Game {
  constructor(rule = '', tasks = [], fsm, userName = '', lastResult = '') {
    this.rule = rule;
    this.tasks = tasks;
    this.fsm = fsm || createFsm();
    this.userName = userName;
    this.lastResult = lastResult;
  }

  start() {
    const newFsm = sendFsmEvent(this.fsm, events.start);
    return new Game(this.rule, this.tasks, newFsm);
  }

  takeUserName(userName) {
    const event = this.tasks.length > 0 ? events.takeName : events.win;
    const newFsm = sendFsmEvent(this.fsm, event);
    return new Game(this.rule, this.tasks, newFsm, userName);
  }

  giveQuestion() {
    return this.tasks.length > 0 ? this.tasks[0].question : '';
  }

  takeAnswer(answer) {
    const task = this.tasks[0];
    const correctAnswer = task.answer === answer;
    const lastTask = this.tasks.length === 1;

    if (correctAnswer && lastTask) {
      const newFsm = sendFsmEvent(this.fsm, events.win);
      return new Game(this.rule, this.tasks, newFsm, this.userName, correctMessage);
    } else if (correctAnswer) {
      const newFsm = sendFsmEvent(this.fsm, events.acceptAnswer);
      return new Game(this.rule, this.tasks.slice(1), newFsm, this.userName, correctMessage);
    }

    const lastResult = [
      `'${answer}' is a wrong answer ;(. `,
      `The correct answer was '${correctAnswer}'.`,
    ].join('');
    const newFsm = sendFsmEvent(this.fsm, events.loss);
    return new Game(this.rule, this.tasks, newFsm, this.userName, lastResult);
  }

  giveGreeting() {
    return ['Welcome to the Brain Games!\n', this.rule ? `${this.rule}\n` : ''].join('');
  }

  giveHelloToUser() {
    return `Hello, ${this.userName}!\n`;
  }

  giveGoodbye() {
    if (this.fsm.current === states.win) {
      return `Congratulations, ${this.userName}!`;
    } else if (this.fsm.current === states.loss) {
      return `Let's try again, ${this.userName}!`;
    }

    return '';
  }

  isGameOver() {
    return [states.win, states.loss].includes(this.fsm.current);
  }
}

export { states };
