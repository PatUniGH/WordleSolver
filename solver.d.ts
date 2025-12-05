export declare class WordleSolver {
    greenLetters: Map<number, string>;
    orangeLetters: Map<number, string[]>;
    greyLetters: string[];
    words: string[];
    position0List: string[];
    position1List: string[];
    position2List: string[];
    position3List: string[];
    position4List: string[];
    constructor();
    init(): Promise<void>;
    putWordsIntoList(): Promise<void>;
    assembleOrangeLettersMap(): void;
    findBestWord(): string;
    getCandidateWords(): string[];
    highestCharDifference(strings: string[]): number;
    charDifferenceStrings(a: String, b: String): number;
    isValidChar(c: String): boolean;
    hasDifferenCharAt(index: number, strings: string[]): boolean;
    addGreyLetter(c: string): void;
    addGreenLetter(position: number, c: String): void;
    addOrangeLetter(position: number, c: string): void;
    hasGreyLetters(s: string): boolean;
    matchesGreenPatern(s: string): boolean;
    matchesOrangePatterns(s: string): boolean;
}
//# sourceMappingURL=solver.d.ts.map