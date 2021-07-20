// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const askPlayer = require("readline-sync")

let word = ""
let scoreSystem

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
  let numberPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      numberPoints += Number(pointValue);
		 }
 
	  }
	}
	return numberPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's Play some Scrabble!")
 word = input.question("Enter a word to score:")
};

let simpleScore = function(word) {
  word = word.toUpperCase();
	let letterPoints = "";
  let numberPoints = 0;
 for (let i= 0; i < word.length; i++) {letterPoints += `Points for '${word[i]}': 1\n`;
      numberPoints += 1;
      }
      return numberPoints


};

let vowelBonusScore = function(word) {
word = word.toUpperCase();
	let letterPoints = "";
  let numberPoints = 0;
  for (let i=0; i <word.length; i++) { 
    let vowels = "AEIOU".split('');
    if (vowels.includes(word[i])) {
      letterPoints += `Points for '${word[i]}': 3\n`;
       numberPoints += 3;
    } else {
      letterPoints += `Points for '${word[i]}': 1\n`;
       numberPoints += 1;
    }
  }
  return numberPoints;
};

let scrabbleScore;

const scoringAlgorithms = [
  {
    name: "Simple Score", 
    description: "Each letter is worth 1 point.", 
    scoringFunction: simpleScore
  }, {
    name: "Vowel Bonus Score", 
    description: "Each Vowel is worth 3 point. Constanats are worth 1 point", 
    scoringFunction: vowelBonusScore
  }, {
    name: "Scrabble Scorer", 
    description: "uses traditional scoring algo.", 
    scoringFunction: oldScrabbleScorer
  }];

function scorerPrompt() {
  scoreSystem = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
return `Score for ${word}: ${scoringAlgorithms[scoreSystem].scoringFunction(word)}`;
}

function transform(oldPointStructure) {
  let newPointStructure = {};

  for (let i in oldPointStructure) {
      let val = oldPointStructure[i];
      for (let j=0; j < val.length; j++){
          let letter = val[j].toLowerCase();
          newPointStructure[letter.toLowerCase()] = Number(i);

      }
  }
  return newPointStructure
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore1(word){
    let score = 0;

    for (let i = 0; i < word.length; i++){
        let letter = word[i].toLowerCase();
        score = score + newPointStructure[letter];
    }

    return score
}


function runProgram() {
   initialPrompt();
   console.log(scorerPrompt())
   //console.log(oldScrabbleScorer(word));
   //console.log(simpleScore(word))
   //console.log(vowelBonusScore(word))
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

