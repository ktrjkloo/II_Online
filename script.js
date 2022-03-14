import Deck from "./deck.js"

const NUMBER_VALUE_MAP = {
    "C" : 1,
    "D" : 2,
    "E" : 3,
    "F" : 4,
    "G" : 5,
    "A" : 6,
    "B" : 7
}

const NUMBER_MAP = {
    2 : "2nd",
    3 : "3rd",
    4 : "4th",
    5 : "5th",
    6 : "6th",
    7 : "7th",
    8 : "8th"
}

const qualitydict ={
    2 : {
        10 : "Triple Diminished",
        11 : "Double Diminished",
        0 : "Diminished",
        1 : "Minor",
        2 : "Major",
        3 : "Augmented",
        4 : "Double Augmented",
        5 : "Triple Augmented"
    },
    3 : {
        0 : "Triple Diminished",
        1 : "Double Diminished",
        2 : "Diminished",
        3 : "Minor",
        4 : "Major",
        5 : "Augmented",
        6 : "Double Augmented",
        7 : "Triple Augmented"
    },
    4 : {
        2 : "Triple Diminished",
        3 : "Double Diminished",
        4 : "Diminished",
        5 : "Perfect",
        6 : "Augmented",
        7 : "Double Augmented",
        8 : "Triple Augmented"
    },
    5 : {
        4 : "Triple Diminished",
        5 : "Double Diminished",
        6 : "Diminished",
        7 : "Perfect",
        8 : "Augmented",
        9 : "Double Augmented",
        10 : "Triple Augmented"
    },
    6 : {
        5 : "Triple Diminished",
        6 : "Double Diminished",
        7 : "Diminished",
        8 : "Minor",
        9 : "Major",
        10 : "Augmented",
        11 : "Double Augmented",
        0 : "Triple Augmented"
    },
    7 : {
        7 : "Triple Diminished",
        8 : "Double Diminished",
        9 : "Diminished",
        10 : "Minor",
        11 : "Major",
        0 : "Augmented",
        1 : "Double Augmented",
        2 : "Triple Augmented"
    },
    8 : {
        9 : "Triple Diminished",
        10 : "Double Diminished",
        11 : "Diminished",
        0 : "Perfect",
        1 : "Augmented",
        2 : "Double Augmented",
        3 : "Triple Augmented"
    }
}

const mainDeckElement = document.querySelector(".main-deck")
const fromCardSlot = document.querySelector(".from-card-slot")
const toCardSlot = document.querySelector(".to-card-slot")
const checkText = document.querySelector(".check")
const scoreText = document.querySelector(".score")
const timer = document.querySelector(".time")
const keys = document.querySelectorAll('.keyboard-row button')
const guessed = document.querySelector('.previous-guesses')
const startScreen = document.getElementById('start-screen')
const gameover = document.getElementById('game-over')
var mainDeck, stop, openCards, score, timeRemaining, countdown, tries, totalTries

function startGame(time,maxScore) {
    const deck = new Deck()
    deck.shuffle()
    mainDeck = deck
    stop = false
    score = 0
    tries = 0
    totalTries = maxScore
    timeRemaining = time
    timer.innerText = `Time left: ${timeRemaining}`
    scoreText.innerText = `Score: ${score}/${totalTries}`
    checkText.innerText = ''
    guessed.innerHTML = ''
    countdown = startCountDown()
    flipCards()
}

gameover.addEventListener('click',()=>{
    gameover.classList.remove('visible')
    startScreen.classList.add('visible')
})

startScreen.addEventListener('click',()=>{
    startScreen.classList.remove('visible')
    startGame(100,10)
})

function startCountDown(){
    return setInterval(()=>{
        timeRemaining--
        timer.innerText = `Time left: ${timeRemaining}`
        if(timeRemaining === 0){
            gameOver()
        }
    },1000)
}


function flipCards() {
    fromCardSlot.innerHTML = ''
    toCardSlot.innerHTML = ''
    
    const fromCard = mainDeck.pop()
    const toCard = mainDeck.pop()

    fromCardSlot.appendChild(fromCard.getHTML())
    toCardSlot.appendChild(toCard.getHTML())

    // // updateDeckCount()
    // checkText.innerText = getInterval(fromCard,toCard)
    openCards = [fromCard,toCard]
}
if(!stop){
    for (let i=0; i<keys.length; i++){
        keys[i].onclick = ({target}) =>{
            tries++
            checkText.innerHTML = ''
            const key = target.getAttribute("data-key")
            const guessDiv = document.createElement("div")
            guessDiv.classList.add("text")
            guessDiv.innerText = `${openCards[0]["value"]}${openCards[0]["suit"]} -> ${openCards[1]["value"]}${openCards[1]["suit"]} ${getInterval(openCards[0],openCards[1])}`
            if (key === getInterval(openCards[0],openCards[1])){
                checkText.innerText = "CORRECT"
                checkText.setAttribute("id","guess-correct")
                score += 1                
                guessDiv.setAttribute("id","guess-correct")
            }else{
                checkText.innerText = "WRONG"
                checkText.setAttribute("id","guess-wrong")
                guessDiv.setAttribute("id","guess-wrong")
            }
            scoreText.innerText = `Score: ${score}/${totalTries}`
            guessed.prepend(guessDiv)
            flipCards()
            if(tries>=totalTries){
                gameOver()
            }
        }
    }
}

function getInterval(cardOne,cardTwo) {
    const semitoneDiff = cardOne.enharmonic.indexOf(cardTwo.enharmonic[0])
    const num = NUMBER_VALUE_MAP[cardTwo.value] - NUMBER_VALUE_MAP[cardOne.value]
    var number, quality
    if (num <= 0){number = num + 8} else {number = num + 1}
    quality= qualitydict[number][semitoneDiff]
    return `${quality} ${NUMBER_MAP[number]}`
}

function gameOver(){
    stop = true
    clearInterval(countdown)
    document.getElementById("game-over-text").innerText = `${score}/ ${totalTries}`
    gameover.classList.add('visible')
}