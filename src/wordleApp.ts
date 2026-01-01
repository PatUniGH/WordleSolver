import { Wordle } from "./wordle";
//Bei Input () letterBoxes.forEach((box, idx) => {box.addEventListener('input', () => { } auf die nächste box wechseln und value durch value.toUpperCase() ersetzen
//Wenn bei Input schon Inhalt drin -> nur neuen Char im Uppercase (sollte durch das oben auch funktionieren)
//Target Word bei 5 grünen ausgeben (Z.58)

let wordle = new Wordle();
let currentRow = 0;

const submitButton = document.querySelector(".js-submit-letters-button-game") as HTMLButtonElement;
const resetButton = document.querySelector(".js-reset-button-game") as HTMLButtonElement;
const letterBoxes: HTMLInputElement[] = Array.from(document.querySelectorAll(".js-letter-box-game"));
highlightFieldsSelectable();

if(submitButton != null){
    submitButton.addEventListener("click", () => highlightFieldsWordle());
}

if(resetButton != null){
    resetButton.addEventListener("click", () => resetGame());
}

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
        //rowLetterBoxes.forEach(classList.add(kurzeAnimationInDerBoxenRotAufleuchten))
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
    //if (isGameWon){nochNichtErstelleTextBox.value = wordle.getTargetWord()}, wordle = new Wordle(); (neues Wort)
    currentRow++;
    highlightFieldsSelectable();
}

function resetGame(){
    currentRow = 0;
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