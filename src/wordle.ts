import { fiveLetterWords } from "./5LetterWords";

export class Wordle {

    words: string[] = [];
    targetWord: string = "";

    constructor(targetWord: string) {
        this.words = [...fiveLetterWords]
        if(targetWord != "" && (fiveLetterWords.includes(targetWord.toUpperCase()) || fiveLetterWords.includes(targetWord.toLocaleLowerCase()))){
            this.targetWord = targetWord;
        }
        else{
            this.targetWord = this.words[this.getRandomNumber(0, this.words.length - 1)] || "";
        }
    }


    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getTypeForInputs(input: string): string[] { //returns an array of types for each letter in input
        let types = ["", "", "", "", ""]; //Array of types for each letter
        let targetLetters = this.targetWord.toLowerCase().split('');

        if(input.length != 5){
            throw new Error("Invalid character in input, length: " + input.length);
        }

        // First pass: mark all green letters and remove them from available letters
        for(let i = 0; i < input.length; i++) {
            const currChar = input.charAt(i).toLowerCase();
            const charTarget = this.targetWord.charAt(i).toLowerCase();

            if(currChar === charTarget) {
                types[i] = "green";
                // Remove this letter from available pool
                targetLetters.splice(targetLetters.indexOf(currChar), 1);
            }
        }

        // Second pass: mark orange and grey letters
        for(let i = 0; i < input.length; i++) {
            if(types[i] == "green") continue; // Skip already marked green

            const currChar = input.charAt(i).toLowerCase();
            if(!this.isValidChar(currChar)) {
                throw new Error("Invalid character in input");
            }

            //orange letter - only if the letter still exists in remaining target letters
            if(targetLetters.includes(currChar)) {
                types[i] = "orange";
                // Remove this letter from available pool
                targetLetters.splice(targetLetters.indexOf(currChar), 1);
            }
            else{
                types[i] = "grey";
            }
        }

        return types;
    }

    private isValidChar(c: String): boolean { //Checks if a character is valid (A-Z or a-z)
        const asciiValue = c.charCodeAt(0);
        return (asciiValue >= 65 && asciiValue <= 90) || (asciiValue >= 97 && asciiValue <= 122);
    }

    getTargetWord(): string{
        return this.targetWord;
    }
}

