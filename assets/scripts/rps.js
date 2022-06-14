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
const threeRounds = document.getElementById("three-rounds")
const fiveRounds = document.getElementById("five-rounds")
const roundText = document.getElementById("round-text")

threeRounds.addEventListener("click", playThree)
fiveRounds.addEventListener("click", playFive)

let computerPick
let userPick
let result
let userPoints = 0
let computerPoints = 0
let round = 1
let numberOfRounds = 3

function playThree() {
  threeRounds.removeEventListener("click", playThree)
  fiveRounds.removeEventListener("click", playFive)
  threeRounds.classList.add("current-level")
  numberOfRounds = 3
  roundText.innerHTML = "Three"
}

function playFive() {
  threeRounds.removeEventListener("click", playThree)
  fiveRounds.removeEventListener("click", playFive)
  fiveRounds.classList.add("current-level")
  numberOfRounds = 5
  roundText.innerHTML = "Five"
}

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
  if (computerPoints === numberOfRounds) {
    endScore.innerHTML = "YOU LOST"
    gameOver.style.display="block"
  } else if (userPoints === numberOfRounds) {
    endScore.innerHTML = "YOU WON"
    gameOver.style.display="block"
  } else {
    return
  }
}

reset.addEventListener("click", () => {
  location.reload() 
})