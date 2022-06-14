// Our elements we want to interact with
const computer = document.getElementById("computer-choice")
const user = document.getElementById("user-choice")
const computerScore = document.getElementById("computer-score")
const userScore = document.getElementById("user-score")
const roundCount = document.getElementById("round")
const roundResult = document.getElementById("result")
const endScore = document.getElementById("end-score")
const gameOver = document.querySelector("#game-over")

const choices = document.querySelectorAll(".selections")

let computerPick
let userPick
let result
let userPoints = 0
let computerPoints = 0
let round = 1

choices.forEach(choice => choice.addEventListener("click", (event) => {
  userPick = event.target.id
  userChoice()
  computerChoice()
  compare()
}))

function userChoice() {
  if (userPick === "rock") {
    user.src = "assets/images/rps/rock.webp"
  }
  if (userPick === "paper") {
    user.src = "assets/images/rps/paper.webp"
  }
  if (userPick === "scissors") {
    user.src = "assets/images/rps/scissors.webp"
  }
}

function computerChoice() {
  const randomChoice = Math.floor(Math.random() * choices.length)
  if (randomChoice === 0) {
    computerPick = "rock"
    computer.src = "assets/images/rps/rock.webp"
  }
  if (randomChoice === 1) {
    computerPick = "paper"
    computer.src = "assets/images/rps/paper.webp"
  }
  if (randomChoice === 2) {
    computerPick = "scissors"
    computer.src = "assets/images/rps/scissors.webp"
  }
}

function compare() {
  if (computerPick === "rock" && userPick === "paper") {
    userPoints++
    result = "You win"
  } else if (computerPick === "paper" && userPick === "scissors") {
    userPoints++
    result = "You win"
  } else if (computerPick === "scissors" && userPick === "rock") {
    userPoints++
    result = "You win"
  } else if (computerPick === userPick) {
    result = "It's a draw"
  } else {
    computerPoints++
    result = "You lose"
  }

  endGame()
  round++
  roundCount.innerHTML = round
  roundResult.innerHTML = result
  computerScore.innerHTML = computerPoints
  userScore.innerHTML = userPoints
}

function endGame() {
  if (computerPoints === 5) {
    endScore.innerHTML = "YOU LOST"
    gameOver.style.display="block"
  } else if (userPoints === 5) {
    endScore.innerHTML = "YOU WON"
    gameOver.style.display="block"
  } else {
    return
  }
}