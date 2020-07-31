
let btn_startGame = document.getElementById("start_game");
let btn_rock = document.getElementById("rock");
let btn_paper = document.getElementById("paper");
let btn_scissors = document.getElementById("scissors");

let scr_img_userOptionSelected = document.getElementById("user_option_selected");
let scr_img_cpuOptionSelected = document.getElementById("cpu_option_selected");

let userOptionSelected = null;
let cpuRandomOptionSelected = null;

let userScore = 0;
let cpuScore = 0;
let gameResult = null;
let matchNumber = 0;

/* OPTIONS */
const OPTIONS = {
  ROCK: Symbol('Rock'),
  PAPER: Symbol('Paper'),
  SCISSORS: Symbol('Scissors')
};

const RESULT_OPTIONS = {
  TIE: Symbol.for('Tie'),
  CPU_WIN: Symbol.for('Cpu win'),
  USER_WIN: Symbol.for('User win')
};

/* GAME LOGIC */

function game(userOption, cpuOption) {
  matchNumber++;
  if (userOption === cpuOption) {
    gameResult = RESULT_OPTIONS.TIE;
  } else if (rockBeatsScissors(userOption, cpuOption) || 
              paperBeatsrock(userOption, cpuOption) ||
              scissorsBeatspaper(userOption, cpuOption)) {
    gameResult = RESULT_OPTIONS.USER_WIN;
    userScore++;
  } else {
    gameResult = RESULT_OPTIONS.CPU_WIN;
    cpuScore++;
  }
}

let rockBeatsScissors = function (userOption, cpuOption) {
  return userOption === OPTIONS.ROCK && cpuOption === OPTIONS.SCISSORS;
}

let paperBeatsrock = function (userOption, cpuOption) {
  return userOption === OPTIONS.PAPER && cpuOption === OPTIONS.ROCK;
}

let scissorsBeatspaper = function (userOption, cpuOption) {
  return userOption === OPTIONS.SCISSORS && cpuOption === OPTIONS.PAPER;
}

/* CPU LOGIC */

function selectCpuOption() {
  cpuRandomOptionSelected = randomProperty(OPTIONS);
  display_cpu_option(cpuRandomOptionSelected);
}

let randomProperty = function (obj) {
  let keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

function display_cpu_option(optionSelected) {
  switch (optionSelected) {
    case OPTIONS.ROCK:
      scr_img_cpuOptionSelected.src = "./img/rock.png";
      break;
    case OPTIONS.PAPER:
      scr_img_cpuOptionSelected.src = "./img/paper.png";
      break;
    case OPTIONS.SCISSORS:
      scr_img_cpuOptionSelected.src = "./img/scissors.png";
      break;
  }
}

/* UPDATE RESULTS */

function showResult() {
  document.getElementById("match_number").innerText = matchNumber;
  document.getElementById("match_result").innerText = Symbol.keyFor(gameResult);
  document.getElementById("user_score").innerText = userScore;
  document.getElementById("cpu_score").innerText = cpuScore;
}

/* FUNCTIONS ONCLICK USER BUTTON */

btn_rock.onclick = function () {
  userOptionSelected = OPTIONS.ROCK;
  scr_img_userOptionSelected.src = "./img/rock.png";
}

btn_paper.onclick = function () {
  userOptionSelected = OPTIONS.PAPER;
  scr_img_userOptionSelected.src = "./img/paper.png";
}

btn_scissors.onclick = function () {
  userOptionSelected = OPTIONS.SCISSORS;
  scr_img_userOptionSelected.src = "./img/scissors.png";
}

btn_startGame.onclick = function () {
  
  if (userOptionSelected) {
    selectCpuOption();
    game(userOptionSelected, cpuRandomOptionSelected);
  } else {
    alert("Select an option");
  }
  showResult();
}
