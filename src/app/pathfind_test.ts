import { assertEquals } from "jsr:@std/assert";
// import { pathfind } from "./pathfind.ts";

type Layer = { coverage: number; edges: number[] }[];

Deno.test("Test n°1", () => {
    const _network: Layer[] = [
        // Layer 1
        [
            // Altitude 0 (ground)
            { coverage: 0, edges: [0, 4] },
            { coverage: 0, edges: [1, 5] },
            { coverage: 0, edges: [2, 3] },
            // Altitude 1
            { coverage: 1, edges: [4, 8] },
            { coverage: 0, edges: [5, 6] },
            { coverage: 0, edges: [3, 7] },
            // Altitude 2
            { coverage: 1, edges: [4, 8, 9] },
            { coverage: 0, edges: [5, 6, 10] },
            { coverage: 0, edges: [3, 7, 11] },
            // Altitude 3
            { coverage: 1, edges: [8, 9] },
            { coverage: 0, edges: [6, 10] },
            { coverage: 0, edges: [7, 11] },
        ],
        // Layer 2 (copy of layer 1)
        [
            { coverage: 0, edges: [0, 4] },
            { coverage: 0, edges: [1, 5] },
            { coverage: 0, edges: [2, 3] },

            { coverage: 1, edges: [4, 8] },
            { coverage: 0, edges: [5, 6] },
            { coverage: 0, edges: [3, 7] },

            { coverage: 1, edges: [4, 8, 9] },
            { coverage: 0, edges: [5, 6, 10] },
            { coverage: 0, edges: [3, 7, 11] },

            { coverage: 1, edges: [8, 9] },
            { coverage: 0, edges: [6, 10] },
            { coverage: 0, edges: [7, 11] },
        ],
        // Layer 3 (copy of layer 1)
        [
            { coverage: 0, edges: [0, 4] },
            { coverage: 0, edges: [1, 5] },
            { coverage: 0, edges: [2, 3] },

            { coverage: 1, edges: [4, 8] },
            { coverage: 0, edges: [5, 6] },
            { coverage: 0, edges: [3, 7] },

            { coverage: 1, edges: [4, 8, 9] },
            { coverage: 0, edges: [5, 6, 10] },
            { coverage: 0, edges: [3, 7, 11] },

            { coverage: 1, edges: [8, 9] },
            { coverage: 0, edges: [6, 10] },
            { coverage: 0, edges: [7, 11] },
        ],
        // Layer 4 (copy of layer 1)
        [
            { coverage: 0, edges: [0, 4] },
            { coverage: 0, edges: [1, 5] },
            { coverage: 0, edges: [2, 3] },

            { coverage: 1, edges: [4, 8] },
            { coverage: 0, edges: [5, 6] },
            { coverage: 0, edges: [3, 7] },

            { coverage: 1, edges: [4, 8, 9] },
            { coverage: 0, edges: [5, 6, 10] },
            { coverage: 0, edges: [3, 7, 11] },

            { coverage: 1, edges: [8, 9] },
            { coverage: 0, edges: [6, 10] },
            { coverage: 0, edges: [7, 11] },
        ],
        // Layer 5 (copy of layer 1)
        [
            { coverage: 0, edges: [0, 4] },
            { coverage: 0, edges: [1, 5] },
            { coverage: 0, edges: [2, 3] },

            { coverage: 1, edges: [4, 8] },
            { coverage: 0, edges: [5, 6] },
            { coverage: 0, edges: [3, 7] },

            { coverage: 1, edges: [4, 8, 9] },
            { coverage: 0, edges: [5, 6, 10] },
            { coverage: 0, edges: [3, 7, 11] },

            { coverage: 1, edges: [8, 9] },
            { coverage: 0, edges: [6, 10] },
            { coverage: 0, edges: [7, 11] },
        ],
    ];

    // const actual = pathfind(network);
    const actual = [0];

    const expected = [1, 0, 0, 0, 0];

    assertEquals(actual, expected);
});
