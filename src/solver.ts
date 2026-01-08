import { fiveLetterWords } from "./5LetterWords";

export class WordleSolver {

    greenLetters: Map<number, string> = new Map();
    orangeLetters: Map<number, string[]> = new Map();
    greyLetters: string[] = [];
    words: string[] = [];
    position0List: string[] = [];
    position1List: string[] = [];
    position2List: string[] = [];
    position3List: string[] = [];
    position4List: string[] = [];
    candidateWords: string[];



    constructor() {
        this.words = [...fiveLetterWords];
        this.candidateWords = this.words;
        this.assembleOrangeLettersMap();
    }

    assembleOrangeLettersMap(): void {
        this.orangeLetters.set(0, this.position0List);
        this.orangeLetters.set(1, this.position1List);
        this.orangeLetters.set(2, this.position2List);
        this.orangeLetters.set(3, this.position3List);
        this.orangeLetters.set(4, this.position4List);
    }

    findBestWord(): string {//returns the best word for solving the wordle considering current criteria

        let bestString = "";
        this.setCandidateWords();

        //If there are more than 2 candidate words that all are either only different by 1 or 2 chars, its strategically better to guess a word that isnt a cadidate but eliminates the max. number of candidates
        if (this.candidateWords.length > 2) {
            let charFrequency: Map<string, number> = new Map();//Key = character, Value = Number of Times it is used in candidateWords
            if (this.charDiffAtMost2(this.candidateWords)) {
                //Calculate at which index they differ
                for (let i = 0; i < 5; i++) {
                    if (this.hasDifferenCharAt(i, this.candidateWords)) {
                        for (const s of this.candidateWords) {
                            const c = s.charAt(i);
                            const currentCount = (charFrequency.get(c) || 0) + 1;; //If Element isnt in charFrequency yet it should be inserted with count=1
                            charFrequency.set(c, currentCount);
                        }
                    }
                }
                //Calculate Score based on how often chars of word appear in the rest of candidateWords
                let bestCurrentScore = 0;
                let bestCurrentWord = this.candidateWords[0] ?? ""; //Gute Lösung?
                for (const s of this.words) {//search for word that eliminates most words of candidates
                    let currentScore = 0;
                    let uniqueLettersWord: Set<String> = new Set(s.split(""));

                    for (const c of charFrequency.keys()) {
                        if (uniqueLettersWord.has(c)) {
                            currentScore += charFrequency.get(c) || 0;
                        }
                    }
                    if (currentScore > bestCurrentScore) {
                        bestCurrentScore = currentScore;
                        bestCurrentWord = s;
                    }
                }
                const explanationString = "The word-candidates are: "+ this.candidateWords.toString()
                    + "To eradicate the " + this.candidateWords.length
                    + " choices left, the word should contain the chars: "
                    + Array.from(charFrequency.keys())
                    + " So the best word is: "
                    + bestCurrentWord;
                console.log(explanationString);
                return bestCurrentWord;
            }
        }
        //"normal" algorithm only looks at acceptableWords and calculates score based on in how many words of acceptableWords its chars appear
        let charFrequency: Map<string, number> = new Map();
        let maxScore = 0;
        for (let i = 0; i < 5; i++) {
            for (const s of this.candidateWords) {
                let c = s.charAt(i);
                const currentCount = (charFrequency.get(c) || 0) + 1;; //If Element isnt in charFrequency yet it should be inserted with count=1
                charFrequency.set(c, currentCount);
            }
        }
        for (const s of this.candidateWords) {
            let currentScore = 0;
            let alreadyUsed = new Set<string>;
            for (let i = 0; i < 5; i++) {
                if (this.isValidChar(s.charAt(i))) {//char is letter from A-Z or a-z
                    if (alreadyUsed.has(s.charAt(i))) {
                        //double chars arent considered so no score+ is given
                    }
                    else {
                        currentScore += charFrequency.get(s.charAt(i)) || 0;
                        alreadyUsed.add(s.charAt(i).toUpperCase());
                        alreadyUsed.add(s.charAt(i).toLowerCase());
                    }
                }
            }
            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestString = s;
            }
        }
        return bestString;
    }


    setCandidateWords(){ //returns a list of all words that match the current criteria
        let acceptableWords: string[] = [];
        for (const s of this.candidateWords) {
            if (!this.hasGreyLetters(s) && this.matchesGreenPatern(s) && this.matchesOrangePatterns(s)) {
                acceptableWords.push(s);
            }
        }
        this.candidateWords = acceptableWords;
    }

    charDiffAtMost2(strings: string[]): boolean {//return the biggest char-diff from a given String-List (for the algorithm do determine its strategy)
        for (let i = 0; i < strings.length; i++) {
            const a = strings[i];
            for (let j = i + 1; j < strings.length; j++) {
                const b = strings[j];
                let diff = 0;
                for (let k = 0; k < 5; k++) {
                    if(a![k] != b![k]) {
                        diff++;
                        if(diff > 2){
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    charDifferenceStrings(a: String, b: String): number { //return the char-Diff of two Strings a and b
        let diff = 0;

        return diff;
    }

    isValidChar(c: String): boolean { //Checks if a character is valid (A-Z or a-z)
        const asciiValue = c.charCodeAt(0);
        return (asciiValue >= 65 && asciiValue <= 90) || (asciiValue >= 97 && asciiValue <= 122);
    }

    hasDifferenCharAt(index: number, strings: string[]): boolean {//Checks if there are differences of chars of a certain Index in Array strings
        if (strings.length == 0) { return false; }
        const firstChar = strings[0]?.charAt(index);

        for (let i = 0; i < strings.length; i++) {
            if ((strings[i]?.charAt(index)) != firstChar) {
                return true; //Char is Different at Index
            }
        }
        return false; //No Difference of Chars at Index index
    }



    addGreyLetter(c: string): void {
        this.greyLetters.push(c.toUpperCase());
        this.greyLetters.push(c.toLowerCase());
    }

    addGreenLetter(position: number, c: String): void {
        this.greenLetters.set(position, c.toUpperCase());
        this.greenLetters.set(position - 100, c.toLowerCase());
    }

    addOrangeLetter(position: number, c: string): void {
        if (position == 0) {
            this.position0List.push(c.toUpperCase());
            this.position0List.push(c.toLowerCase());
        }
        if (position == 1) {
            this.position1List.push(c.toUpperCase());
            this.position1List.push(c.toLowerCase());
        }
        if (position == 2) {
            this.position2List.push(c.toUpperCase());
            this.position2List.push(c.toLowerCase());
        }
        if (position == 3) {
            this.position3List.push(c.toUpperCase());
            this.position3List.push(c.toLowerCase());
        }
        if (position == 4) {
            this.position4List.push(c.toUpperCase());
            this.position4List.push(c.toLowerCase());
        }
    }

    hasGreyLetters(s: string): boolean { //checks if string s contains grey Letters
        for (let i = 0; i < 5; i++) {
            if (this.greyLetters.includes(s.charAt(i))) {
                return true; //word contains forbidden (grey) char
            }
        }
        return false; //word doesnt contain grey char
    }

    matchesGreenPatern(s: string): boolean { //checks if green letters are in word at right position
        if (this.greenLetters.size == 0) { return true; }
        for (let i = 0; i < 5; i++) {
            const currentChar = s.charAt(i);
            if (!(this.greenLetters.get(i) == null)) {
                if (!(currentChar == this.greenLetters.get(i) || currentChar == this.greenLetters.get(i - 100))) { //Lower-Case numbers are safed at i-100
                    return false; //char is different from green char at position
                }
            }
        }
        return true;
    }

    matchesOrangePatterns(s: string): boolean { //checks if word matches orange pattern
        //Step 1: Check if chars are on a position where they should not be (where the field is orange)
        for (let i = 0; i < 5; i++) {
            const currentChar = s.charAt(i);
            if ((this.orangeLetters.get(i) ?? []).includes(currentChar)) { //orange Letters.get(i) can't be undefined because from i = 0,..,4 it includes the lists that entail the orange letters at that position
                return false;
            }
        }
        //Step 2: Check if all orange letters actually are in the word
        const allOrangeLetters: string[] = Array.from(new Set([
            ...this.position0List,
            ...this.position1List,
            ...this.position2List,
            ...this.position3List,
            ...this.position4List]));

        for (const c of allOrangeLetters) {
            const currentCharUpper = c.toUpperCase();
            const currentCharLower = c.toLowerCase();

            if (!(s.includes(currentCharUpper) || s.includes(currentCharLower))) {
                return false; //Not all orange Letters are included in word
            }
        }
        return true;
    }

    getRandomNumber(min: number, max: number):number {
        return Math.floor(Math.random()*(max-min+1)) + min;
    }

    addWord(word: string, types: string[]):void{
        if(word.length != 5 || types.length != 5){
            return;
        }

        for(let i = 0; i < word.length; i++){
            if(types[i] == "green"){
                this.addGreenLetter(i,word.charAt(i));
            }
            if(types[i] == "orange"){
                this.addOrangeLetter(i,word.charAt(i));
            }
            if(types[i] == "grey"){
                this.addGreyLetter(word.charAt(i));
            }
        }
    }

}
