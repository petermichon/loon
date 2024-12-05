// import { extractContent } from "./extract.ts";
// import { generateNetwork } from "./network.ts";
// import { pathfind } from "./pathfind.ts";

// import { Graph } from "@dagrejs/graphlib";
import dijkstra from "dijkstrajs";

// import { formatContent } from "./format.ts";

export default function main() {
    // const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

    // const fileContent = extractContent(fileAsString);

    // console.log(fileContent);

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

    // const network = generateNetwork(fileContent);

    // console.log(network);

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

    const layerSize = network[0].length;
    const networkSize = network.length * layerSize;

    const startNode = "start";
    const endNode = "end";

    const altitudes: number[] = [];

    const graph: { [key: string]: { [key: string]: number } } = {};

    graph[startNode] = { 0: 0 };

    for (let iLayer = 0; iLayer < network.length; iLayer++) {
        const layer = network[iLayer];

        for (let iNode = 0; iNode < layer.length; iNode++) {
            const node = iNode + iLayer * layer.length;
            graph[node] = {};

            for (const edge of layer[iNode].edges) {
                const weight = 0 - network[iLayer][edge].coverage;
                graph[node][edge + (iLayer + 1) * layer.length] = weight;
            }
        }
    }

    // Create a last layer to connect to the end node
    for (let node = networkSize; node < networkSize + layerSize; node++) {
        graph[node] = {};
        graph[node][endNode] = 0;
    }

    // Add end node
    graph[endNode] = {};

    console.log(graph);

    const path = dijkstra.find_path(graph, startNode, endNode);

    console.log(path);

    altitudes;
    // console.log(altitudes);

    // const altitudeAdjustments = [1, 1, 1, 0, 0];

    // const outputContent = formatContent(altitudeAdjustments);

    // Deno.writeTextFileSync("./src/output/a_example.out", outputContent);
}
