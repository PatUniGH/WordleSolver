import { Wordle } from "./wordle";

//ToDo: Add Button "play-game" and textField "how often: x" that plays the game x times and saves data (which word, in how many tries)
//Rough Code (another class?): schreibe wort von 1. Reihe von WordleSolver in WordleGame, schreibe das Ergebnis mit Typen in WordleSolver, wiederhole bis spiel Gewonnen in WordleGame
export class WordleGameUI{
    private wordle: Wordle;
    private currentRow: number;
    private letterBoxes: HTMLInputElement[];
    private targetWordBox: HTMLDivElement;
    private submitButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;

    constructor(targetWord: string){
        this.wordle = new Wordle(targetWord);
        this.currentRow = 0;

        this.letterBoxes = Array.from(document.querySelectorAll(".js-letter-box-game"));
        this.targetWordBox = document.querySelector(".target-word-box") as HTMLDivElement;
        this.submitButton = document.querySelector(".js-submit-letters-button-game") as HTMLButtonElement;
        this.resetButton = document.querySelector(".js-reset-button-game") as HTMLButtonElement;
        this.initListeners();
        this.highlightFieldsSelectable();
    }

    private initListeners(): void{
        if(this.submitButton != null){
            this.submitButton.addEventListener("click", () => this.highlightFieldsWordle());
        }

        if(this.resetButton != null){
            this.resetButton.addEventListener("click", () => this.resetGame());
        }

        this.letterBoxes.forEach((box: HTMLInputElement, id: number) => {
            box.addEventListener("input", () => {
            box.value = box.value.toUpperCase().slice(-1);
            if(id < this.letterBoxes.length-1 && id < (this.currentRow+1)*5-1){
                this.letterBoxes[id+1]!.focus();
            }
            })
        });
    }

    private highlightFieldsSelectable(){
        for(let i = 0; i < this.letterBoxes.length; i++){
            if(i>= this.currentRow*5 && i<(this.currentRow+1)*5){
                this.letterBoxes[i]!.classList.remove("deactivated-box");
            }
            else{
                this.letterBoxes[i]!.classList.add("deactivated-box");
            }
        }
    }

    private highlightFieldsSelectableUI(){//In UI, currentRow isnt increased so we need to do it manually
        for(let i = 0; i < this.letterBoxes.length; i++){
            if(i>= (this.currentRow+1)*5 && i<(this.currentRow+2)*5){
                this.letterBoxes[i]!.classList.remove("deactivated-box");
            }
            else{
                this.letterBoxes[i]!.classList.add("deactivated-box");
            }
        }
    }

    updateUIWordle() : void{
        const rowLetterBoxes: HTMLInputElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        let typesForBoxes: string[] = this.wordle.getTypeForInputs(rowLetterBoxes.map(box => box.value).join(""));
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
        this.highlightFieldsSelectableUI();
    }

    private highlightFieldsWordle(): void{
        const rowLetterBoxes: HTMLInputElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        let typesForBoxes: string[] = [];

        try{
            typesForBoxes = this.wordle.getTypeForInputs(rowLetterBoxes.map(box => box.value).join(""));
        }
        catch(error){
            this.clearCurrRow();
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
        if (this.isGameWon()){
            this.targetWordBox.innerHTML = this.targetWordBox.innerHTML + this.wordle.getTargetWord();
            this.targetWordBox.classList.remove("hidden-element");
            return;
        }
        this.currentRow++;
        this.highlightFieldsSelectable();
        this.letterBoxes[this.currentRow*5]?.focus();
    }

    resetGame(){
        this.wordle = new Wordle("");
        this.currentRow = 0;
        this.targetWordBox.classList.add("hidden-element");
        this.clearHighlightingAll();
        this.highlightFieldsSelectable();
    }

    private clearHighlightingAll(){
        for(const currLetterBox of this.letterBoxes){
            currLetterBox.classList.remove("grey-letter");
            currLetterBox.classList.remove("orange-letter");
            currLetterBox.classList.remove("green-letter");
            currLetterBox.classList.remove("deactivated-box");
            currLetterBox.value = "";
        }
    }

    private clearCurrRow(){
        const rowLetterBoxes: HTMLInputElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        for(const currLetterBox of rowLetterBoxes){
            currLetterBox.value = "";
        }
    }

    isGameWon(){
        const rowLetterBoxes: HTMLInputElement[] = this.letterBoxes.slice(this.currentRow*5, (this.currentRow+1)*5);
        for(const currLetterBox of rowLetterBoxes){
            if(!currLetterBox.classList.contains("green-letter")){
                return false;
            }
        }
        return true;
    }

    getTargetWord(){
        return this.wordle.getTargetWord();
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





















