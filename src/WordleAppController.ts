import { fiveLetterWords } from "./5LetterWords";
import { WordleGameUI } from "./wordleGameUI";
import { WordleSolverUI } from "./wordleSolverUI";
import { AutoWordleSolverUI } from "./autoWordleSolverUI";
import { Simulator } from "./simulator";
import { Wordle } from "./wordle";
import { WordleSolver } from "./solver";

const words = [...fiveLetterWords];
const wordleGameUI = new WordleGameUI("");
const wordleSolverUI = new WordleSolverUI();
const autoWordleSolver= new AutoWordleSolverUI(wordleGameUI, wordleSolverUI);

const gameSimulator =  new Simulator(new Wordle(""), new WordleSolver);
const downloadButton = document.querySelector(".js-download-simulation-data") as HTMLButtonElement;


downloadButton.addEventListener("click", async() => {
    const indexLower = 2501;
    const indexUpper = words.length;

    let results: {score: number, targetWord: string}[] = [];
    let scoreCombined = 0;
    let lowestAverage = 10;
    let lowestAverageWord = "";

    for(let i = 0; i < 1; i++){ //the first i -entries of words are calculated, testing one starting word for every word takes about 5seconds
        let startingWord = "slate";//words[i]!;
        scoreCombined = 0;
        //Play starting word on every possible targetWord
        for(let j = 0; j < words.length; j++){
            const result = await gameSimulator.simulateGame(startingWord,words[j]!);
            results.push(result); //Enable to add tries-data for every word
            scoreCombined+=result.score;
        }
        const averageTriesToSolve = scoreCombined/words.length;
        if(averageTriesToSolve < lowestAverage){
            lowestAverage = averageTriesToSolve;
            lowestAverageWord = startingWord;
        }
        const outputStartingWord = "starting word: " + startingWord.toUpperCase();
        results.push({score: 0, targetWord: outputStartingWord})
        results.push({score: averageTriesToSolve, targetWord:"AVERAGE"});

    }

    const outputLowestAverage = lowestAverageWord + " was the lowest Average-Word with " + lowestAverage + " tries";
    results.push({score: 0, targetWord: outputLowestAverage});

    const resultsString = results.map(r => `${r.targetWord};${r.score}`).join("\n");

    const blob = new Blob([resultsString], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    const fileName = indexLower + "-" + indexUpper + ".txt";
    a.download = fileName;
    a.click();

    //URL.revokeObjectURL(url);
});



