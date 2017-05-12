import * as test from 'tape';

type ValidNumber = 0 | 1 | 2;
type Coordinate = [ValidNumber, ValidNumber];

type Result = 'LegalMove' | 'IllegalMove';

class Board {
    matrix: Map<string, Value>
    lastMove: Result;

    constructor() {
        this.matrix = new Map();
    }

    add(line:ValidNumber, column:ValidNumber, value:Value): Result{
        this.lastMove = 'IllegalMove';
        const coordinate = `${line},${column}`;
        !this.matrix.has(coordinate) && this.updateMatrix(coordinate, value) && this.setValidMove();

        return this.lastMove;
    }

    setValidMove() {
        this.lastMove = 'LegalMove';
    }

    updateMatrix(coo: string, value: Value) {
        this.matrix = this.matrix.set(coo, value);
        return true;
    }
}
type Value = 'X' | 'O';

interface Player {
    value: () => Value;
    switchPlayer: () => Player
}
class PlayerX implements Player {
    value() { const x: Value = 'X'; return x;}
    switchPlayer() {
        return new PlayerO();
    }
}
class PlayerO implements Player {
    value() { const o: Value = 'O'; return o;}

    switchPlayer() {
        return new PlayerX();
    }
}

class Game {
    board: Board
    currentPlayer: Player;

    constructor() {
        this.board = new Board();
        this.currentPlayer = new PlayerX();
    }
    makeMove(line: ValidNumber, column:ValidNumber) {
        const result = this.board.add(line, column, 'X');
        result === 'LegalMove' && this.switchPlayer();
        return this.currentPlayer;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer.switchPlayer();
    }
}

test('Create a new game', (t: test.Test) => {
    new Game();
    t.end();
});

test('Make a new legal move', (t: test.Test) => {
    const game = new Game();
    game.makeMove(0, 0);
    t.end();
});

test('You cannot make an illegal move', (t: test.Test) => {
    // Impossible by the compiler
    t.end();
});

test('After every legal move you switch player', (t: test.Test) => {
    const game = new Game();
    t.equal(game.makeMove(0, 0).value(), 'O');
    t.equal(game.makeMove(0, 1).value(), 'X');
    t.end();
});

test('You only switch players after you make a legal move', (t: test.Test) => {
    const game = new Game();
    t.equal(game.makeMove(0, 0).value(), 'O');
    t.equal(game.makeMove(0, 0).value(), 'O');
    t.end();
});