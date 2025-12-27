import { WordleSolver } from "./solver";

 let solver = new WordleSolver();

const wordleList = document.querySelector(".js-wordle-list") as HTMLDivElement;
const letter1Box = document.querySelector(".js-letter-box-1") as HTMLDivElement;
const letter2Box = document.querySelector(".js-letter-box-2") as HTMLDivElement;
const letter3Box = document.querySelector(".js-letter-box-3") as HTMLDivElement;
const letter4Box = document.querySelector(".js-letter-box-4") as HTMLDivElement;
const letter5Box = document.querySelector(".js-letter-box-5") as HTMLDivElement;
const submitLettersButton = document.querySelector(".js-submit-letters-button") as HTMLButtonElement;
const resetButton = document.querySelector(".js-reset-button") as HTMLButtonElement;

letter1Box.addEventListener("click", () => addChangeColorOnClick(letter1Box));
letter2Box.addEventListener("click", () => addChangeColorOnClick(letter2Box));
letter3Box.addEventListener("click", () => addChangeColorOnClick(letter3Box));
letter4Box.addEventListener("click", () => addChangeColorOnClick(letter4Box));
letter5Box.addEventListener("click", () => addChangeColorOnClick(letter5Box));
submitLettersButton.addEventListener("click", () =>{
    addLettersFromBoxes(); //Adds Letters from letterBox1-5 to the appropriate list in solver
    addBestWord();         //Adds the new best word to the fields and sets their color to undefined
});
resetButton.addEventListener("click", () =>{
    solver = new WordleSolver(); //Creates new Instance of solver deleting inputs so far
    addBestWord();               //Adds the "starting-best-word" = arose to box
});

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



function clearBoxes(){
    letter1Box.innerHTML = "";
    letter2Box.innerHTML = "";
    letter3Box.innerHTML = "";
    letter4Box.innerHTML = "";
    letter5Box.innerHTML = "";
}

function addLettersFromBoxes():void {
    const letterBoxes: HTMLDivElement[] = [letter1Box, letter2Box, letter3Box, letter4Box, letter5Box];
    let i: number = 0;//Index of current Box
    for(const currLetterBox of letterBoxes){
        let currChar: string = currLetterBox.innerHTML;
        if(!solver.isValidChar(currChar)){
            clearBoxes();
            return;
        }
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
            for(const curLetterBox of letterBoxes){
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

function addBestWord(): void{
    //Check ob das Ergebnis wirklich nur 5 chars hat, evtl erklärung zu eliminierung der Kandidaten
    let bestWord: string = solver.findBestWord();
    if(bestWord.length != 5){//word wasnt found, resets game
        window.alert("Word not found, game reset");
        solver = new WordleSolver();
        addBestWord();
    }
    else{
        letter1Box.innerHTML = bestWord.charAt(0).toUpperCase();
        letter2Box.innerHTML = bestWord.charAt(1).toUpperCase();
        letter3Box.innerHTML = bestWord.charAt(2).toUpperCase();
        letter4Box.innerHTML = bestWord.charAt(3).toUpperCase();
        letter5Box.innerHTML = bestWord.charAt(4).toUpperCase();
        removeTypeOfBoxes(); //Resets all letter types to undefined (White)
    }
}

function removeTypeOfBoxes(): void{
    const letterBoxes: HTMLDivElement[] = [letter1Box, letter2Box, letter3Box, letter4Box, letter5Box];
    for(const currLetterBox of letterBoxes){
        currLetterBox.classList.remove("green-letter");
        currLetterBox.classList.remove("grey-letter");
        currLetterBox.classList.remove("orange-letter");
    }
}
