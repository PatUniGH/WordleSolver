import { WordleSolver } from "./solver";

const runSolver = function(){
    const solver = new WordleSolver();
    let bestWord = solver.findBestWord();
    console.log(bestWord);
    /*solver.addOrangeLetter(1, "n");
    solver.addGreyLetter("r");
    solver.addGreyLetter("o");
    solver.addGreyLetter("s");
    solver.addGreyLetter("e");
    solver.addGreyLetter("a");
    solver.addGreyLetter("u");
    solver.addGreyLetter("t");
    solver.addGreyLetter("y");
    solver.addGreyLetter("b");
    solver.addGreenLetter(1,"l");
    solver.addGreenLetter(2,"i");
    solver.addGreenLetter(3,"n");
    solver.addGreenLetter(4,"g");
    bestWord = solver.findBestWord();
    console.log(bestWord);*/
    

}

const wordleInput = document.querySelector(".wordle-input") as HTMLInputElement;
const wordleButton = document.querySelector(".js-submit-button") as HTMLButtonElement;
const bestWordButton = document.querySelector(".js-best-word-button") as HTMLButtonElement;
const wordleList = document.querySelector(".js-wordle-list") as HTMLDivElement;

wordleButton.addEventListener("click", () => {
    console.log(wordleInput.value);
    wordleList.innerHTML += `<div class="wordle-item">${wordleInput.value}</div>`;
    wordleInput.value = "";
});
bestWordButton.addEventListener("click", () => {
    console.log("Best Word");
});
runSolver();