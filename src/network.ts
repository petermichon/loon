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
            grid: { rows: 2, columns: 3, altitudes: 2 },
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

        const nbAltitudes = A + 1;
        const nbLayers = T * 2;
        const nbNodesPerLayer = R * C * nbAltitudes;

        const network: Layer[] = [];

        for (let iLayer = 0; iLayer < nbLayers; iLayer++) {
            network[iLayer] = [];

            const isAltitudeLayer = iLayer % 2 == 0;
            const isWindLayer = iLayer % 2 == 1;

            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                network[iLayer][iNode] = [];

                for (let iEdge = 0; iEdge < nbNodesPerLayer; iEdge++) {
                    network[iLayer][iNode][iEdge] = 0;

                    if (isAltitudeLayer) {
                        // The distance in a layer between two nodes that represents the same cell but at different altitudes
                        const gap = C * R;

                        // True if the edge is between two cells that represents the same cell, at == or != altitudes
                        const isSameCell = iNode % gap == iEdge % gap;

                        if (isSameCell) {
                            // True if the edge is close enough for an altitude change, and not at altitude 0 (ground)
                            const inLowerRange = iNode <= iEdge + gap;
                            const inUpperRange = iNode >= iEdge - gap;
                            const inRange = inLowerRange && inUpperRange;
                            const isNotGround = iNode < gap || gap <= iEdge;

                            if (inRange && isNotGround) {
                                network[iLayer][iNode][iEdge] = 1;
                            }
                        }
                    }

                    if (isWindLayer) {
                        if (iNode < C) {
                            network[iLayer][iNode][iNode] = 1;
                        }
                        if (iNode >= C) {
                            const dR = winds[0][0][0].r;
                            const dC = winds[0][0][0].c;
                            const nR = ((iNode + dR) % C) + C;
                            const nC = ((iNode + dC) % C) + C;
                            network[iLayer][nR][nC] = 1;
                        }
                    }
                }
            }
        }

        // DEBUG
        for (let iLayer = 0; iLayer < network.length; iLayer++) {
            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                console.log(
                    network[iLayer][iNode]
                        .toString()
                        .replace(/,/g, " ")
                        .replace(/0/g, "·")
                );
            }
            console.log();
        }
    }
}
