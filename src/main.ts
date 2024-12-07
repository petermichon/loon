import { extractContent } from "./extract.ts";
import { generateNetwork } from "./network.ts";
import { pathfind } from "./pathfind.ts";
import { formatContent } from "./format.ts";

export default function main() {
    {
        const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

        const fileContent = extractContent(fileAsString);

        fileContent;
        // console.log(fileContent);
    }

    {
        // const fileContent = {
        //     grid: { rows: 2, columns: 3, altitudes: 3 },
        //     elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
        //     start: { row: 0, column: 0 },
        //     targets: [{ r: 0, c: 0 }],
        //     //prettier-ignore
        //     winds: [
        //         // Altitude 1 winds
        //         [
        //             [{ r: 0, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 1 }],
        //             [{ r: 0, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 1 }],
        //         ],
        //         // Altitude 2 winds
        //         [
        //             [{ r: 1, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 0 }],
        //             [{ r: 1, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 0 }],
        //         ],
        //         // Altitude 3 winds
        //         [
        //             [{ r: 1, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 1 }],
        //             [{ r: 1, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 1 }],
        //         ],
        //     ],
        // };

        const fileContent = {
            grid: { rows: 1, columns: 3, altitudes: 3 },
            elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
            start: { row: 0, column: 0 },
            targets: [{ r: 0, c: 0 }],
            //prettier-ignore
            winds: [
                // Altitude 1 winds
                [
                    [{ r: 0, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 1 }],
                    [{ r: 0, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 1 }],
                ],
                // Altitude 2 winds
                [
                    [{ r: 0, c: -1 }, { r: 0, c: -1 }, { r: 0, c: -1 }],
                    [{ r: 0, c: -1 }, { r: 0, c: -1 }, { r: 0, c: -1 }],
                ],
                // Altitude 3 winds
                [
                    [{ r: 0, c: 0 }, { r: 0, c: 0 }, { r: 0, c: 0 }],
                    [{ r: 0, c: 0 }, { r: 0, c: 0 }, { r: 0, c: 0 }],
                ],
            ],
        };

        // (node + ...) % altSize
        // 0
        // 0
        // 0
        // 0
        // 0
        // 0
        // 1
        // 1
        // 1
        // 1
        // 1
        // 1
        // 3
        // 3
        // 3
        // 3
        // 3
        // 3
        // 4
        // 4
        // 4
        // 4
        // 4
        // 4

        const network = generateNetwork(fileContent);

        console.log(network);
    }

    //prettier-ignore
    // const network = [
    //     [
    //         [ { n:  0, w: 1 }, { n:  6, w: 1 } ],
    //         [ { n:  1, w: 1 }, { n:  7, w: 1 } ],
    //         [ { n:  2, w: 1 }, { n:  8, w: 1 } ],
    //         [ { n:  3, w: 1 }, { n:  9, w: 1 } ],
    //         [ { n:  4, w: 1 }, { n: 10, w: 1 } ],
    //         [ { n:  5, w: 1 }, { n: 11, w: 1 } ],
    //         [ { n:  6, w: 2 }, { n: 12, w: 2 } ],
    //         [ { n:  7, w: 1 }, { n: 13, w: 1 } ],
    //         [ { n:  8, w: 1 }, { n: 14, w: 1 } ],
    //         [ { n:  9, w: 1 }, { n: 15, w: 1 } ],
    //         [ { n: 10, w: 1 }, { n: 16, w: 1 } ],
    //         [ { n: 11, w: 1 }, { n: 17, w: 1 } ],
    //         [ { n:  6, w: 2 }, { n: 12, w: 2 }, { n: 18, w: 2 } ],
    //         [ { n:  7, w: 1 }, { n: 13, w: 1 }, { n: 19, w: 1 } ],
    //         [ { n:  8, w: 1 }, { n: 14, w: 1 }, { n: 20, w: 1 } ],
    //         [ { n:  9, w: 1 }, { n: 15, w: 1 }, { n: 21, w: 1 } ],
    //         [ { n: 10, w: 1 }, { n: 16, w: 1 }, { n: 22, w: 1 } ],
    //         [ { n: 11, w: 1 }, { n: 17, w: 1 }, { n: 23, w: 1 } ],
    //         [ { n: 12, w: 2 }, { n: 18, w: 2 } ],
    //         [ { n: 13, w: 1 }, { n: 19, w: 1 } ],
    //         [ { n: 14, w: 1 }, { n: 20, w: 1 } ],
    //         [ { n: 15, w: 1 }, { n: 21, w: 1 } ],
    //         [ { n: 16, w: 1 }, { n: 22, w: 1 } ],
    //         [ { n: 17, w: 1 }, { n: 23, w: 1 } ]
    //     ],
    //     [
    //         [ { n:  0, w: 1 } ], [ { n:  1, w: 1 } ],
    //         [ { n:  2, w: 1 } ], [ { n:  3, w: 1 } ],
    //         [ { n:  4, w: 1 } ], [ { n:  5, w: 1 } ],
    //         [ { n:  7, w: 1 } ], [ { n:  8, w: 1 } ],
    //         [ { n:  9, w: 1 } ], [ { n: 10, w: 1 } ],
    //         [ { n: 11, w: 1 } ], [ { n:  6, w: 1 } ],
    //         [ { n: 15, w: 1 } ], [ { n: 16, w: 1 } ],
    //         [ { n: 17, w: 1 } ], [ { n: 12, w: 1 } ],
    //         [ { n: 13, w: 1 } ], [ { n: 14, w: 1 } ],
    //         [ { n: 22, w: 1 } ], [ { n: 23, w: 1 } ],
    //         [ { n: 18, w: 1 } ], [ { n: 19, w: 1 } ],
    //         [ { n: 20, w: 1 } ], [ { n: 21, w: 1 } ]
    //     ]
    // ]

    // const network = [
    //     [
    //         [ { n:  0, w: 0 }, { n:  3, w: 0 } ],
    //         [ { n:  1, w: 0 }, { n:  4, w: 0 } ],
    //         [ { n:  2, w: 0 }, { n:  5, w: 0 } ],

    //         [ { n:  3, w: 1 }, { n:  6, w: 1 } ],
    //         [ { n:  4, w: 0 }, { n:  7, w: 0 } ],
    //         [ { n:  5, w: 0 }, { n:  8, w: 0 } ],

    //         [ { n:  3, w: 1 }, { n:  6, w: 1 }, { n:  9, w: 1 } ],
    //         [ { n:  4, w: 0 }, { n:  7, w: 0 }, { n: 10, w: 0 } ],
    //         [ { n:  5, w: 0 }, { n:  8, w: 0 }, { n: 11, w: 0 } ],

    //         [ { n:  6, w: 1 }, { n:  9, w: 1 } ],
    //         [ { n:  7, w: 0 }, { n: 10, w: 0 } ],
    //         [ { n:  8, w: 0 }, { n: 11, w: 0 } ],
    //     ],
    //     [
    //         // =
    //         [ { n:  0, w: 0 } ],
    //         [ { n:  1, w: 0 } ],
    //         [ { n:  2, w: 0 } ],
    //         // +1
    //         [ { n:  4, w: 0 } ],
    //         [ { n:  5, w: 0 } ],
    //         [ { n:  3, w: 0 } ],
    //         // -1
    //         [ { n:  8, w: 0 } ],
    //         [ { n:  6, w: 0 } ],
    //         [ { n:  7, w: 0 } ],
    //         // =
    //         [ { n:  9, w: 0 } ],
    //         [ { n: 10, w: 0 } ],
    //         [ { n: 11, w: 0 } ],
    //     ]
    // ]

    // const network = [
    //     // Copy 1 (original)
    //     [
    //         [ { n:  0, w: 0 }, { n:  4, w: 0 } ],
    //         [ { n:  1, w: 0 }, { n:  5, w: 0 } ],
    //         [ { n:  2, w: 0 }, { n:  3, w: 1 } ],

    //         [ { n:  4, w: 0 }, { n:  8, w: 0 } ],
    //         [ { n:  5, w: 0 }, { n:  6, w: 1 } ],
    //         [ { n:  3, w: 1 }, { n:  7, w: 0 } ],

    //         [ { n:  4, w: 0 }, { n:  8, w: 0 }, { n:  9, w: 1 } ],
    //         [ { n:  5, w: 0 }, { n:  6, w: 1 }, { n: 10, w: 0 } ],
    //         [ { n:  3, w: 1 }, { n:  7, w: 0 }, { n: 11, w: 0 } ],

    //         [ { n:  8, w: 0 }, { n:  9, w: 1 } ],
    //         [ { n:  6, w: 1 }, { n: 10, w: 0 } ],
    //         [ { n:  7, w: 0 }, { n: 11, w: 0 } ],
    //     ],
    // ]

    type Layer = { coverage: number, edges: number[] }[];

    const network: Layer[] = [
        // Copy 1 (original)
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
        // Copy 2
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
        // Copy 3
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
        // Copy 4
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
        // Copy 5
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

    let altitudes: number[] = [];
    {
        altitudes = pathfind(network);
    }

    altitudes;
    // console.log(altitudes);

    {
        const altitudes = [1, 1, 1, 0, 0];

        const outputContent = formatContent(altitudes);

        Deno.writeTextFileSync("./src/output/a_example.out", outputContent);
    }
}
