import { car, cdr, cons } from 'hexlet-pairs';

const make = (question, answer) => cons(question, answer);
const question = task => car(task);
const answer = task => cdr(task);

export default { make, question, answer };
