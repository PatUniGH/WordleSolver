import { WordleGameUI } from "./wordleGameUI";
import { WordleSolverUI } from "./WordleSolverUI";
import { AutomaticWordleSolver } from "./automaticWordleSolver";

const wordleGameUI = new WordleGameUI("");
const wordleSolverUI = new WordleSolverUI();

const automaticSolver = new AutomaticWordleSolver(wordleGameUI, wordleSolverUI);