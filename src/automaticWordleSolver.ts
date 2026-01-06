import { updateUIWordle, resetGame} from "./wordleApp";
import { updateUISolver, resetGameSolver} from "./app";

let currentRowSolver = 0;
let currentRowGame = 0;

const letterBoxesGame: HTMLInputElement[] = Array.from(document.querySelectorAll(".js-letter-box-game"));
const letterBoxesSolver: HTMLDivElement[] = Array.from(document.querySelectorAll(".js-letter-box-solver"));
const automaticGameButton = document.querySelector(".js-automatic-game-button") as HTMLButtonElement;

automaticGameButton.addEventListener("click", () => playAutomaticGame());

async function playAutomaticGame(){
    const rowBoxesGame = getRowLetterBoxesGame();
    const rowBoxesSolver = getRowLetterBoxesSolver();

    //copy solver word into game inputs
    for(let i = 0; i<5; i++){
        rowBoxesGame[i]!.value = rowBoxesSolver[i]!.innerHTML;
    }
    await sleep(150);
    updateUIWordle(); //Puts Grey/Orange/Green on UI in Game
    await sleep(150);

    if(isGameWon(rowBoxesGame)){
        const score = currentRowGame+1;
        window.alert("Wordle Solved in " + score + " tries");
        resetAutomaticGame();
        return;
    }
   await sleep(150);


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
    await sleep(150);
    updateUISolver();
    await sleep(150);
    currentRowGame++;
    currentRowSolver++;

    playAutomaticGame();
}

function getRowLetterBoxesGame(): HTMLInputElement[]{
    return letterBoxesGame.slice(currentRowGame*5, (currentRowGame+1)*5);
}

function getRowLetterBoxesSolver(): HTMLDivElement[]{
    return letterBoxesSolver.slice(currentRowSolver*5, (currentRowSolver+1)*5);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isGameWon(rowBoxesGame: HTMLInputElement[]):boolean{
    for(const currBox of rowBoxesGame){
        if(!currBox.classList.contains("green-letter")){
            return false;
        }
    }
    return true;
}

function resetAutomaticGame(){
    resetGame();
    resetGameSolver();
    currentRowGame = 0;
    currentRowSolver = 0;
}