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
const letter1Box = document.querySelector(".js-letter-box-1") as HTMLDivElement;
const letter2Box = document.querySelector(".js-letter-box-2") as HTMLDivElement;
const letter3Box = document.querySelector(".js-letter-box-3") as HTMLDivElement;
const letter4Box = document.querySelector(".js-letter-box-4") as HTMLDivElement;
const letter5Box = document.querySelector(".js-letter-box-5") as HTMLDivElement;

submitButton.addEventListener("click", () => {
    let input = wordleInput.value;
    console.log(input);

    if(input.length == 1 && solver.isValidChar(input.charAt(0))){
        /*Grey Letter
        There can be a case where a word contains the letter 'a' two times, one time green and one time grey. If we just apply addGreyLetter like usual the word gets flagged as being invalid
        because it contains a grey letter. The solution is to not add it as a grey letter but as an orange letter at a different position than the green letter
        However, this doesnt quite work because we dont know the position at which the orange letter should be added, so there needs to be an extra input asking for the index for the grey letter
        */
        for(let i = 0; i<5; i++){
            if(solver.greenLetters.get(i) == input.charAt(0) || solver.greenLetters.get(i-100) == input.charAt(0)){
                //Word is entered as grey even though it exists as green
                let indexForOrange = solver.getRandomNumber(0,4);
                while(indexForOrange == i){
                    indexForOrange = solver.getRandomNumber(0,4);
                }
                solver.addOrangeLetter(indexForOrange, input.charAt(0));
                wordleInput.value = "";
                return;
            }
        }
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
letter1Box.addEventListener("click", () => addChangeColorOnClick(letter1Box));
letter2Box.addEventListener("click", () => addChangeColorOnClick(letter2Box));
letter3Box.addEventListener("click", () => addChangeColorOnClick(letter3Box));
letter4Box.addEventListener("click", () => addChangeColorOnClick(letter4Box));
letter5Box.addEventListener("click", () => addChangeColorOnClick(letter5Box));

function addChangeColorOnClick(letterBox: HTMLDivElement) :void{
        if(letterBox.classList.contains("grey-letter")){
        letterBox.classList.toggle("grey-letter");
        letterBox.classList.toggle("orange-letter");
        return;
    }
    if(letterBox.classList.contains("orange-letter")){
        letterBox.classList.toggle("orange-letter");
        letterBox.classList.toggle("green-letter");
        return;
    }
    else if(letterBox.classList.contains("green-letter")){
        letterBox.classList.toggle("green-letter");
        letterBox.classList.toggle("grey-letter");
        return;
    }
    else{//is still undefined
        letterBox.classList.toggle("grey-letter");
    }
}

