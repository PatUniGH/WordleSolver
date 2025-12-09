import { WordleSolver } from "./solver";

 let solver = new WordleSolver();

const runSolver = function(){
    let bestWord = solver.findBestWord();
    return bestWord;
}

const wordleInput = document.querySelector(".wordle-input") as HTMLInputElement;
const submitButton = document.querySelector(".js-submit-button") as HTMLButtonElement;
const bestWordButton = document.querySelector(".js-best-word-button") as HTMLButtonElement;
const restartButton = document.querySelector(".wordle-button-red") as HTMLButtonElement;
const wordleList = document.querySelector(".js-wordle-list") as HTMLDivElement;

submitButton.addEventListener("click", () => {
    let input = wordleInput.value;
    console.log(input);

    if(input.length == 1 && solver.isValidChar(input.charAt(0))){
        solver.addGreyLetter(input.charAt(0));
        wordleList.innerHTML += `<div class="wordle-item">${"Added " + "'" + input.charAt(0) + "'" + " to grey letters"}</div>`;
    }
    else if(input.length == 3){
        let type: string = input.charAt(0);
        let position:number = parseInt(input.charAt(1));
        let letter: string = input.charAt(2);

        if(type == "o"){
            solver.addOrangeLetter(position-1, letter);
            wordleList.innerHTML += `<div class="wordle-item">${"Added " + "'" + letter + "'" + " to orange letters"}</div>`;
        }
        if(type == "g"){
            solver.addGreenLetter(position-1, letter);
            wordleList.innerHTML += `<div class="wordle-item">${"Added " + "'" + letter + "'" + " to green letters"}</div>`;
        }
    }
    else{
        wordleList.innerHTML += `<div class="wordle-item">${input + " is invalid"}</div>`;
    }
    wordleInput.value = "";
});
bestWordButton.addEventListener("click", () => {
    wordleList.innerHTML = "";
    let bestWordString = runSolver();
    if(bestWordString.length != 5){//output is not only word but explanation of which word should be chosen
        let output = bestWordString.split("::SEP::");
        wordleList.innerHTML += `<div class="wordle-item">${output[0]}</div>`;
        wordleList.innerHTML += `<div class="wordle-item">${output[1]}</div>`;
        wordleList.innerHTML += `<div class="wordle-item">${output[2]} <span style ="color:green;">${output[3]}</span> </div>`;
    }else{
        wordleList.innerHTML += `<div class="wordle-item">${runSolver()}</div>`;
    }
    wordleInput.value = "";
});
restartButton.addEventListener("click" , () => {
    solver = new WordleSolver;
    wordleList.innerHTML = "";
    wordleInput.value = "";
});
