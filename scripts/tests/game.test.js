/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// testing the game object to ensure correct keypairs exist
describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });

    test("currentGame array exists", () => {
        expect("currentGame" in game).toBe(true);
    });

    test("playerMoves array exists", () => {
        expect("playerMoves" in game).toBe(true);
    });

    test("choices array exists", () => {
        expect("choices" in game).toBe(true);
    });

    test("choices array contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame function should reset score, currentGame and playerMoves variables", () => {
    /* beforeAll below will assign test values to the variables to ensure that the newGame function will reset them
    as expected */
    beforeAll( () => {
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = 42;
        newGame();
    });

    test("newGame() should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });

    test("newGame() should set currentGame array to empty", () => {
        expect(game.currentGame.length).toEqual(0);
    });

    test("newGame() should set playerMoves array to empty", () => {
        expect(game.playerMoves.length).toEqual(0);
    });

    test("newGame() should display 0 for the element with an id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

