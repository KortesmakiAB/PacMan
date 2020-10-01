let noClicking = false;
let getTwoCards = false;
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;

const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color, 'pacman');

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// sets div backgroundColor to the Class name for 1st and 2nd click
// ternary operators prevent rage clicking, lol!
// getTwoCards won't let rest of handleCardClick run until both cards have a value
function newCards(event) {
	if (!cardOne) {
		cardOne = event.target;
		cardOne.style.color = event.target.classList[0];
		getTwoCards = true;
	} else if (cardOne && !cardTwo) {
		cardTwo = cardOne === event.target ? null : event.target;
		getTwoCards = !cardTwo ? true : false;
		if (cardTwo) {
			cardTwo.style.color = event.target.classList[0];
		}
	} else if (cardOne && cardTwo) {
	}
}

function handleCardClick(event) {
	if (noClicking) return;
	newCards(event);
	if (getTwoCards) return;

	// for subsequent clicks events, "close the door"
	noClicking = true;

	// if bg colors do not match: remove bg colors, reset cards 1&2, "open (noClicking) door"
	if (cardOne.className !== cardTwo.className) {
		setTimeout(function() {
			cardOne.style.color = 'yellow';
			cardTwo.style.color = 'yellow';
			cardOne = null;
			cardTwo = null;
			noClicking = false;
		}, 1000);
	} else {
		// the background colors match: remove event listener for matched cards, reset cards 1&2, "open (noClicking) door"
		cardsFlipped += 2;
		cardOne.removeEventListener('click', handleCardClick);
		cardTwo.removeEventListener('click', handleCardClick);
		cardOne = null;
		cardTwo = null;
		noClicking = false;
	}
	if (cardsFlipped === COLORS.length) {
		setInterval(function() {
			const evenPacMen = document.querySelectorAll('.pacman:nth-of-type(2n)');
			for (let pacman of evenPacMen) {
				pacman.classList.add('clockwise');
			}
			const oddPacMen = document.querySelectorAll('.pacman:nth-of-type(2n+1)');
			for (let pacman of oddPacMen) {
				pacman.classList.add('counterclockwise');
			}
		}, 444);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
