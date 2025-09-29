const {validateInputState} = require("../index");

describe("validateInput", () => {
    test("valid input with different symbols and numbers should pass", () => {
        const state = [[1, 2], [2, 1], [], []];
        expect(() => validateInputState(state)).not.toThrow();
    });
    test("should throw if state is not an array", () => {
        expect(() => validateInputState("not-an-array")).toThrow("Должен быть непустой массив пробирок");
    });
    test("should throw if tube is not an array", () => {
        const state = [["R", "G"], "oops", []];
        expect(() => validateInputState(state)).toThrow("Пробирка №1 должна быть массивом");
    });
    test("should throw if tube contains invalid element type", () => {
        const state = [["R", {}], ["G", "G"], []];
        expect(() => validateInputState(state)).toThrow("Недопустимый тип в пробирке №0, позиции 1: [object Object]");
    });
    test("should throw if all tubes are empty", () => {
        const state = [[], [], []];
        expect(() => validateInputState(state)).toThrow("Все пробирки пусты");
    });
    test("should throw if liquids are unevenly distributed", () => {
        const state = [["R", "R", "R"], ["G", "G", "G", "G"], []];
        expect(() => validateInputState(state)).toThrow("Все жидкости должны встречаться одинаковое количество раз");
    });
    test("should throw if number of tubes <= number of colors", () => {
        const state = [["R", "R"], ["G", "G"]];
        expect(() => validateInputState(state)).toThrow("Должно выполняться N > M (сейчас N=2, M=2)");
    });
    test("should throw if one tube is longer than V", () => {
        const state = [["R", "R", "R"], ["G", "G"], ["R", "R", "R", "R"]];
        expect(() => validateInputState(state)).toThrow();
    });
});