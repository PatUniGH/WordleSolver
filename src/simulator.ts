
import { Wordle } from "./wordle";
import { WordleSolver } from "./solver";

export class Simulator{

    private wordle: Wordle;
    private solver: WordleSolver;

    constructor(wordle: Wordle, solver: WordleSolver){
        this.wordle = wordle;
        this.solver = solver;
    }


    simulateGame(): {score: number, targetWord: string}{
        let score: number = 1;
        while(true){
            const currentSolverWord: string = this.solver.findBestWord();
            const types: string[] = this.wordle.getTypeForInputs(currentSolverWord);

            if(this.isSimulationWon(types)){
                const targetWord = this.wordle.getTargetWord();
                this.resetAutomaticGameNoUI();
                return {score, targetWord};
            }
            this.solver.addWord(currentSolverWord, types);
            score++;
        }
    }


    private resetAutomaticGameNoUI(){
        this.wordle = new Wordle("");
        this.solver = new WordleSolver();
    }

    private isSimulationWon(types: string[]): boolean{
        for(const type of types){
            if(type != "green"){
                return false;
            }
        }
        return true;
    }

}















