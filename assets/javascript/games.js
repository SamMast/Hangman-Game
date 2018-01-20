//Global Variables
var winCount = 0;

var currentWord = "";
var currentWordArray = [];
var currentDisplay = [];
var currentDisplayArray = [];
var userGuess = 0;

var guessesLeft = 10;
var guessesSoFar = [];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	//list of choices for the word to guess (replace with real words when ready)
var wordOptions = ["word", "sam", "mast", "test"];

//Funtions


function winAdd(x) {
	winCount++;
	document.getElementById("winCount").textContent = winCount;
}

function guessMinus(x) {
	guessesLeft--;
	document.getElementById("guessesLeft").textContent = guessesLeft;
}

function wordSetup() {
	currentWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	currentWordArray = currentWord.split("");

	console.log(currentWordArray);	

	for (var i = 0; i < currentWordArray.length; i++) {
		currentDisplay[i] = "_";
	}

	currentDisplayArray = currentDisplay.join(" ");
	document.getElementById("currentWord").textContent = currentDisplayArray;
}

function refresh() {
	guessesLeft = 10;
	document.getElementById("guessesLeft").textContent = guessesLeft;

	guessesSoFar = [];
	document.getElementById("guessesSoFar").textContent = guessesSoFar;

}



//Click/Guess Function

wordSetup();

document.onkeyup = function(event) {
	userGuess = event.key
	console.log(userGuess);

	if (alphabet.indexOf(userGuess) !== -1 && guessesSoFar.indexOf(userGuess) === -1) {
		if (currentWordArray.indexOf(userGuess) === -1) {
			//fail
			guessMinus();

			guessesSoFar.push(userGuess);
			console.log(guessesSoFar);
			document.getElementById("guessesSoFar").innerHTML = guessesSoFar.join(" ");

			if (guessesLeft === 0) {
				//game over
				
				alert("Game Over");

				refresh();
				wordSetup();

			}


		} else if (currentWordArray.indexOf(userGuess) !== -1) {
			//success guess
			console.log("success");
			for (var i = 0; i < currentWordArray.length; i++) {

				if (currentWordArray[i] === userGuess) {
					currentDisplayArray[i] = userGuess;

				}
			}
			console.log(currentDisplayArray);
			document.getElementById("currentWord").textContent = currentDisplayArray;



			if (currentWordArray === currentDisplayArray) {
				//win
				alert("You win, the word was" + currentWord);
				
				winCount();

				refresh();
				wordSetup();

			}
		}
	} else {
		console.log("Not a Valid Guess");
	}
}




