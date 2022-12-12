var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {
  timeLeft = 75;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 15;
  next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 20;
  next();
}

//loops through the questions
function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";

  for (
    var buttonLoop = 0;
    buttonLoop < questions[currentQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonCode = buttonCode.replace(
      "[CHOICE]",
      questions[currentQuestion].choices[buttonLoop]
    );
    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode;
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}
