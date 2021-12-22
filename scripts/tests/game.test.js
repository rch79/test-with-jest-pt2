/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

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

    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });

    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });

    test("turnInProgress key should have a default false value", () => {
        expect(game.turnInProgress).toBe(false);
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

    test("turn number key exists", () => {
        expect("turnNumber" in game).toBe(true);
    }); 

    test("choices array contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame function should reset score, currentGame and playerMoves variables", () => {
    /* beforeAll below will assign test values to the variables to ensure that the newGame function will reset them
    as expected */
    beforeAll( () => {      //will run only once before all test statements within this describe block
        game.score = 42;
        game.turnNumber = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = 42;
        newGame();
    });

    test("newGame() should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });

    test("newGame() should set the turn number to zero", () => {
        expect(game.turnNumber).toEqual(0);
    })

    test("there should be one movement in the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });

    test("newGame() should set playerMoves array to empty", () => {
        expect(game.playerMoves.length).toEqual(0);
    });

    test("newGame() should display 0 for the element with an id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {      //will run before each test statement within this describe block
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });

    afterEach(() => {
        game.score = 0;
        game.currentGame =[];
        game.playerMoves = [];
    });

    test("add turn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });

    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);  //addTurn runs before each test block, so there will always be a button at the first position of the array for this test
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });

    test("showTurns should update game,turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toEqual(0);
    });

    test("showTurns should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toEqual(true);
    });

    test("Clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });

    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });

    test("should increment score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);    //ensures playerTurn equals current turn
        playerTurn();
        expect(game.score).toEqual(1);
    });

    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move!");
    });
});
