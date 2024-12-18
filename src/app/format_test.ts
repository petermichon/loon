import { assertEquals } from "jsr:@std/assert";
import { formatContent } from "./format.ts";

Deno.test("Test n°1", () => {
    const altitudes = [1, 0, -1, 1, 0];
    const actual = formatContent(altitudes);

    const expected = `1\n` + `0\n` + `-1\n` + `1\n` + `0\n`;

    assertEquals(actual, expected);
});

Deno.test("Test n°2", () => {
    const altitudes = [1];
    const actual = formatContent(altitudes);

    const expected = `1\n`;

    assertEquals(actual, expected);
});

Deno.test("Test n°3", () => {
    const altitudes: number[] = [];
    const actual = formatContent(altitudes);

    const expected = `\n`;

    assertEquals(actual, expected);
});

Deno.test("Test n°4", () => {
    const altitudes = [12, 0, -389, -5];
    const actual = formatContent(altitudes);

    const expected = `12\n` + `0\n` + `-389\n` + `-5\n`;

    assertEquals(actual, expected);
});
