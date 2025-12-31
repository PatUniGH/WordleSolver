import { Wordle } from "./wordle";

let wordle = new Wordle();
let currentRow = 0;

const submitButton = document.querySelector(".js-submit-letters-button-game") as HTMLButtonElement;
const resetButton = document.querySelector(".js-reset-button-game") as HTMLButtonElement;
const letterBoxes: HTMLInputElement[] = Array.from(document.querySelectorAll(".js-letter-box-game"));
highlightFieldsSelectable();

if(submitButton != null){
    submitButton.addEventListener("click", () => highlightFieldsWordle());
}

function highlightFieldsSelectable(){
    for(let i = 0; i < letterBoxes.length; i++){
        if(i>= currentRow*5 && i<(currentRow+1)*5){
            letterBoxes[i]!.classList.remove("deactivated-box");
            letterBoxes[i]!.readOnly = false;
        }
        else{
            letterBoxes[i]!.classList.add("deactivated-box");
            letterBoxes[i]!.readOnly = true;
        }
    }
}


function highlightFieldsWordle(): void{
    const rowLetterBoxes: HTMLInputElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    const typesForBoxes :String[] = wordle.getTypeForInputs(rowLetterBoxes.map(box => box.value).join(""));
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
        else{
            rowLetterBoxes[i]?.classList.remove("grey-letter");
            rowLetterBoxes[i]?.classList.remove("orange-letter");
            rowLetterBoxes[i]?.classList.add("green-letter");
        }
        currentRow++;
        highlightFieldsSelectable();
    }
}