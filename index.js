const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout
});

rl.question(
    'Введите двумерный массив размерности NxV, где N - кол-во пробирок, а V - кол-во жидкости в пробирке: ',
    (input) => {
        const inputState = JSON.parse(input);

        const result = solve(inputState, inputState[0].length);
        if (result) {
            console.log("Решение найдено за", result.length, "ходов:");
            console.log(result.map(m => `(${m[0]}, ${m[1]})`).join(" "));
        } else {
            console.log("Решение не найдено");
        }

        rl.close();
    });

function serialize(state) {
    return state.map(tube => tube.join(",")).join("|");
}

function isSolved(state, tubeCapacity) {
    return state.every(tube =>
        tube.length === 0 ||
        (tube.length === tubeCapacity && tube.every(liquid => liquid === tube[0]))
    );
}

function getMoves(state, tubeCapacity) {
    const moves = [];
    for (let i = 0; i < state.length; i++) {
        if (state[i].length === 0) {
            continue;
        }

        const liquid = state[i][state[i].length - 1];
        for (let j = 0; j < state.length; j++) {
            if (i === j) {
                continue;
            }

            if (state[j].length === tubeCapacity) {
                continue;
            }

            const tubeIsEmpty = state[j].length === 0;
            const tubeHasSameLiquid = state[j][state[j].length - 1] === liquid;
            if (tubeIsEmpty || tubeHasSameLiquid) {
                let liquidCount = 1;
                for (let k = state[i].length - 2; k >= 0; k--) {
                    if (state[i][k] === liquid) {
                        liquidCount++;
                    } else {
                        break;
                    }
                }

                const spaceLeft = tubeCapacity - state[j].length;
                const amount = Math.min(liquidCount, spaceLeft);
                moves.push([i, j, amount]);
            }
        }
    }

    return moves;
}

function applyMove(state, move) {
    const [from, to, amount] = move;
    const newState = state.map(tube => [...tube]);

    const poured = newState[from].splice(newState[from].length - amount, amount);
    newState[to].push(...poured);
    return newState;
}

function solve(initialState, tubeCapacity) {
    const stateQueue = [];
    const visitedStates = new Set();

    stateQueue.push({state: initialState, path: []});
    visitedStates.add(serialize(initialState));

    while (stateQueue.length > 0) {
        const {state, path} = stateQueue.shift();

        if (isSolved(state, tubeCapacity)) {
            return path;
        }

        for (const move of getMoves(state, tubeCapacity)) {
            const newState = applyMove(state, move);
            const key = serialize(newState);

            if (!visitedStates.has(key)) {
                visitedStates.add(key);
                stateQueue.push({state: newState, path: [...path, [move[0], move[1]]]});
            }
        }
    }

    return null;
}