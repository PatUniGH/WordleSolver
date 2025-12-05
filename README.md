# WordleSolver

## Setup & Run

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server runs on `http://localhost:8000`.

## Usage

The solver is controlled via `app.js` within `const runSolver`. `solver.findBestWord()` returns the current best word to solve the Wordle.

**Grey letters** (not present in the word) can be added with `solver.addGreyLetter(char c)`.

**Orange letters** (present but at wrong position) can be added with `solver.addOrangeLetter(int position, char c)`, where position 0 corresponds to the 1st letter and position 4 to the 5th letter.

**Green letters** (correct position) can be added with `solver.addGreenLetter(int position, char c)`, using the same position numbering as orange letters.

### Example

At game start:
```javascript
solver.findBestWord()  // Result: "arose"
// (always use console.log(solver.findBestWord()) to display the result)
```

After the first guess, assume:
- `a` is in the correct position (green)
- `r` is in the word but wrong position (orange)
- `o`, `s`, `e` are not in the word (grey)

```javascript
solver.addGreenLetter(0, "a");
solver.addOrangeLetter(1, "r");
solver.addGreyLetter("o");  // Order doesn't matter; also works with uppercase
solver.addGreyLetter("s");
solver.addGreyLetter("e");

solver.findBestWord()  // Result: "aural"
```

Continue adding constraints and calling `findBestWord()` until solved.
