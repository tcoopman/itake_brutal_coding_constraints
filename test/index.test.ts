import * as test from 'tape';

type Coordinate = 0 | 1 | 2;

class Game {
    isOpen() {
        return true;
    }
    makeMove(line: Coordinate, column:Coordinate) {

    }
}

test('Create a new game', (t: test.Test) => {
    new Game();
    t.end();
});

test('A new game is always open', (t: test.Test) => {
    const game = new Game();
    t.equal(game.isOpen(), true);
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