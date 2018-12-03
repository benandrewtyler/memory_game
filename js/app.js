const deck = document.querySelector('.deck');


/* shuffling the cards*/
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffleCards = shuffle(cardsToShuffle);
    for (card of shuffleCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();


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




/* Old event listner*/
/*
const cards = document.querySelectorAll('.card');
console.log(cards);

for (card of cards) {
    card.addEventListener('click', () => {
        console.log("this is a card click");
    });
}
*/

/* Storing cards in an array*/
let toggledCards = [];

/* New event listner*/

deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
        }
    }
});

/* Toggle card function */
function toggleCard(clickTarget) {
        clickTarget.classList.toggle('open');
        clickTarget.classList.toggle('show');
}

/* Add card to array function */
function addToggleCard(clickTarget) {
        toggledCards.push(clickTarget);
        //console.log('toggledCards');
}

/* Checking for 2 matching cards and timeout */
function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className
    ) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        //console.log('Match');
    }  else {
        //console.log('Not a match');
        setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
    }, 1000);
}
}




/* set up the event listener for a card. If a card is clicked
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
