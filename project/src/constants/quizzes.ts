import { Quiz } from '../types';

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'intro-algorithms-quiz',
    lessonId: 'intro-algorithms',
    passingScore: 70,
    points: 25,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is an algorithm?',
        options: [
          'A type of computer',
          'A step-by-step procedure for solving a problem',
          'A programming language',
          'A type of software'
        ],
        correctAnswer: 1,
        explanation: 'An algorithm is a step-by-step procedure for solving a problem or completing a task.',
        points: 5
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which of these is NOT a characteristic of algorithms?',
        options: [
          'Clear and unambiguous',
          'Must be infinite',
          'Must have input and output',
          'Must be effective'
        ],
        correctAnswer: 1,
        explanation: 'Algorithms must be finite - they must terminate after a finite number of steps.',
        points: 5
      },
      {
        id: 'q3',
        type: 'true-false',
        question: 'Algorithms can only be written in programming languages.',
        correctAnswer: 'false',
        explanation: 'Algorithms can be written in natural language, pseudocode, flowcharts, or programming languages.',
        points: 5
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'In the coffee-making algorithm example, what is the input?',
        options: [
          'The coffee mug',
          'The finished coffee',
          'Coffee grounds and water',
          'The coffee maker'
        ],
        correctAnswer: 2,
        explanation: 'The inputs are the materials needed: coffee grounds and water.',
        points: 5
      },
      {
        id: 'q5',
        type: 'code-completion',
        question: 'Complete the function to check if a number is positive:\n\ndef is_positive(number):\n    if number ___ 0:\n        return True\n    else:\n        return False',
        correctAnswer: '>',
        explanation: 'Use the greater than operator (>) to check if the number is positive.',
        points: 5
      }
    ]
  }
];