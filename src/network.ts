export function networkV1() {
    /** The number of rows in the grid */
    let R: number; // 1 ≤ R ≤ 1000

    /** The number of columns in the grid */
    let C: number; // 1 ≤ C ≤ 1000

    /** The number of different altitudes considered in the model */
    let A: number; // 1 ≤ A ≤ 1000

    /** The number of target cells */
    let L: number; // 1 ≤ L ≤ 1000

    /** the coverage radius */
    let _V: number; // 1 ≤ V ≤ 100

    /** The number of available balloons */
    let _B: number; // 1 ≤ B ≤ 1000

    /** The number of turns in the simulation */
    let T: number; // 1 ≤ T ≤ 1000

    let targets: { r: number; c: number }[];

    let winds: { r: number; c: number }[][][];

    {
        // The content of the input data file
        const input = {
            grid: { rows: 2, columns: 3, altitudes: 1 },
            elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
            start: { row: 0, column: 0 },
            targets: [{ r: 0, c: 0 }],
            winds: [
                // Altitude 1 winds
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
                // Altitude 2 winds
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
                // Altitude 3 winds
                // [
                //     [
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //     ],
                //     [
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //     ],
                // ],
                // [
                //     [
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //     ],
                //     [
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //         { r: 1, c: 0 },
                //     ],
                // ],
            ],
        };

        R = input.grid.rows;
        C = input.grid.columns;
        A = input.grid.altitudes;
        L = input.elements.targets;
        _V = input.elements.radius;
        _B = input.elements.balloons;
        T = input.elements.turns;
        targets = input.targets;
        winds = input.winds;
    }

    {
        type Layer = number[][];

        const nbAltitudes = A + 1;
        const nbLayers = T * 2;
        const nbNodesPerLayer = R * C * nbAltitudes;

        const network: Layer[] = [];

        // Add altitude 0 winds
        {
            const groundWinds: { r: number; c: number }[][][] = [];
            groundWinds[0] = [];

            for (let iRow = 0; iRow < R; iRow++) {
                groundWinds[0][iRow] = [];
                for (let iColumn = 0; iColumn < C; iColumn++) {
                    groundWinds[0][iRow][iColumn] = { r: 0, c: 0 };
                }
            }

            winds = groundWinds.concat(winds);
        }

        for (let iLayer = 0; iLayer < nbLayers; iLayer++) {
            network[iLayer] = [];

            const isAltitudeLayer = iLayer % 2 == 0;
            const isWindLayer = iLayer % 2 == 1;

            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                network[iLayer][iNode] = [];

                // The number of nodes for a given altitude
                const altSize = C * R; // nbNodesPerAltitude

                for (let iEdge = 0; iEdge < nbNodesPerLayer; iEdge++) {
                    network[iLayer][iNode][iEdge] = 0;

                    if (isAltitudeLayer) {
                        // True if the edge is between two cells that represents the same cell, at == or != altitudes
                        const isSameCell = iNode % altSize == iEdge % altSize;

                        if (isSameCell) {
                            // True if the edge is close enough for an altitude change, and not at altitude 0 (ground)
                            const inLowerRange = iNode <= iEdge + altSize;
                            const inUpperRange = iNode >= iEdge - altSize;
                            const inRange = inLowerRange && inUpperRange;
                            const isNotGround =
                                iNode < altSize || altSize <= iEdge;

                            if (inRange && isNotGround) {
                                network[iLayer][iNode][iEdge] = 1;
                            }
                        }
                    }
                }

                if (isWindLayer) {
                    let newI = 0;

                    let weight = 1;
                    {
                        // winds[a][r][c]
                        const iAlt = Math.floor(iNode / altSize);
                        const iRow = Math.floor((iNode % altSize) / C);
                        const iCol = (iNode % altSize) % C;

                        const windC = winds[iAlt][iRow][iCol].c;
                        const windR = winds[iAlt][iRow][iCol].r;

                        const windShift = (windC % C) + (windR % R) * C;
                        const pos = ((iNode % altSize) + windShift) % altSize;
                        newI = pos + altSize * iAlt;

                        // Targets Coverage
                        // Increase edge weight if target is covered
                        for (let iTar = 0; iTar < L; iTar++) {
                            const target = targets[iTar];
                            const targetPos1 =
                                (target.c % C) + (target.r % R) * C;

                            const isGround = iAlt == 0;
                            const coversTarget = iNode % altSize == targetPos1;

                            if (coversTarget && !isGround) {
                                weight += 1;
                            }
                        }
                    }
                    network[iLayer][iNode][newI] = weight;
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

export function network() {
    /** The number of rows in the grid */
    let R: number; // 1 ≤ R ≤ 1000

    /** The number of columns in the grid */
    let C: number; // 1 ≤ C ≤ 1000

    /** The number of different altitudes considered in the model */
    let A: number; // 1 ≤ A ≤ 1000

    /** The number of target cells */
    let L: number; // 1 ≤ L ≤ 1000

    /** the coverage radius */
    let _V: number; // 1 ≤ V ≤ 100

    /** The number of available balloons */
    let _B: number; // 1 ≤ B ≤ 1000

    /** The number of turns in the simulation */
    let T: number; // 1 ≤ T ≤ 1000

    let targets: { r: number; c: number }[];

    let winds: { r: number; c: number }[][][];

    {
        // The content of the input data file
        const input = {
            grid: { rows: 2, columns: 3, altitudes: 3 },
            elements: { targets: 1, radius: 1, balloons: 1, turns: 1 },
            start: { row: 0, column: 0 },
            targets: [{ r: 0, c: 0 }],
            winds: [
                // Altitude 1 winds
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
                // Altitude 2 winds
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
                // Altitude 3 winds
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
            ],
        };

        R = input.grid.rows;
        C = input.grid.columns;
        A = input.grid.altitudes;
        L = input.elements.targets;
        _V = input.elements.radius;
        _B = input.elements.balloons;
        T = input.elements.turns;
        targets = input.targets;
        winds = input.winds;
    }

    {
        type Layer = { node: number; weight: number }[][];

        const nbAltitudes = A + 1;
        const nbLayers = T * 2;
        const nbNodesPerLayer = R * C * nbAltitudes;

        const network: Layer[] = [];

        // Add altitude 0 winds
        {
            const groundWinds: { r: number; c: number }[][][] = [];
            groundWinds[0] = [];

            for (let iRow = 0; iRow < R; iRow++) {
                groundWinds[0][iRow] = [];
                for (let iColumn = 0; iColumn < C; iColumn++) {
                    groundWinds[0][iRow][iColumn] = { r: 0, c: 0 };
                }
            }

            winds = groundWinds.concat(winds);
        }

        for (let iLayer = 0; iLayer < nbLayers; iLayer++) {
            network[iLayer] = [];

            const isAltitudeLayer = iLayer % 2 == 0;
            const isWindLayer = iLayer % 2 == 1;

            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                network[iLayer][iNode] = [];

                // The number of nodes for a given altitude
                const altSize = C * R; // nbNodesPerAltitude

                for (let iEdge = 0; iEdge < nbNodesPerLayer; iEdge++) {
                    // network[iLayer][iNode][iEdge] = { node: 0, weight: 0 };

                    if (isAltitudeLayer) {
                        // True if the edge is between two cells that represents the same cell, at == or != altitudes
                        const isSameCell = iNode % altSize == iEdge % altSize;

                        if (isSameCell) {
                            // True if the edge is close enough for an altitude change, and not at altitude 0 (ground)
                            const inLowerRange = iNode <= iEdge + altSize;
                            const inUpperRange = iNode >= iEdge - altSize;
                            const inRange = inLowerRange && inUpperRange;
                            const isNotGround =
                                iNode < altSize || altSize <= iEdge;

                            if (inRange && isNotGround) {
                                network[iLayer][iNode].push({
                                    node: iEdge,
                                    weight: 1,
                                });
                            }
                        }
                    }
                }

                if (isWindLayer) {
                    let node = 0;

                    let weight = 1;
                    {
                        // winds[a][r][c]
                        const iAlt = Math.floor(iNode / altSize);
                        const iRow = Math.floor((iNode % altSize) / C);
                        const iCol = (iNode % altSize) % C;

                        const windC = winds[iAlt][iRow][iCol].c;
                        const windR = winds[iAlt][iRow][iCol].r;

                        const windShift = (windC % C) + (windR % R) * C;
                        const pos = ((iNode % altSize) + windShift) % altSize;
                        node = pos + altSize * iAlt;

                        // Targets Coverage
                        // Increase edge weight if target is covered
                        for (let iTar = 0; iTar < L; iTar++) {
                            const target = targets[iTar];
                            const targetPos1 =
                                (target.c % C) + (target.r % R) * C;

                            const isGround = iAlt == 0;
                            const coversTarget = iNode % altSize == targetPos1;

                            if (coversTarget && !isGround) {
                                weight += 1;
                            }
                        }
                    }
                    network[iLayer][iNode].push({
                        node: node,
                        weight: weight,
                    });
                }
            }
        }

        // DEBUG
        for (let iLayer = 0; iLayer < network.length; iLayer++) {
            for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
                let str = "";
                str += iNode.toString().padStart(2, " ") + ": ";
                const nbEdge = network[iLayer][iNode].length;
                for (let iEdge = 0; iEdge < nbEdge; iEdge++) {
                    const edge = network[iLayer][iNode][iEdge].node;
                    // const weight = network[iLayer][iNode][iEdge].weight;
                    str += edge.toString().padStart(2, " ") + " ";
                    // str += "<" + weight.toString() + " ";
                }
                console.log(str);
            }
            console.log();
        }

        // DEBUG
        // for (let iLayer = 0; iLayer < network.length; iLayer++) {
        //     for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
        //         console.log(iNode, network[iLayer][iNode]);
        //     }
        //     console.log();
        // }
    }
}
