let game = {
    score: 0,
    turnNumber: 0,
    currentGame: [],
    playerMoves: [],
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
}

newGame = () => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {   //only accepts clicks if game is in progress
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;     //stores value of last circle clicked
                    this.lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

showScore = () => document.getElementById("score").innerText = game.score;

addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor((Math.random() * 4))]);
    showTurns();
};

lightsOn = (circ) => {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => { //turns light off after 400 ms
        document.getElementById(circ).classList.remove("light");
    }, 400)
};

showTurns = () => {
    game.turnNumber = 0;
    game.turnInProgress = true;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);

}

playerTurn = () => {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong Move!");
        newGame();
    }
}


module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
};