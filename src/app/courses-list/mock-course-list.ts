import {Course} from './course.model';

export const COURSES: Course[] = [
  { name: 'Interactive Web Applications', users: [{ email: 'lazaro.amor1@um.es',  grade: '5'}, { email: 'inixio@um.es', grade: '5'},
      { email: 'octavio@um.es', grade: '5'}, { email: 'professor@um.es', grade: ''}]},
  { name: 'Computer Architecture', users: [{ email: 'lazaro.amor1@um.es', grade: '4'}, { email: 'antonio@um.es', grade: '3'}] },
  { name: 'Software Engineering', users: [{ email: 'lazaro.amor1@um.es', grade: '4'}, {email: 'octavio@um.es', grade: '4.5'}]},
  { name: 'Modelling and Analysis of Information Systems', users: [{ user: 'Lázaro Amor', grade: '4.5'}]},
  { name: 'Physics', users: [{ email: 'lazaro.amor1@um.es', grade: '3.5'}]}
];

