import { Wordle } from "./wordle";

//ToDo: Add Button "play-game" and textField "how often: x" that plays the game x times and saves data (which word, in how many tries)
//Rough Code (another class?): schreibe wort von 1. Reihe von WordleSolver in WordleGame, schreibe das Ergebnis mit Typen in WordleSolver, wiederhole bis spiel Gewonnen in WordleGame

let wordle = new Wordle();
let currentRow = 0;

const submitButton = document.querySelector(".js-submit-letters-button-game") as HTMLButtonElement;
const resetButton = document.querySelector(".js-reset-button-game") as HTMLButtonElement;
const letterBoxes: HTMLInputElement[] = Array.from(document.querySelectorAll(".js-letter-box-game"));
const targetWordBox: HTMLDivElement = document.querySelector(".target-word-box") as HTMLDivElement;
highlightFieldsSelectable();

if(submitButton != null){
    submitButton.addEventListener("click", () => highlightFieldsWordle());
}

if(resetButton != null){
    resetButton.addEventListener("click", () => resetGame());
}

letterBoxes.forEach((box: HTMLInputElement, id: number) => {
    box.addEventListener("input", () => {
        box.value = box.value.toUpperCase().slice(-1);
        if(id < letterBoxes.length-1 && id < (currentRow+1)*5-1){
            letterBoxes[id+1]!.focus();
        }
    })
});

function highlightFieldsSelectable(){
    for(let i = 0; i < letterBoxes.length; i++){
        if(i>= currentRow*5 && i<(currentRow+1)*5){
            letterBoxes[i]!.classList.remove("deactivated-box");
        }
        else{
            letterBoxes[i]!.classList.add("deactivated-box");
        }
    }
}


function highlightFieldsWordle(): void{
    const rowLetterBoxes: HTMLInputElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    let typesForBoxes: string[] = [];

    try{
        typesForBoxes = wordle.getTypeForInputs(rowLetterBoxes.map(box => box.value).join(""));
    }
    catch(error){
        clearCurrRow();
        rowLetterBoxes.forEach((box: HTMLInputElement) => {
            box.classList.remove("blink-red");
            box.offsetWidth;
            box.classList.add("blink-red");
        });
        return;
    }

    for(let i = 0; i<5; i++){
        if(typesForBoxes[i] == "grey"){
            rowLetterBoxes[i]?.classList.add("grey-letter");
            rowLetterBoxes[i]?.classList.remove("orange-letter");
            rowLetterBoxes[i]?.classList.remove("green-letter");
        }
        else if(typesForBoxes[i] == "orange"){
            rowLetterBoxes[i]?.classList.remove("grey-letter");
            rowLetterBoxes[i]?.classList.add("orange-letter");
            rowLetterBoxes[i]?.classList.remove("green-letter");
        }
        else if(typesForBoxes[i] == "green"){
            rowLetterBoxes[i]?.classList.remove("grey-letter");
            rowLetterBoxes[i]?.classList.remove("orange-letter");
            rowLetterBoxes[i]?.classList.add("green-letter");
        }
    }
    if (isGameWon()){
        targetWordBox.innerHTML = targetWordBox.innerHTML + wordle.getTargetWord();
        targetWordBox.classList.remove("hidden-element");
        return;
    }
    currentRow++;
    highlightFieldsSelectable();
    letterBoxes[currentRow*5]?.focus();
}

function resetGame(){
    currentRow = 0;
    targetWordBox.classList.add("hidden-element");
    clearHighlightingAll();
    highlightFieldsSelectable();
}

function clearHighlightingAll(){
    for(const currLetterBox of letterBoxes){
        currLetterBox.classList.remove("grey-letter");
        currLetterBox.classList.remove("orange-letter");
        currLetterBox.classList.remove("green-letter");
        currLetterBox.classList.remove("deactivated-box");
        currLetterBox.value = "";
    }
}

function clearCurrRow(){
    const rowLetterBoxes: HTMLInputElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    for(const currLetterBox of rowLetterBoxes){
        currLetterBox.value = "";
    }
}

function isGameWon(){
    const rowLetterBoxes: HTMLInputElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    for(const currLetterBox of rowLetterBoxes){
        if(!currLetterBox.classList.contains("green-letter")){
            return false;
        }
    }
    return true;
}