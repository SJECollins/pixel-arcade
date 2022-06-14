// Our elements we want to interact with
const computer = document.getElementById("computer-choice")
const user = document.getElementById("user-choice")
const computerScore = document.getElementById("computer-score")
const userScore = document.getElementById("user-score")
const roundResult = document.getElementById("result")
const endScore = document.getElementById("end-score")

const choices = document.querySelectorAll(".selections")

let computerPick
let userPick
let result
let userPoints
let computerPoints

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
    computer.src = "asses/images/rps/paper.webp"
  }
  if (randomChoice === 2) {
    computerPick = "scissors"
    computer.src = "assets/images/rps/scissors.webp"
  }
}