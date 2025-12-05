import { WordleSolver } from "./solver.js";

const runSolver = async() => {
    const solver = new WordleSolver();
    await solver.init();
    let bestWord = solver.findBestWord();
    console.log(bestWord);
    solver.addGreenLetter(0, "a");
    solver.addGreenLetter(3,"s");
    solver.addGreenLetter(4, "e");
    solver.addGreyLetter("r");
    solver.addGreyLetter("o");
    bestWord = solver.findBestWord();
    console.log(bestWord);
    solver.addGreyLetter("l");
    solver.addGreyLetter("m");
    solver.addOrangeLetter(2, "B");
    solver.addOrangeLetter(3, "U");
    bestWord = solver.findBestWord();
    console.log(bestWord);
    
}
runSolver();