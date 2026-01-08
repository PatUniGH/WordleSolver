import { WordleGameUI } from "./wordleGameUI";
import { WordleSolverUI } from "./wordleSolverUI";
import { AutoWordleSolverUI } from "./autoWordleSolverUI";
import { Simulator } from "./simulator";
import { Wordle } from "./wordle";
import { WordleSolver } from "./solver";

const wordleGameUI = new WordleGameUI("");
const wordleSolverUI = new WordleSolverUI();
const autoWordleSolver= new AutoWordleSolverUI(wordleGameUI, wordleSolverUI);

const gameSimulator =  new Simulator(new Wordle(""), new WordleSolver);
const downloadButton = document.querySelector(".js-download-simulation-data") as HTMLButtonElement;
let resultsString: string = "";



downloadButton.addEventListener("click", () => {

    let results: {score: number, targetWord: string}[] = [];
    let scoreCombined = 0;
    const simulateTimes = 150;

    for(let i = 0; i < simulateTimes; i++){
        const result = gameSimulator.simulateGame();
        results.push(result);
        scoreCombined+=result.score;
    }
    const averageTriesToSolve = scoreCombined/simulateTimes;
    results.push({score: averageTriesToSolve, targetWord:"AVERAGE"});



    const resultsString = results.map(r => `${r.targetWord};${r.score}`).join("\n");

    const blob = new Blob([resultsString], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "download-results.txt";
    a.click();

    URL.revokeObjectURL(url);
});



