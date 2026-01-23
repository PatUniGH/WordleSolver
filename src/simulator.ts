
import { Wordle } from "./wordle";
import { WordleSolver } from "./solver";

export class Simulator{

    private wordle: Wordle;
    private solver: WordleSolver;

    constructor(wordle: Wordle, solver: WordleSolver){
        this.wordle = wordle;
        this.solver = solver;
    }


    simulateGame(startingWord: string, targetWord:string): {score: number, targetWord: string}{
        this.resetSimulator();
        let score: number = 1;
        if(targetWord != ""){
            this.wordle = new Wordle(targetWord);
        }
        if(startingWord != ""){
            const types: string[] = this.wordle.getTypeForInputs(startingWord);
            this.solver.addWord(startingWord, types);
            if(this.allTypesGreen(types)){
                //Game won
                const targetWord = this.wordle.getTargetWord();
                this.resetSimulator();
                return {score, targetWord};
            }
            score++;
        }

        while(true){
            const currentSolverWord: string = this.solver.findBestWord();
            const types: string[] = this.wordle.getTypeForInputs(currentSolverWord);

            if(this.allTypesGreen(types)){
                //Game won
                const targetWord = this.wordle.getTargetWord();
                this.resetSimulator();
                return {score, targetWord};
            }

            this.solver.addWord(currentSolverWord, types);
            score++;
        }
    }


    private resetSimulator(){
        this.wordle = new Wordle("");
        this.solver = new WordleSolver();
    }

    private allTypesGreen(types: string[]): boolean{
        for(const type of types){
            if(type != "green"){
                return false;
            }
        }
        return true;
    }

}















