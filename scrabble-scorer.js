// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   answer = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");
   return answer;
};


let simpleScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;
   for(let i = 0; i < word.length; i++) {
      score++;
   }
   return score;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i =0; i < word.length; i++) {
      if(word[i] === ('A') || word[i] === ('E') || word[i] === ('O')|| word[i] === ('U')|| word[i] === ('I')) {
         score += 3
      } else {
         score++;
      }
   }
   return score;
 };

 let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      for (item in newPointStructure) {
         if(item === word[i]) {
            score += newPointStructure[item]
         }
      }
   }
   return score;
};




let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};


let bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

let newPointStructure = transform(oldPointStructure);


const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];


function scorerPrompt(word) {
   let correctObject = {};
   let scoreAnswer = input.question 
   ("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1 or 2: ");
   if(scoreAnswer === '0') {
      correctObject = scoringAlgorithms[0];
   } else if (scoreAnswer === '1') {
      correctObject = scoringAlgorithms[1];
   } else if (scoreAnswer === '2') {
      correctObject = scoringAlgorithms[2];
   } else scorerPrompt()
   return correctObject;
};

 

function transform(oldObject) {
   let newObject = {};
   for (item in oldObject) {
      let newKeys = [];
      newKeys = oldObject[item];
      for (i=0; i < newKeys.length; i++){
         newObject[newKeys[i].toLowerCase()] = Number(item);
      }
   }
   return newObject;
};




function runProgram() {

let answer = initialPrompt();
let chosenMethodScore = scorerPrompt(answer);

   console.log("Score for " + "'" + answer + "': " + chosenMethodScore.scorerFunction(answer));

};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
