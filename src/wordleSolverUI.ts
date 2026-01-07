import { WordleSolver } from "./solver";

export class WordleSolverUI{

    private solver: WordleSolver;
    private currentRow: number;

    private letterBoxes: HTMLDivElement[];
    private submitLettersButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;

    constructor(){
        this.solver = new WordleSolver();
        this.currentRow = 0;
        this.letterBoxes = Array.from(document.querySelectorAll(".js-letter-box-solver")) as HTMLDivElement[];
        this.submitLettersButton = document.querySelector(".js-submit-letters-button-solver") as HTMLButtonElement;
        this.resetButton = document.querySelector(".js-reset-button-solver") as HTMLButtonElement;

        this.initListeners();
    }

    private initListeners(){
        this.letterBoxes.forEach((box,i) => box.addEventListener("click", () => this.addChangeColorOnClick(box, i)));
        this.submitLettersButton.addEventListener("click", () =>{
            if(this.isGameWon()){
                const triesTillBeat = this.currentRow+1;
                window.alert("Spiel in " + triesTillBeat+ " guesses gewonnen!");
                this.resetGameSolver();
                return;
            }
            this.addLettersFromBoxes(); //Adds Letters from letterBox1-5 to the appropriate list in solver

            try{
                this.addBestWord(this.currentRow+1);        //Adds the new best word to the fields and sets their color to undefined
                this.currentRow++;
            }
            catch(err){
                window.alert("Word not found, game reset");
                this.resetGameSolver();
            }
        });
        this.resetButton.addEventListener("click", () =>{
            this.resetGameSolver();
        });
    }

    updateUISolver(): void{
        this.addLettersFromBoxes(); //Adds Letters from letterBox1-5 to the appropriate list in solver
        this.addBestWord(this.currentRow+1);         //Adds the new best word to the fields and sets their color to undefined
    }

    private addChangeColorOnClick(letterBox: HTMLDivElement, textBoxNumber: number) :void{
        if(textBoxNumber >= this.currentRow*5 && textBoxNumber <= (this.currentRow+1)*5 -1){
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

    private clearBoxes(){
        for(const curLetterBox of this.letterBoxes){
            curLetterBox.innerHTML = "";
        }
        this.removeTypeOfBoxes(0,30);
    }

    private addLettersFromBoxes():void {
        const rowLetterBoxes: HTMLDivElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        let i: number = 0;//Index of current Box
        for(const currLetterBox of rowLetterBoxes){
            let currChar: string = currLetterBox.innerHTML;
            if(currLetterBox.classList.contains("green-letter")){
                this.solver.addGreenLetter(i,currChar);
            }
            else if(currLetterBox.classList.contains("orange-letter")){
                this.solver.addOrangeLetter(i, currChar);
            }
            else if(currLetterBox.classList.contains("grey-letter")){
                //Es kann sein, dass in der gleichen Eingabe ein Buchstabe einmal grün und einmal grau vorkommt, dann muss die graue Stelle nicht über solver.addOrangeLetter
                //an der entsprechenden Stelle hinzugefügt werden
                let j: number = 0; //index of letterBox
                for(const curLetterBox of rowLetterBoxes){
                    if(curLetterBox.innerHTML == currChar && curLetterBox.classList.contains("green-letter") && curLetterBox != currLetterBox){
                        this.solver.addOrangeLetter(i, currChar);
                        return;
                    }
                    j++;
                }
                this.solver.addGreyLetter(currChar);
            }
            i++;
        }
    }

    private addBestWord(row: number): void{//Adds best word in row row
        //Check ob das Ergebnis wirklich nur 5 chars hat, evtl erklärung zu eliminierung der Kandidaten
        let bestWord: string = this.solver.findBestWord();
        if(bestWord.length != 5){//word wasnt found, resets game
            throw new Error("Word not found");
        }
        else{
            this.letterBoxes[row*5]!.innerHTML = bestWord.charAt(0).toUpperCase();
            this.letterBoxes[row*5+1]!.innerHTML = bestWord.charAt(1).toUpperCase();
            this.letterBoxes[row*5+2]!.innerHTML = bestWord.charAt(2).toUpperCase();
            this.letterBoxes[row*5+3]!.innerHTML = bestWord.charAt(3).toUpperCase();
            this.letterBoxes[row*5+4]!.innerHTML = bestWord.charAt(4).toUpperCase();
            this.removeTypeOfBoxes((row+1)*5,(row+2)*5); //Resets all letter types to undefined (White) in the new row
        }
    }

    private removeTypeOfBoxes(startingIndex:number, endingIndex:number): void{
    const removalLetterBoxes: HTMLDivElement[] = this.letterBoxes.slice(startingIndex, endingIndex);
        for(const currLetterBox of removalLetterBoxes){
            currLetterBox.classList.remove("green-letter");
            currLetterBox.classList.remove("grey-letter");
            currLetterBox.classList.remove("orange-letter");
        }
    }

    resetGameSolver(): void{
        this.solver = new WordleSolver();
        this.clearBoxes();//clearsletters and types from boxes
        this.currentRow = 0;
        this.addBestWord(this.currentRow);
    }

    isGameWon():boolean{
        const rowLetterBoxes: HTMLDivElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        for(const currLetterBox of rowLetterBoxes){
            if(!currLetterBox.classList.contains("green-letter")){
                return false;
            }
        }
        return true;
    }

    getLetterBoxes(){
        return this.letterBoxes;
    }

    getCurrentRowBoxes(){
        return this.getLetterBoxes().slice(this.currentRow*5, (this.currentRow+1)*5);
    }

    getCurrentRow(){
        return this.currentRow;
    }

    increaseCurrentRow(){
        this.currentRow++;
    }

}


























