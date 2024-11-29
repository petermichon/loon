const _example = {
    grid: { rows: 3, columns: 5, altitudes: 3 },
    elements: { targets: 2, radius: 1, balloons: 1, turns: 5 },
    start: { row: 1, column: 2 },
    targets: [
        { row: 0, column: 2 },
        { row: 0, column: 4 },
    ],
    // prettier-ignore
    winds: [
        [
            [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
            [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
            [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]],
        ],
        [
            [[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0]],
            [[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0]],
            [[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0]],
        ],
        [
            [[0, 1], [0, 1], [0, 1], [0, 2], [0, 1]],
            [[0, 2], [0, 1], [0, 2], [0, 3], [0, 2]],
            [[0, 1], [0, 1], [0, 1], [0, 2], [0, 1]],
        ],
    ],
};

export default function main() {
    /** The number of rows in the grid */
    let R: number; // 1 ≤ R ≤ 1000

    /** The number of columns in the grid */
    let C: number; // 1 ≤ C ≤ 1000

    /** The number of different altitudes considered in the model */
    let A: number; // 1 ≤ A ≤ 1000

    /** The number of target cells */
    let _L: number; // 1 ≤ L ≤ 1000

    /** the coverage radius */
    let _V: number; // 1 ≤ V ≤ 100

    /** The number of available balloons */
    let _B: number; // 1 ≤ B ≤ 1000

    /** The number of turns in the simulation */
    let T: number; // 1 ≤ T ≤ 1000

    let winds: { r: number; c: number }[][][];

    {
        // The content of the input data file
        const input = {
            grid: { rows: 1, columns: 3, altitudes: 1 },
            elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
            start: { row: 0, column: 0 },
            targets: [{ row: 0, column: 1 }],
            // prettier-ignore
            winds: [
                [
                    [
                        { r: 0, c: 1 }, { r: 0, c: 1 }, { r: 0, c: 1 },
                    ],
                ],
            ],
        };

        R = input.grid.rows;
        C = input.grid.columns;
        A = input.grid.altitudes;
        _L = input.elements.targets;
        _V = input.elements.radius;
        _B = input.elements.balloons;
        T = input.elements.turns;
        winds = input.winds;
    }

    {
        type Layer = number[][];
        const layerSize = R * C * (A + 1);
        const networkSize = T * 2;

        const network: Layer[] = new Array(networkSize);

        for (let iLayer = 0; iLayer < 2; iLayer++) {
            network[iLayer] = new Array(layerSize);

            // Layers
            const isAltitudeLayer = iLayer % 2 == 0;
            const isWindLayer = iLayer % 2 == 1;

            if (isAltitudeLayer) {
                // Nodes
                for (let iNode = 0; iNode < layerSize; iNode++) {
                    network[iLayer][iNode] = new Array(layerSize);

                    // Edges
                    for (let iEdge = 0; iEdge < layerSize; iEdge++) {
                        network[iLayer][iNode][iEdge] = 0;

                        const isSameCell = iNode % C == iEdge % C;
                        if (isSameCell) {
                            if (iNode < C) {
                                network[iLayer][iNode][iEdge] = 1;
                            }
                            if (iNode >= C) {
                                if (iEdge > 2) {
                                    network[iLayer][iNode][iEdge] = 1;
                                }
                            }
                        }
                    }
                }
            }
            const w = [
                [
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                    { r: 0, c: 0 },
                ],
            ];
            w.push(winds[0][0]);

            if (isWindLayer) {
                for (let iNode = 0; iNode < layerSize; iNode++) {
                    network[iLayer][iNode] = new Array(layerSize);
                    for (let iEdge = 0; iEdge < layerSize; iEdge++) {
                        network[iLayer][iNode][iEdge] = 0;
                    }
                    if (iNode < 3) {
                        network[iLayer][iNode][iNode] = 1;
                    }
                    if (iNode >= 3) {
                        const dR = winds[0][0][0].r;
                        const dC = winds[0][0][0].c;
                        const nR = ((iNode + dR) % C) + 3;
                        const nC = ((iNode + dC) % C) + 3;
                        network[iLayer][nR][nC] = 1;
                    }
                }
            }
        }

        console.log(network);
    }
}
