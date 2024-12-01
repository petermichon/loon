export function network() {
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
        const nbNodesPerLayer = R * C * (A + 1);
        const nbLayers = T * 2;

        const network: Layer[] = new Array(nbLayers);

        for (let iLayer = 0; iLayer < 2; iLayer++) {
            network[iLayer] = new Array(nbNodesPerLayer);

            const isAltitudeLayer = iLayer % 2 == 0;
            const isWindLayer = iLayer % 2 == 1;

            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                network[iLayer][iNode] = new Array(nbNodesPerLayer);
                for (let iEdge = 0; iEdge < nbNodesPerLayer; iEdge++) {
                    network[iLayer][iNode][iEdge] = 0;

                    if (isAltitudeLayer) {
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

                    if (isWindLayer) {
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
        }

        console.log(network);
    }
}
