import { WordleSolver } from "./solver";

const runSolver = async() => {
    const solver = new WordleSolver();
    await solver.init();
    let bestWord = solver.findBestWord();
    console.log(bestWord);
    solver.addOrangeLetter(1, "n");
    solver.addGreyLetter("r");
    solver.addGreyLetter("o");
    solver.addGreyLetter("s");
    solver.addGreyLetter("e");
    solver.addGreyLetter("a");
    solver.addGreyLetter("u");
    solver.addGreyLetter("t");
    solver.addGreyLetter("y");
    solver.addGreyLetter("b");
    solver.addGreenLetter(1,"l");
    solver.addGreenLetter(2,"i");
    solver.addGreenLetter(3,"n");
    solver.addGreenLetter(4,"g");
    bestWord = solver.findBestWord();
    console.log(bestWord);
    

}
runSolver();