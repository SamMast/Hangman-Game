//Global Variables
var winCount = 0;
var lossCount = 0;

var currentWord = "";
var currentWordArray = [];
var currentDisplayWord = ""
var currentDisplay = [];
var userGuess = "";

var guessesLeft = 9;
var guessesSoFar = [];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	//list of choices for the word to guess
var wordOptions = ["airball", "assist", "rebound", "block", "backboard", "charge", "flop", "screen", "swish", "turnover", "travel", "dunk", "slam", "pass", "cut", "score", "shoot", "crossover", "dribble", "foul", "layup", "jordan",  "nuggets", "bulls", "lakers", "celtics", "timberwolves", "kobe", "lebron", "warriors", "clippers", "alleyoop", "fadeaway", "mvp", "champion", "rings", "nike", "adidas", "hoop" ];



//Functions


function winAdd(x) {
	winCount++;
	document.getElementById("winCount").textContent = winCount;
}

function lossAdd(x) {
	lossCount++;
	document.getElementById("lossCount").textContent = lossCount;
}

function winLossReset() {
	winCount = 0;
	document.getElementById("winCount").textContent = winCount;
	lossCount = 0;
	document.getElementById("lossCount").textContent = lossCount;
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


}

function joinWord() {
	currentDisplayWord = currentDisplay.join("");
}

//Click/guess

wordSetup();

document.onkeyup = function(event) {
	userGuess = event.key.toLowerCase();
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

				document.getElementById("instructions").textContent = ("MISS! The word was '" + currentWord + "'. Guess the next word:");
				document.getElementById("instructions").style.color = "red";

				lossAdd();
				refresh();
				wordSetup();

			}

			if (guessesLeft <= 3) {
		    	document.getElementById("guessesLeft").style.color = "red";
		    	document.getElementById("guessesLeft").style.fontSize = "200%";
	        } else {
	        	document.getElementById("guessesLeft").style.color = "#FDB827";
	        	document.getElementById("guessesLeft").style.fontSize = "100%";
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

		document.getElementById("instructions").textContent = ("You win, the word was " + currentWord + ".  Guess the next word:");
		document.getElementById("instructions").style.color = "green";
				
	
		winAdd();

		refresh();
		wordSetup();

	}
	
	//pictures
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

	if (lossCount === 5) {
		alert("Errrrrrrr......Game Over.  You had " + winCount + " wins.")
		
		refresh();
		wordSetup();
		winLossReset();

		document.getElementById("instructions").textContent = ("New Game. Guess the word:");
		document.getElementById("instructions").style.color = "black";

		var image = document.getElementById("currentImage");
		image.src = "assets/images/hangman-start.png";	
	}
}




