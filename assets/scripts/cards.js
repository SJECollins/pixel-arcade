// Get elements from HTML
const levelEasy = document.getElementById("easy")
const levelMedium = document.getElementById("medium")
const levelHard = document.getElementById("hard")

let timer = document.getElementById("timer")
let matches = document.getElementById("matches")
let attempts = document.getElementById("flips")
let endScore = document.getElementById("end-score")
let endTime = document.getElementById("end-time")

// Our card array for the cards we'll generate
const cardsArray = [
  {
    name: "cat",
    img: "assets/images/cards/cat.webp",
  },
  {
    name: "cow",
    img: "assets/images/cards/cow.webp",
  },
  {
    name: "gorilla",
    img: "assets/images/cards/gorilla.webp",
  },
  {
    name: "elephant",
    img: "assets/images/cards/elephant.webp",
  },
  {
    name: "hippo",
    img: "assets/images/cards/hippo.webp",
  },
  {
    name: "lion",
    img: "assets/images/cards/lion.webp",
  },
  {
    name: "parrot",
    img: "assets/images/cards/parrot.webp",
  },
  {
    name: "bat",
    img: "assets/images/cards/bat.webp",
  },
  {
    name: "chameleon",
    img: "assets/images/cards/chameleon.webp",
  },
  {
    name: "deer",
    img: "assets/images/cards/deer.webp",
  },
  {
    name: "frog",
    img: "assets/images/cards/frog.webp",
  },
  {
    name: "ram",
    img: "assets/images/cards/ram.webp",
  },
  {
    name: "raven",
    img: "assets/images/cards/raven.webp",
  },
  {
    name: "sabre",
    img: "assets/images/cards/sabre.webp",
  },
  {
    name: "turtle",
    img: "assets/images/cards/turtle.webp",
  },
  {
    name: "walrus",
    img: "assets/images/cards/walrus.webp",
  },
]

// Our global variables
let gameLevel = "easy"
let gameOver = false
let time = 0
let flips = 0
let matchedCards = 0
let hasFlippedCard = false
let lockBoard = true
let firstCard
let secondCard
let gameCards = []

// Starting to construct the board
const board = document.getElementById("board")
const grid = document.createElement("div")
grid.setAttribute("class", "grid")
board.appendChild(grid)

/**
 * Our function to select a number of random cards from our earlier array
 * First we locally declare a temporary array
 * Then we shuffle our cardsArray
 * Depending which level we've selected on our main screen, we'll slice
 * from our shuffled cards
 * Then we'll use concatenation and save to our earlier globally declared gameCards array
 */
function numberOfCards () {
  let selectedCards = []
  let randomCards = cardsArray.sort(() => 0.5 - Math.random())
  if (gameLevel === "easy") {
    selectedCards = randomCards.slice(0, 6)
  } else if (gameLevel === "medium") {
    selectedCards = randomCards.slice(0, 8)
  } else if (gameLevel === "hard") {
    selectedCards = randomCards.slice(0, 10)
  } 
  gameCards = selectedCards.concat(selectedCards)
}

/**
 * Now we will run the function to create the cards
 * First we'll sort the gameCards array to properly mix the cards
 * Then we'll create divs and add the classes card, front-face and back-face,
 * so we can add our EventListener, and style the cards so they can be flipped
 * And we'll append everything together
 */
function createCards() {
  gameCards.sort(() => 0.5 - Math.random())
  gameCards.forEach((item) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.name = item.name
    card.addEventListener("click", flipCard)

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.style.backgroundImage = `url(${item.img})`;

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    
    
    grid.appendChild(card);
    card.appendChild(frontFace);
    card.appendChild(backFace);
  })
}

/**
 * The flipCard function (called on click from the EventListener added above in our
 * createCards function) handles what happens when we click on a card
 * We can't flip again once it's selected
 * We can only flip two cards at a time
 * It increments our clips(or attempts, really, as it increments after the second flip)
 * Then we check for a match 
 */
function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.toggle("flip")

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true
        firstCard = this
        return
    }
    // Second click
    secondCard = this
    flips++
    attempts.innerHTML = flips

    checkForMatch()
}

// We compare the cards by their name and either disable the cards(they're a match!) or unflip them
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    isMatch ? disableCards() : unflipCards()
}

// Our disableCard function once we have a pair
function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)
    matchedCards++
    matches.innerHTML = matchedCards
    resetBoard()
}

// Our unflipCards function that removes the flip class
function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")  
        resetBoard()  
        }, 1000)
}

// Our reset board function to call after we've unflipped our cards
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

/**
 * Our level functions
 * Called by our buttons, set the game level which changes number of cards
 * And also adjusts our grid in CSS to fit our cards
 * Then starts the game
 */
function levelOne() {
  gameLevel = "easy"
  grid.style.gridTemplateColumns = "auto auto auto auto"
  startGame()
}

function levelTwo() {
  gameLevel = "medium"
  grid.style.gridTemplateRows = "auto auto auto auto"
  startGame()
}

function levelThree() {
  gameLevel = "hard"
  grid.style.gridTemplateRows = "auto auto auto auto auto"
  startGame()
}

/**
 * Our checkWin function calls our win function if our conditions are met
 * depending on the level
 * Called in the setInterval function in our startGame function. But may also
 * work in our checkForMatch function
 */
function checkWin() {
  if (gameLevel === "easy" && matchedCards === 6) {
    win()
  } else if (gameLevel === "medium" && matchedCards === 8) {
    win()
  } else if (gameLevel === "hard" && matchedCards === 10) {
    win()
  } else {
    return
  }
}

// Our win function sets gameOver to true and displays our game over screen
function win() {
  gameOver = true
  lockBoard = true
  document.querySelector("#game-over").style.display="block"
  endScore.innerHTML = matchedCards
  endTime.innerHTML = time
}

/**
 * The startGame function
 * Removes EventListeners to prevent user selecting too many cards
 * (although, could be interesting to include a feature where users can generate
 * as many cards as they want)
 * Calls our numberOfCards and createCards functions to generate the board
 * Starts a setInterval function that increments our timer, checks for wins and
 * clears itselve if gameOver is true
 */
function startGame() {
  levelEasy.removeEventListener("click", levelOne)
  levelMedium.removeEventListener("click", levelTwo)
  levelHard.removeEventListener("click", levelThree)
  lockBoard = false
  numberOfCards()
  createCards()
  
  let startTime = setInterval(() => {
    time++
    timer.innerHTML = time
    checkWin()
    if (gameOver) {
      time = 0
      clearInterval(startTime)
    }
  }, 1000)
}

// Our EventListeners for our buttons in our HTML
levelEasy.addEventListener("click", levelOne)
levelMedium.addEventListener("click", levelTwo)
levelHard.addEventListener("click", levelThree)
reset.addEventListener("click", () => {
  location.reload() 
})