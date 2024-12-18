import { assertEquals } from "jsr:@std/assert";
import { extractContent } from "./extract.ts";

Deno.test("Test n°1", () => {
    const fileAsString =
        `3 5 3\n` +
        `2 1 1 5\n` +
        `1 2\n` +
        `0 2\n` +
        `0 4\n` +
        `0 1 0 1 0 1 0 1 0 1\n` +
        `0 1 0 1 0 1 0 1 0 1\n` +
        `0 1 0 1 0 1 0 1 0 1\n` +
        `-1 0 -1 0 -1 0 -1 0 -1 0\n` +
        `-1 0 -1 0 -1 0 -1 0 -1 0\n` +
        `-1 0 -1 0 -1 0 -1 0 -1 0\n` +
        `0 1 0 1 0 1 0 2 0 1\n` +
        `0 2 0 1 0 2 0 3 0 2\n` +
        `0 1 0 1 0 1 0 2 0 1\n` +
        ``;
    const actual = extractContent(fileAsString);

    const expected = {
        grid: { rows: 3, columns: 5, altitudes: 3 },
        elements: { targets: 2, radius: 1, balloons: 1, turns: 5 },
        start: { row: 1, column: 2 },
        targets: [
            { r: 0, c: 2 },
            { r: 0, c: 4 },
        ],
        winds: [
            [
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                ],
            ],
            [
                [
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                ],
                [
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                ],
                [
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                    { r: -1, c: 0 },
                ],
            ],
            [
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 2 },
                    { r: 0, c: 1 },
                ],
                [
                    { r: 0, c: 2 },
                    { r: 0, c: 1 },
                    { r: 0, c: 2 },
                    { r: 0, c: 3 },
                    { r: 0, c: 2 },
                ],
                [
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 1 },
                    { r: 0, c: 2 },
                    { r: 0, c: 1 },
                ],
            ],
        ],
    };

    assertEquals(actual, expected);
});
