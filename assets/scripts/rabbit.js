// Get DOM elements we want to interact with
const board = document.getElementById("board")
const startOne = document.getElementById("start-one")
const startTwo = document.getElementById("start-two")
const startThree = document.getElementById("start-three")
const reset = document.getElementById("reset")

let time = document.getElementById("time")
let score = document.getElementById("score")
let endScore = document.getElementById("end-score")

// Declaring our global variables
let points = 0
let timeUp = false
let lastHole
let countdown
let difficulty
let numberOfHoles
let holesArray = []
let holes = []
let rabbits = []

/**
 * Function to generate the holes and rabbits
 * Can now, if desired, dynamically change the number of holes when levels are selected
 */

function createHoles() {
  for (let i = 0; i < numberOfHoles; i++) {
    const hole = document.createElement("div")
    hole.classList.add("hole")
    holesArray.push(hole)

    const rabbit = document.createElement("div")
    rabbit.classList.add("rabbit")

    board.appendChild(hole)
    hole.appendChild(rabbit)
    
  }
}

/** 
 * Function to pick a random hole to pop out of
 * Using Math.random to generate a random number up to the number of holes we're generating.
 * Math.floor makes it a whole integer
 */
function randomHole(holes) {
  let pickHole = Math.floor(Math.random() * numberOfHoles)
  let hole = holes[pickHole]

  // We don't want the rabbit to pop out of the same hole multiple times in a row
  if (hole === lastHole) {
    return randomHole(holes)
  }

  lastHole = hole
  return hole
}

/**
 * We want the rabbit to pop up at varying speeds within parameters we'll set
 */
function levelSpeed(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// Function to disable the level buttons
function disableButtons() {
  startOne.removeEventListener("click", levelOne)
  startTwo.removeEventListener("click", levelTwo)
  startThree.removeEventListener("click", levelThree)
  setTimeout(() => {
    startOne.addEventListener("click", levelOne)
    startTwo.addEventListener("click", levelTwo)
    startThree.addEventListener("click", levelThree)
  }, 30000)
}

/**
 * We want the user to be able to select from three levels of difficulty/speed.
 * The functions below are trigger by event listeners linked to buttons
 * They set the difficulty level, start the game and disable the buttons from being selected once the game starts
 */
function levelOne() {
  numberOfHoles = 6
  difficulty = "easy"
  disableButtons()
  startGame()
}

function levelTwo() {
  numberOfHoles = 9
  difficulty = "medium"
  disableButtons()
  startGame()
}

function levelThree() {
  numberOfHoles = 9
  difficulty = "hard"
  disableButtons()
  startGame()
}

/**
 * PopUp function to move the rabbits
 * First an if/else statement determines the speed based on the difficulty set previously
 * Then the "up" class is added to the selected hole to raise the rabbit and the setTimeout 
 * function removes that class based on the speed selected
 */

function popUp() {
  let speed
  if (difficulty === "easy") {
    speed = levelSpeed(1200, 2000)
  } else if (difficulty === "medium") {
    speed = levelSpeed(800, 1500)
  } else if (difficulty === "hard") {
    speed = levelSpeed(400, 1000)
  }
  
  let hole = randomHole(holes)
  hole.classList.add("up")
  setTimeout(() => {
    hole.classList.remove("up")
    if (!timeUp) popUp()
  }, speed)
}

/**
 * The slap function increments the points when a rabbit is clicked.
 * It also changes the image, then changes with the aid of the setTimeout function.
 * Similarly, pointerEvents are paused for the rabbit to prevent the user from clicking multiple times
 */
 function slap(){
  points++
  score.innerHTML = points
  this.style.backgroundImage = "url('assets/images/rabbit/rabbit-bonk.png')"
  this.style.pointerEvents = "none"
  setTimeout(() => {
    this.style.backgroundImage = "url('assets/images/rabbit/rabbit.png')"
    this.style.pointerEvents = "all"
  }, 900)
}

/**
 * And then the startGame function ties everything together.
 * When called by the level functions above, it starts a countdown, resets elements 
 * and calls the popUp function
 * The setInterval function within begins the countdown that eventually ends the game, stops the popUp
 * function and displays the game over screen with the user's score
 */
function startGame() {
  createHoles()
  holes = document.querySelectorAll(".hole")
  rabbits = document.querySelectorAll(".rabbit")
  rabbits.forEach(rabbit => rabbit.addEventListener("click", slap))
  countdown = 30
  time.innerHTML = countdown
  score.innerHTML = 0
  endScore.innerHTML = 0
  timeUp = false
  points = 0
  popUp()

  let startTime = setInterval(() => {
    countdown--
    time.innerHTML = countdown
    if (countdown < 1) {
      timeUp = true
      countdown = 0
      clearInterval(startTime)
      time.innerHTML = "Time up!"
      endScore.innerHTML = points
      document.querySelector("#game-over").style.display="block"
    }
  }, 1000)
}

/**
 * Event listeners to handle user interaction on the page:
 * Allow for interacting with the rabbits when they pop up.
 * Allow for page to be reloaded mid-game.
 * Allow for level select when buttons interacted on main page.
 * Could use onclick() in HTML for buttons but better practice to separate HTML and JS
 */
startOne.addEventListener("click", levelOne)
startTwo.addEventListener("click", levelTwo)
startThree.addEventListener("click",levelThree)
reset.addEventListener("click", () => {
  location.reload() 
})