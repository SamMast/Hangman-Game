//Global Variables
var winCount = 0;

var currentWord = "";
var currentWordArray = [];
var currentDisplayWord = ""
var currentDisplay = [];
var userGuess = "";

var guessesLeft = 9;
var guessesSoFar = [];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	//list of choices for the word to guess (replace with real words when ready)
var wordOptions = ["dunk", "slam", "pass", "cut", "shoot", "crossover", "dribble", "foul", "layup", "jordan",  "nuggets", "bulls", "lakers", "celtics", "timberwolves", "kobe", "lebron", "warriors", "clippers", "alleyoop", "fadeaway", "mvp", "champion", "ring", "nike", "adidas",  ];



//Functions


function winAdd(x) {
	winCount++;
	document.getElementById("winCount").textContent = winCount;
}

function winReset() {
	winCount = 0;
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

	document.getElementById("currentWord").textContent = currentDisplay.join(" ");
}

function refresh() {
	guessesLeft = 9;
	document.getElementById("guessesLeft").textContent = guessesLeft;

	guessesSoFar = [];
	document.getElementById("guessesSoFar").textContent = guessesSoFar;

	currentDisplay = [];
	document.getElementById("currentWord").textContent = currentDisplay;

	var image = document.getElementById("currentImage");
	image.src = "assets/images/hangman-start.png";	

}

function joinWord() {
	currentDisplayWord = currentDisplay.join("");
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
				
				var image = document.getElementById("currentImage");
				image.src = "assets/images/hangman-final-loss.png";

				alert("Game Over, the word was '" + currentWord + "'");

				winReset();
				refresh();
				wordSetup();

			}


		} else if (currentWordArray.indexOf(userGuess) !== -1) {
			//success guess
			console.log("success");
			for (var i = 0; i < currentWordArray.length; i++) {

				if (currentWordArray[i] === userGuess) {
					currentDisplay[i] = userGuess;
				}
			}
			console.log(currentDisplay);
			document.getElementById("currentWord").textContent = currentDisplay.join(" ");

		}
	} else {
		console.log("Not a Valid Guess");
	}

	joinWord();

	if (currentWord == currentDisplayWord) {
		//win
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-final-win.png";

		alert("You win, the word was " + currentWord);
				
	
		winAdd();
		document.getElementById("currentWord").textContent = ("...");

		refresh();
		wordSetup();

	}

	if (guessesLeft === 8) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-1.png";
	} else if (guessesLeft === 7) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-2.png";
	} else if (guessesLeft === 6) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-3.png";
	} else if (guessesLeft === 5) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-4.png";
	} else if (guessesLeft === 4) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-5.png";
	} else if (guessesLeft === 3) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-6.png";
	} else if (guessesLeft === 2) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-7.png";
	} else if (guessesLeft === 1) {
		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-8.png";
	}
}




