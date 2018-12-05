let toggledCards = [];
const deck = document.querySelector('.deck');
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;
const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
const shuffleCards = shuffle(cardsToShuffle);

/*Shuffling the cards*/
function shuffleDeck() {
    for (card of shuffleCards) {
        deck.appendChild(card);
        resetCards();
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Event listner for card click*/
deck.addEventListener('click', event => {
	const clickTarget = event.target; 
	if (isClickValid(clickTarget)) {
		if (isClickValid(clickTarget)) {
			if (clockOff) {
				startClock();
				clockOff = false;
			}
		}
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (toggledCards.length === 2) {
			checkForMatch(clickTarget);
			addMove();
			checkScore();
		}
	}
});

/* Click validity function */
function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
     );
  }

/* Turns cards over */
function toggleCard(clickTarget) {
        clickTarget.classList.toggle('open');
        clickTarget.classList.toggle('show');
}

/* Add card to card array */
function addToggleCard(clickTarget) {
        toggledCards.push(clickTarget);
}

/* Checking for 2 matching cards, increments the match constant and checks for win condition*/
function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className
    ) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matched++;
        if (matched === TOTAL_PAIRS) {
	    gameOver();
    }
    }  else {
        setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
    }, 1000);
}
}

/* Add moves to move counter */
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

/* checks score by removing stars */
function checkScore() {
    if (moves === 16 || moves === 24)
    { hideStar();
    }
}

function getStars() {
    stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
      if (star.style.display !== "none") {
        starCount++;
      }
    }
    console.log(starCount);
    return starCount;
}

/* Star css removal */
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
        }
    }
}

/* Clock start function */
function startClock() {
    clockId = setInterval(() => {
        time++;
    displayTime();
    }, 1000);
}

/* Clock stop function */
function stopClock() {
    clearInterval(clockId);
}

/* Clock display function */
function displayTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const clock = document.querySelector(".clock");
    console.log(clock);
    clock.innerHTML = time;
    if (seconds < 10) {
            clock.innerHTML = `${minutes}:0${seconds}`;
    }  else {
            clock.innerHTML = `${minutes}:${seconds}`;
    }  

}

/* Modal toggle */
function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
    modal.classList.toggle('show');
}

/* Writes time, moves and stars to modal */
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

/* Modal buttons */
document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal('hide');
});

document.querySelector('.modal_close').addEventListener('click', () => {
    toggleModal('hide');
});

document.querySelector(".modal_replay").addEventListener("click", () => {
  toggleModal("hide");
  shuffleDeck();
  resetGame();
});

/* Restart button */
document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
      star.style.display = 'inline';
    }
}

function gameOver() {
	stopClock();
	writeModalStats ();
    toggleModal();
	}

function replayGame() {
    resetGame();
    toggleModal();
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

/*Modal test
time = 121;
displayTime();
moves = 16;
checkScore();
writeModalStats();
toggleModal();*/