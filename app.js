import { WordleSolver } from "./solver.js";

const runSolver = async() => {
    const solver = new WordleSolver();
    await solver.init();
    const bestWord = solver.findBestWord();
    console.log(bestWord);
}
runSolver();