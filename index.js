const readline = require('readline');
const solve = require('./solution');

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout
});

rl.question(
    'Введите двумерный массив размерности NxV, где N - кол-во пробирок, а V - кол-во жидкости в пробирке: ',
    (input) => {

        try{
            const inputState = JSON.parse(input);
            validateInputState(inputState);

            const result = solve(inputState, inputState[0].length);
            if (result) {
                console.log("Решение найдено за", result.length, "ходов:");
                console.log(result.map(m => `(${m[0]}, ${m[1]})`).join(" "));
            } else {
                console.log("Решение не найдено");
            }
        }
        catch (e) {
            console.error(e.message);
        }

        rl.close();
    });

function validateInputState(state) {
    if (!Array.isArray(state) || state.length === 0) {
        throw new Error("Должен быть непустой массив пробирок");
    }

    const V = Math.max(...state.map(t => t.length), 0);

    if (V === 0) {
        throw new Error("Все пробирки пусты");
    }

    state.forEach((tube, idx) => {
        if (!Array.isArray(tube)) {
            throw new Error(`Пробирка №${idx} должна быть массивом`);
        }

        if (tube.length > V) {
            throw new Error(`Пробирка №${idx} превышает объём V = ${V}`);
        }

        tube.forEach((drop, j) => {
            if (typeof drop !== "string" && typeof drop !== "number") {
                throw new Error(
                    `Недопустимый тип в пробирке №${idx}, позиции ${j}: ${drop}`
                );
            }
        });
    });

    const liquidCounts = {};
    for (const tube of state) {
        for (const liquid of tube) {
            liquidCounts[liquid] = (liquidCounts[liquid] || 0) + 1;
        }
    }

    const totalPerColor = Object.values(liquidCounts);
    const M = Object.keys(liquidCounts).length;
    const N = state.length;

    const firstLiquidCount = totalPerColor[0];
    if (!totalPerColor.every(liquid => liquid === firstLiquidCount)) {
        throw new Error("Все жидкости должны встречаться одинаковое количество раз");
    }

    if (firstLiquidCount !== V) {
        throw new Error(
            `Каждая жидкость должна занимать ровно V = ${V} капель (сейчас ${firstLiquidCount})`
        );
    }

    if (N <= M) {
        throw new Error(`Должно выполняться N > M (сейчас N=${N}, M=${M})`);
    }
}

module.exports = {validateInputState};