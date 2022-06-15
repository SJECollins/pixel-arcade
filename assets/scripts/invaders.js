// Our HTML elements
const board = document.getElementById("board")
const result = document.getElementById("result")
const score = document.getElementById("score")
const endScore = document.getElementById("end-score")
const startButton = document.getElementById("start")
const reset = document.getElementById("reset")
const fire = document.getElementById("fire")
const left = document.getElementById("left")
const right = document.getElementById("right")
const wrap = document.getElementById("wrap")

// Our global variables
let currentPosition = 217
let width = 15
let direction = 1
let goingRight = true
let invadersRemoved = []
let points = 0
let gameEnd = ""
let invadersId = 0
let intervalTime = 0
let noWrap = true

let tankHealth = 30
let bossHealth = 30
let bossId = 0
let bossSpawn = 14
let bossGoingRight = true
let bossDirection = 1
let bossDied = false

function changeWrap() {
  if (noWrap === true) {
    noWrap = false
    wrap.innerHTML = "ON"
    return
  } else if (noWrap === false) {
    noWrap = true
    wrap.innerHTML = "OFF"
  }
  return 
}

// Our for loop creating our board
for (let i = 0; i < 225; i++) {
    const square = document.createElement("div")
    board.appendChild(square)
}

const squares = Array.from(document.querySelectorAll("#board div"))

// Our invaders array
const invaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

// Function to add invaders to the board
function draw() {
    for (let i = 0; i < invaders.length; i++) {
        if (!invadersRemoved.includes(i)){
            squares[invaders[i]].classList.add("invader")
        }
    }
}

// Function to remove invaders from the board
function remove() {
    for (let i = 0; i < invaders.length; i++) {
        squares[invaders[i]].classList.remove("invader")
    }
}

/**
 * Function to move the tank across the bottom of the screen
 * Can control the tank with arrows, a and d keys or the arrows on the screen
 */
function moveTank(event) {
    squares[currentPosition].classList.remove("tank")
    if ((event.key === "ArrowLeft" || event.key === "a" || event.target.id === "left")
        && currentPosition % width !== 0){
      currentPosition -= 1
    }
    if ((event.key === "ArrowRight" || event.key === "d" || event.target.id === "right") 
        && currentPosition % width < width - 1) {
      currentPosition += 1
    }
    squares[currentPosition].classList.add("tank")
} 

// Move the invaders back and forth across the screen
function moveInvaders() {
    const leftEdge = invaders[0] % width === 0
    const rightEdge = invaders[invaders.length - 1] % width === width - 1
    remove()

    // Bounces the invaders off the edges of the screen. If noWrap === false invaders can wrap instead
    if (rightEdge && goingRight && noWrap === true) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width + 1
            direction = - 1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight && noWrap === true) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < invaders.length; i++) {
        invaders[i] += direction
    }
    
    draw()
    checkEnd()
}

function spawnBoss() {
  bossId = setInterval(moveBoss, intervalTime)
  let bossPosition = bossSpawn
  
  function moveBoss() {
    squares[bossPosition].classList.remove("boss")
    bossPosition += bossDirection
    squares[bossPosition].classList.add("boss") 

    if (bossPosition === 29 && bossGoingRight) {
    bossDirection = - 1
    bossGoingRight = false
    }
    
    if (bossPosition === 15 && !bossGoingRight) {
    bossDirection  = + 1
    bossGoingRight = true
    }
  }
}
/**
 * shoot function to create and move the missile and kill invaders.
 * Can trigger with up arrow, space or fire button on page
 */ 

function shoot(event) {
  let missileId
  let missilePosition = currentPosition

  function movemissile() {
      squares[missilePosition].classList.remove("missile")
      missilePosition -= width
      squares[missilePosition].classList.add("missile")

      if (missilePosition <= 14) {
        squares[missilePosition].classList.remove("missile")
        clearInterval(missileId)
        return
      }
      
      if (squares[missilePosition].classList.contains("invader")) {
          squares[missilePosition].classList.remove("missile")
          squares[missilePosition].classList.remove("invader")
          squares[missilePosition].classList.add("boom")

          setTimeout(() => squares[missilePosition].classList.remove("boom"), 200)
          clearInterval(missileId)

          const invaderRemoved = invaders.indexOf(missilePosition)
          invadersRemoved.push(invaderRemoved)
          points++
          score.innerHTML = points
      }

      if (squares[missilePosition].classList.contains("boss") && bossHealth > 10) {
        squares[missilePosition].classList.remove("missile")
        squares[missilePosition].classList.add("boom")
        bossHealth -= 10
        setTimeout(() => squares[missilePosition].classList.remove("boom"), 200)
        clearInterval(missileId)
        
        } else if (squares[missilePosition].classList.contains("boss") && bossHealth <= 10) {
        squares[missilePosition].classList.remove("missile")
        squares[missilePosition].classList.remove("boss")
        squares[missilePosition].classList.add("boom")
        clearInterval(bossId)
        setTimeout(() => squares[missilePosition].classList.remove("boom"), 200)
        clearInterval(missileId)
        bossDied = true
        points++
        score.innerHTML = points
        }
      
  }
  if (event.key === "ArrowUp" || event.keyCode === 32 || event.target.id === "fire") {
    missileId = setInterval(movemissile, 100)
    document.removeEventListener("keydown", shoot)
    fire.removeEventListener("click", shoot)
    setTimeout(() => {
      document.addEventListener("keydown", shoot)
      fire.addEventListener("click", shoot)
    }, intervalTime)
  }
}

// Conditions to trigger the endGame function
function checkEnd() {
   if (squares[currentPosition].classList.contains("invader","tank")) {
        gameEnd = "DIED"
        endGame()
    }

    for (let i = 0; i < invaders.length; i++) {
        if (invaders[i] > squares.length) {
            gameEnd = "DIED"
            endGame()
        }
    }

    if (invadersRemoved.length === invaders.length && bossDied) {
        gameEnd = "WIN"
        endGame()
    }
}

// startGame function 
function startGame() {
  startButton.removeEventListener("click", startGame)
  intervalTime = 500
  invadersId = setInterval(moveInvaders, intervalTime)
  points = 0
  gameEnd = ""
  
  setTimeout(() => {
    spawnBoss()
  }, 6000)
}

// endGame function
function endGame() {
  clearInterval(bossId)
  clearInterval(invadersId)
  result.innerHTML = gameEnd
  endScore.innerHTML = points
  document.querySelector("#game-over").style.display="block"
}

squares[currentPosition].classList.add("tank")
//Our event listeners
document.addEventListener("keydown", shoot)
document.addEventListener("keydown", moveTank)
startButton.addEventListener("click", startGame)
fire.addEventListener("click", shoot)
left.addEventListener("click", moveTank)
right.addEventListener("click", moveTank)
reset.addEventListener("click", () => {
  location.reload() 
})