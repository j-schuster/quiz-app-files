const initialData = {
  Geography: {
    title: 'Geography',
    questions: [
      {
        question: 'Is South Africa a country?',
        answer: 'No, it is just a region',
        correctAnswer: 'false'
      },
      {
        question: 'Which US State is next to California?',
        answer: 'New York',
        correctAnswer: 'false'
      }
    ] 
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        correctAnswer: 'true'
      },
      {
        question: 'What is varibale',
        answer: 'Something that stores information.',
        correctAnswer: 'true'
      }
    ]
  }
}

export const getData = () => {
  return initialData
}