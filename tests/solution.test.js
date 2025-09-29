const solve = require("../solution");

describe("solve", () => {
    test("should find solution for simple swap", () => {
        const state = [["R", "G"], ["G", "R"], [], []];

        const result = solve(state, 2);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });


    test("should return empty array if already solved", () => {
        const state = [["R", "R"], ["G", "G"], []];

        const result = solve(state, 2);

        expect(result).toEqual([]);
    });


    test("should work if extra empty tubes exist", () => {
        const state = [["R", "G"], ["G", "R"], [], [], []];

        const result = solve(state, 2);

        expect(Array.isArray(result)).toBe(true);
    });


    test("should solve case with 3 colors and 2 empty tubes", () => {
        const state = [["R", "G", "B"], ["B", "R", "G"], ["G", "B", "R"], [], []];

        const result = solve(state, 3);

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });


    test("should handle single tube with V=1 as solved", () => {
        const state = [["R"]];

        const result = solve(state, 1);

        expect(result).toEqual([]);
    });
});
