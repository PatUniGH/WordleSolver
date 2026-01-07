import {WordleGameUI} from "./wordleGameUI";
import { WordleSolverUI } from "./WordleSolverUI";

export class AutomaticWordleSolver{

    private gameUI: WordleGameUI;
    private solverUI: WordleSolverUI;
    private autoGameButton: HTMLButtonElement;

    constructor(gameUI: WordleGameUI, solverUI: WordleSolverUI){
        this.gameUI = gameUI;
        this.solverUI = solverUI;
        this.autoGameButton = document.querySelector(".js-automatic-game-button") as HTMLButtonElement;
        this.initListeners();
    }

    private initListeners(){
        this.autoGameButton.addEventListener("click", async() => await this.playAutomaticGame());
    }

    async playAutomaticGame(){
        this.autoGameButton.classList.add("deactivated-box");
        while(true){
            const rowBoxesGame = this.gameUI.getCurrentRowBoxes();
            const rowBoxesSolver = this.solverUI.getCurrentRowBoxes();

            //copy solver word into game inputs
            for(let i = 0; i<5; i++){
                rowBoxesGame[i]!.value = rowBoxesSolver[i]!.innerHTML;
            }
            await this.sleep(300);
            this.gameUI.updateUIWordle(); //Puts Grey/Orange/Green on UI in Game
            await this.sleep(300);

            if(this.gameUI.isGameWon()){
                this.autoGameButton.classList.remove("deactivated-box");
                const score = this.gameUI.getCurrentRow()+1;
                window.alert("Game won in " + score + " tries");
                this.resetAutomaticGame();
                return;                     //Add Code here when game is won
            }

            //mirror types into ui
            for(let i = 0; i<5; i++){
                if(rowBoxesGame[i]!.classList.contains("grey-letter")){
                    rowBoxesSolver[i]!.classList.add("grey-letter");
                    rowBoxesSolver[i]!.innerHTML = rowBoxesGame[i]!.value;
                    }
                else if(rowBoxesGame[i]!.classList.contains("orange-letter")){
                    rowBoxesSolver[i]!.classList.add("orange-letter");
                    rowBoxesSolver[i]!.innerHTML = rowBoxesGame[i]!.value;
                }
                else if(rowBoxesGame[i]!.classList.contains("green-letter")){
                    rowBoxesSolver[i]!.classList.add("green-letter");
                    rowBoxesSolver[i]!.innerHTML = rowBoxesGame[i]!.value;
                }
            }
            //update solver
            await this.sleep(300);
            this.solverUI.updateUISolver();
            await this.sleep(300);

            //increase rows
            this.gameUI.increaseCurrentRow();
            this.solverUI.increaseCurrentRow();
        }
    }




    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    private resetAutomaticGame(){
        this.gameUI.resetGame();
        this.solverUI.resetGameSolver();
    }

}















