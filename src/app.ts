import { WordleSolver } from "./solver";

 let solver = new WordleSolver();
 let currentRow: number = 0; //Tracks in which row words should be inserted in


const letterBoxes: HTMLDivElement[] = Array.from(document.querySelectorAll(".letter-box"));
const submitLettersButton = document.querySelector(".js-submit-letters-button-solver") as HTMLButtonElement;
const resetButton = document.querySelector(".js-reset-button-solver") as HTMLButtonElement;


for(let i = 0; i < 30; i++){
    letterBoxes[i]!.addEventListener("click", () => addChangeColorOnClick(letterBoxes[i]!, i));
}
submitLettersButton.addEventListener("click", () =>{
    if(isGameWon()){
        const triesTillBeat = currentRow+1;
        window.alert("Spiel in " + triesTillBeat+ " guesses gewonnen!");
        resetGame();
        return;
    }
    addLettersFromBoxes(); //Adds Letters from letterBox1-5 to the appropriate list in solver

    try{
        addBestWord(currentRow+1);         //Adds the new best word to the fields and sets their color to undefined
        currentRow++;
    }
    catch(err){
        window.alert("Word not found, game reset");
        resetGame();
    }
});
resetButton.addEventListener("click", () =>{
    resetGame();
});

function addChangeColorOnClick(letterBox: HTMLDivElement, textBoxNumber: number) :void{
    if(textBoxNumber >= currentRow*5 && textBoxNumber <= (currentRow+1)*5 -1){
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

}

function clearBoxes(){
    for(const curLetterBox of letterBoxes){
        curLetterBox.innerHTML = "";
    }
    removeTypeOfBoxes(0,30);
}

function addLettersFromBoxes():void {
    const rowLetterBoxes: HTMLDivElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    let i: number = 0;//Index of current Box
    for(const currLetterBox of rowLetterBoxes){
        let currChar: string = currLetterBox.innerHTML;
        if(currLetterBox.classList.contains("green-letter")){
            solver.addGreenLetter(i,currChar);
        }
        else if(currLetterBox.classList.contains("orange-letter")){
            solver.addOrangeLetter(i, currChar);
        }
        else if(currLetterBox.classList.contains("grey-letter")){
            //Es kann sein, dass in der gleichen Eingabe ein Buchstabe einmal grün und einmal grau vorkommt, dann muss die graue Stelle nicht über solver.addOrangeLetter
            //an der entsprechenden Stelle hinzugefügt werden
            let j: number = 0; //index of letterBox
            for(const curLetterBox of rowLetterBoxes){
                if(curLetterBox.innerHTML == currChar && curLetterBox.classList.contains("green-letter") && curLetterBox != currLetterBox){
                    solver.addOrangeLetter(i, currChar);
                    return;
                }
                j++;
            }
            solver.addGreyLetter(currChar);
        }
        i++;
    }
}

function addBestWord(row: number): void{//Adds best word in row row
    //Check ob das Ergebnis wirklich nur 5 chars hat, evtl erklärung zu eliminierung der Kandidaten
    let bestWord: string = solver.findBestWord();
    if(bestWord.length != 5){//word wasnt found, resets game
        throw new Error("Word not found");
    }
    else{
        letterBoxes[row*5]!.innerHTML = bestWord.charAt(0).toUpperCase();
        letterBoxes[row*5+1]!.innerHTML = bestWord.charAt(1).toUpperCase();
        letterBoxes[row*5+2]!.innerHTML = bestWord.charAt(2).toUpperCase();
        letterBoxes[row*5+3]!.innerHTML = bestWord.charAt(3).toUpperCase();
        letterBoxes[row*5+4]!.innerHTML = bestWord.charAt(4).toUpperCase();
        removeTypeOfBoxes((row+1)*5,(row+2)*5); //Resets all letter types to undefined (White) in the new row
    }
}

function removeTypeOfBoxes(startingIndex:number, endingIndex:number): void{
   const removalLetterBoxes: HTMLDivElement[] = letterBoxes.slice(startingIndex, endingIndex);
    for(const currLetterBox of removalLetterBoxes){
        currLetterBox.classList.remove("green-letter");
        currLetterBox.classList.remove("grey-letter");
        currLetterBox.classList.remove("orange-letter");
    }
}

function resetGame(): void{
    solver = new WordleSolver();
    clearBoxes();//clearsletters and types from boxes
    currentRow = 0;
    addBestWord(currentRow);
}

function isGameWon():boolean{
    const rowLetterBoxes: HTMLDivElement[] = letterBoxes.slice(currentRow*5, (currentRow+1)*5);
    for(const currLetterBox of rowLetterBoxes){
        if(!currLetterBox.classList.contains("green-letter")){
            return false;
        }
    }
    return true;
}
