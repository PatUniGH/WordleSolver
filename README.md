Die Steuerung des Programmes läuft über app.js innerhalb const runSolver, dabei gibt solver.findBestWord() immer das aktuelle beste Word aus, um das Wordle zu lösen.

Graue (also nicht vorhanden) Character/Buchstaben können über solver.addGreyLetter(char c) hinzugefügt werden.

Orangene (also an einer anderen Stelle vorhandene) Character/Buchstaben können über solver.addOrangeLetter(int position, char c) hinzugefügt werden, wobei Stelle 0 dem 1. Buchstaben und Stelle 4. dem 5. Buchstaben entspricht

Grüne Wörter (also an der richtigen Stelle vorhandene) Character/Buchstaben können mit solver.addGreenLetter(int position, char c) hinzugefügt werden, die Stellen sind analog zu dem orangenen Equivalent

Beispieleingabe:
Spielstart -> solver.findBestWord(), Ergebnis: arose      (immer console.log(solver.findBestWord()) nötig um das anzuzeigen)

angenommen a steht an der richtigen Stelle (also grün), r ist an der falschen Stelle aber im Wort (orange) und sonst sind alles Buchstaben nicht im Wort (grau):

solver.addGreenLetter(0, "a");

solver.addOrangeLetter(1,"r");

solver.addGreyLetter("o");            (Reihenfolge beliebig; funktioniert auch, wenn man die Buchstaben in groß eingibt)

solver.addGreyLetter("s");

solver.addGreyLetter("e");

Jetzt bestes Wort nach neuen Vorgaben -> solver.findBestWord(), Ergebnis: aural

und so weiter




