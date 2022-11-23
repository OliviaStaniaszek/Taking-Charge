class Game {

    constructor() {
        //boolean, did the game start?
        this.gameStarted = gameStarted;
        //int, this is the index of the questions array
        this.level = this.level;
        document.getElementById("level").innerHTML = "level" + level;
    }



    circuitBoard = new CircuitBoard(how many blank, ....);
    questions = new [
        Question("what is...", "Hint...", 1),
        Question("what is...", "Hint...", 2),
        ...
    ];

    /*
    checks if the answer is correct, and returns a boolean 
    this is based on:
        circuitBoard.getCircuitCurrent();
        circuitBoard.getCircuitComponents();
        circuitBoard.isCircuitClosed();
    and comparing with the info from the question class 
        answerAmpere, answerComponents...
    */

    isCorrect() { };

}