var data = [
  {
    clue: 'When declaring a function, you can include ___ to make the function to expect some values when being called.',
    answer: 'parameters',
    x: 6,
    y: 1,
    orientation: 'across',
    legend: 1
  },
  {
    clue: 'Using ___ will make your code more reusable.',
    answer: 'functions',
    x: 1,
    y: 6,
    orientation: 'across',
    legend: 5
  },
  {
    clue: 'A group of the same things.',
    answer: 'array',
    x: 15,
    y: 8,
    orientation: 'across',
    legend: 9
  },
  {
    clue: 'typeof Array.',
    answer: 'object',
    x: 3,
    y: 9,
    orientation: 'across',
    legend: 10
  },
  {
    clue: 'One of the differences between String and Array.',
    answer: 'immutability',
    x: 6,
    y: 11,
    orientation: 'across',
    legend: 11
  },
  {
    clue: 'The result after calling a function.',
    answer: 'return',
    x: 8,
    y: 1,
    orientation: 'down',
    legend: 2
  },
  {
    clue: 'return statement will ___ the execution of a function.',
    answer: 'end',
    x: 13,
    y: 1,
    orientation: 'down',
    legend: 3
  },
  {
    clue: 'Best practice when naming an Array.',
    answer: 'plural',
    x: 18,
    y: 4,
    orientation: 'down',
    legend: 4
  },
  {
    clue: 'Just as with String, you can do ___ on Array.',
    answer: 'indexing',
    x: 6,
    y: 6,
    orientation: 'down',
    legend: 6
  },
  {
    clue: 'Use ___ to detect whether an Array is empty or not.',
    answer: 'length',
    x: 10,
    y: 7,
    orientation: 'down',
    legend: 7
  },
  {
    clue: 'Banana, Orange, Grapes, Apple, Kiwi.',
    answer: 'fruits',
    x: 16,
    y: 7,
    orientation: 'down',
    legend: 8
  },
];

function createTable(questions) {
  const maxRowCol = [0, 0];

  questions.forEach(question => {
    let tempx = question.x;
    let tempy = question.y;

    question.orientation === 'across'
      ? tempx += question.answer.length - 1
      : tempy += question.answer.length - 1;

    if (tempx > maxRowCol[0]) {
      maxRowCol[0] = tempx;
    }

    if (tempy > maxRowCol[1]) {
      maxRowCol[1] = tempy;
    }
  });

  let tableOutput = '';
  for (let i = 0; i < maxRowCol[1]; i++) {
    let temp = '';
    for (let j = 0; j < maxRowCol[0]; j++) {
      temp += '<td></td>'
    }
    temp = '<tr>' + temp + '</tr>';
    tableOutput += temp;
  }
  tableOutput = '<table id=crosswords-table>' + tableOutput + '</table>';
  return tableOutput + '<h3>Press Enter to check the answer</h3>';
}

function createClues(questions) {
  let across = '';
  let down = '';

  questions.forEach(question => {
    if (question.orientation === 'across') {
      across += `<li value="${question.legend}">${question.clue}</li>`;
    } else {
      down += `<li value="${question.legend}">${question.clue}</li>`;
    }
  });

  across = '<ol id="across">' + across + '</ol>';
  down = '<ol id="down">' + down + '</ol>';

  let output = '<h2>Across</h2>' + across + '<h2>Down</h2>' + down;
  return output;
}

function putInputs(table, questions) {
  const input = '<input maxlength="1" val="" type="text" tabindex="-1" onClick="this.select();"></input>';
  questions.forEach(question => {
    if (question.orientation === 'across') {
      for (let i = question.x - 1; i < question.x - 1 + question.answer.length; i++) {
        table.tBodies[0].rows[question.y - 1].cells[i].classList.add(`${question.orientation}-${question.legend}`);
        table.tBodies[0].rows[question.y - 1].cells[i].innerHTML = input;
      }
    } else {
      for (let i = question.y - 1; i < question.y - 1 + question.answer.length; i++) {
        table.tBodies[0].rows[i].cells[question.x - 1].classList.add(`${question.orientation}-${question.legend}`);
        table.tBodies[0].rows[i].cells[question.x - 1].innerHTML = input;
      }
    }
  });

  questions.forEach(question => {
    table.tBodies[0].rows[question.y - 1].cells[question.x - 1].innerHTML += `<span>${question.legend}</span>`;
  });
}

function isRight(questions) {
  let rightAnswers = [];
  let falseAnswers = [];

  for (let i = 0; i < questions.length; i++) {
    let inputs = document.getElementsByClassName(`${questions[i].orientation}-${questions[i].legend}`);
    let answer = '';
    for (let j = 0; j < inputs.length; j++) {
      answer += inputs[j].children[0].value;
    }

    if (answer.toLowerCase() === questions[i].answer.toLowerCase()) {
      rightAnswers.push(`${questions[i].orientation}-${questions[i].legend}`);
    } else {
      falseAnswers.push(`${questions[i].orientation}-${questions[i].legend}`);
    }
  }

  for (let i = 0; i < falseAnswers.length; i++) {
    let inputs = document.getElementsByClassName(falseAnswers[i]);
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].children[0].classList.remove('done');
    }
  }

  for (let i = 0; i < rightAnswers.length; i++) {
    let inputs = document.getElementsByClassName(rightAnswers[i]);
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].children[0].classList.add('done');
    }
  }
}

function gotoIndex(x, y) {
  console.log(x, y);
}

let crosswordsContainer = document.getElementById('crosswords-container');
let crosswordsClues = document.getElementById('crosswords-clues');
crosswordsContainer.innerHTML = createTable(data);
crosswordsClues.innerHTML = createClues(data);
let crosswordsTable = document.getElementById('crosswords-table');
putInputs(crosswordsTable, data);

document.onkeypress = function (e) {
  e.key === 'Enter'
    ? isRight(data)
    : {};
};