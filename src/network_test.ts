import { assertEquals } from "jsr:@std/assert";
import { generateNetwork } from "./network.ts";

type FileContent = {
    grid: { rows: number; columns: number; altitudes: number };
    elements: {
        targets: number;
        radius: number;
        balloons: number;
        turns: number;
    };
    start: { row: number; column: number };
    targets: { r: number; c: number }[];
    winds: { r: number; c: number }[][][];
};

type Layer = { coverage: number; edges: number[] }[];

Deno.test("Test n°1", () => {
    const fileContent: FileContent = {
        grid: { rows: 2, columns: 3, altitudes: 3 },
        elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
        start: { row: 0, column: 0 },
        targets: [{ r: 0, c: 0 }],
        winds: [
            [
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
            ],
            [
                [
                    { r: 1, c: 0 },
                    { r: 1, c: 0 },
                    { r: 1, c: 0 },
                ],
                [
                    { r: 1, c: 0 },
                    { r: 1, c: 0 },
                    { r: 1, c: 0 },
                ],
            ],
            [
                [
                    { r: 1, c: 1 },
                    { r: 1, c: 1 },
                    { r: 1, c: 1 },
                ],
                [
                    { r: 1, c: 1 },
                    { r: 1, c: 1 },
                    { r: 1, c: 1 },
                ],
            ],
        ],
    };

    const actual = generateNetwork(fileContent);

    const expected: Layer[] = [[]];

    assertEquals(actual, expected);
});

Deno.test("Test n°2", () => {
    const fileContent = {
        grid: { rows: 1, columns: 3, altitudes: 3 },
        elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
        start: { row: 0, column: 0 },
        targets: [{ r: 0, c: 0 }],
        winds: [
            [
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
            ],
            [
                [
                    { r: 0, c: -1 },
                    { r: 0, c: -1 },
                    { r: 0, c: -1 },
                ],
                [
                    { r: 0, c: -1 },
                    { r: 0, c: -1 },
                    { r: 0, c: -1 },
                ],
            ],
            [
                [
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                ],
                [
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                ],
            ],
        ],
    };

    const actual = generateNetwork(fileContent);

    const expected: Layer[] = [[]];

    assertEquals(actual, expected);
});
