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

type LayerV1 = { n: number; w: number }[][];

export function generateNetworkV1(fileContent: FileContent): LayerV1[] {
    const network: LayerV1[] = [];

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
        R = fileContent.grid.rows;
        C = fileContent.grid.columns;
        A = fileContent.grid.altitudes;
        L = fileContent.elements.targets;
        _V = fileContent.elements.radius;
        _B = fileContent.elements.balloons;
        T = fileContent.elements.turns;
        targets = fileContent.targets;
        winds = fileContent.winds;
    }

    {
        const nbAltitudes = A + 1;
        const nbLayers = T * 2;
        const nbNodesPerLayer = R * C * nbAltitudes;

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
                const altSize = C * R; // i.e. nbNodesPerAltitude

                if (isAltitudeLayer) {
                    let below = iNode - altSize;
                    let above = iNode + altSize;

                    if (below < 0) {
                        below += altSize;
                    }
                    if (above >= nbNodesPerLayer) {
                        above -= altSize;
                    }

                    const isGround = iNode < altSize;

                    if (!isGround) {
                        const belowIsGround = below < altSize;
                        if (belowIsGround) {
                            // Should only happen at altitude 1
                            below += altSize;
                        }
                    }

                    let weight = 0;

                    {
                        const iAlt = Math.floor(iNode / altSize);

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

                    for (let edge = below; edge <= above; edge += altSize) {
                        network[iLayer][iNode].push({
                            n: edge,
                            w: weight,
                        });
                    }
                }

                if (isWindLayer) {
                    let node = 0;

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
                    }
                    network[iLayer][iNode].push({
                        n: node,
                        w: 0,
                    });
                }
            }
        }

        // DEBUG
        // for (let iLayer = 0; iLayer < network.length; iLayer++) {
        //     for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
        //         let str = "";
        //         str += iNode.toString().padStart(2, " ") + ": ";
        //         const nbEdge = network[iLayer][iNode].length;
        //         for (let iEdge = 0; iEdge < nbEdge; iEdge++) {
        //             const edge = network[iLayer][iNode][iEdge].node;
        //             const weight = network[iLayer][iNode][iEdge].weight;
        //             str += edge.toString().padStart(2, " ") + " ";
        //             str += "(" + weight.toString() + ")  ";
        //         }
        //         console.log(str);
        //     }
        //     console.log();
        // }

        // DEBUG
        // for (let iLayer = 0; iLayer < network.length; iLayer++) {
        //     for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
        //         console.log(iNode, network[iLayer][iNode]);
        //     }
        //     console.log();
        // }
    }

    return network;
}

type Layer = { coverage: number; edges: number[] }[];

// const network: Layer[] = [
//     // Copy 1 (original)
//     [
//         { coverage: 0, edges: [0, 4] },
//         { coverage: 0, edges: [1, 5] },
//         { coverage: 0, edges: [2, 3] },

//         { coverage: 1, edges: [4, 8] },
//         { coverage: 0, edges: [5, 6] },
//         { coverage: 0, edges: [3, 7] },

//         { coverage: 1, edges: [4, 8, 9] },
//         { coverage: 0, edges: [5, 6, 10] },
//         { coverage: 0, edges: [3, 7, 11] },

//         { coverage: 1, edges: [8, 9] },
//         { coverage: 0, edges: [6, 10] },
//         { coverage: 0, edges: [7, 11] },
//     ],
//     // Copy 2
//     [
//         { coverage: 0, edges: [0, 4] },
//         { coverage: 0, edges: [1, 5] },
//         { coverage: 0, edges: [2, 3] },

//         { coverage: 1, edges: [4, 8] },
//         { coverage: 0, edges: [5, 6] },
//         { coverage: 0, edges: [3, 7] },

//         { coverage: 1, edges: [4, 8, 9] },
//         { coverage: 0, edges: [5, 6, 10] },
//         { coverage: 0, edges: [3, 7, 11] },

//         { coverage: 1, edges: [8, 9] },
//         { coverage: 0, edges: [6, 10] },
//         { coverage: 0, edges: [7, 11] },
//     ],
// ];

export function generateNetwork(fileContent: FileContent): Layer[] {
    const network: Layer[] = [];

    /** The number of rows in the grid */
    let R: number; // 1 ≤ R ≤ 1000

    /** The number of columns in the grid */
    let C: number; // 1 ≤ C ≤ 1000

    /** The number of different altitudes considered in the model */
    let A: number; // 1 ≤ A ≤ 1000

    /** The number of target cells */
    let L: number; // 1 ≤ L ≤ 1000

    /** the coverage radius */
    let V: number; // 1 ≤ V ≤ 100

    /** The number of available balloons */
    let _B: number; // 1 ≤ B ≤ 1000

    /** The number of turns in the simulation */
    let T: number; // 1 ≤ T ≤ 1000

    let targets: { r: number; c: number }[];

    let winds: { r: number; c: number }[][][];

    {
        R = fileContent.grid.rows;
        C = fileContent.grid.columns;
        A = fileContent.grid.altitudes;
        L = fileContent.elements.targets;
        V = fileContent.elements.radius;
        _B = fileContent.elements.balloons;
        T = fileContent.elements.turns;
        targets = fileContent.targets;
        winds = fileContent.winds;
    }

    const nbAltitudes = A + 1;
    const nbLayers = T;
    const nbNodesPerLayer = R * C * nbAltitudes;

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

    // The number of nodes for a given altitude
    const altSize = C * R; // i.e. nbNodesPerAltitude

    for (let iLayer = 0; iLayer < nbLayers; iLayer++) {
        network[iLayer] = [];

        for (let iNode = 0; iNode < nbNodesPerLayer; iNode++) {
            type Node = { coverage: number; edges: number[] };
            const node: Node = { coverage: 0, edges: [] };

            // Targets Coverage
            {
                for (let iTar = 0; iTar < L; iTar++) {
                    const target = targets[iTar];
                    const targetPos1 = (target.c % C) + (target.r % R) * C;

                    const isGround = iNode < altSize;
                    const coversTarget = iNode % altSize == targetPos1;

                    if (coversTarget && !isGround) {
                        node.coverage += 1;
                    }
                }
            }

            // Edges
            {
                let below = iNode - altSize;
                let above = iNode + altSize;

                if (below < 0) {
                    below += altSize;
                }
                if (above >= nbNodesPerLayer) {
                    above -= altSize;
                }

                const isGround = iNode < altSize;

                if (!isGround) {
                    const belowIsGround = below < altSize;
                    if (belowIsGround) {
                        // Should only happen at altitude 1
                        below += altSize;
                    }
                }

                for (let edge = below; edge <= above; edge += altSize) {
                    node.edges.push(edge);
                }

                // console.log(node.edges);

                let nodeWShift = 0;
                for (let iEdge = 0; iEdge < node.edges.length; iEdge++) {
                    const iNode = node.edges[iEdge];

                    const iAlt = Math.floor(iNode / altSize);
                    const iRow = Math.floor((iNode % altSize) / C);
                    const iCol = (iNode % altSize) % C;

                    const windC = winds[iAlt][iRow][iCol].c;
                    const windR = winds[iAlt][iRow][iCol].r;

                    const windShift = (windC % C) + (windR % R) * C;
                    // const pos = ((iNode % altSize) + windShift) % altSize;
                    // nodeWShift = ((iNode % altSize) + windShift) % altSize;
                    // const _ = pos + altSize * iAlt;
                    // const _ = nodeWShift + altSize * iAlt;

                    // console.log(node.edges[iEdge]);

                    nodeWShift = windShift % altSize;

                    // console.log(iEdge, node.edges[iEdge]);
                    // console.log(node.edges[iEdge] + nodeWShift);
                    // console.log(altSize + edgeiAlt * altSize);

                    const tooBig = iNode + nodeWShift >= (iAlt + 1) * altSize;
                    const tooSmall = iNode + nodeWShift < iAlt * altSize;

                    if (tooBig) {
                        nodeWShift -= altSize;
                    }
                    if (tooSmall) {
                        nodeWShift += altSize;
                    }

                    // console.log((iAlt + 1) * altSize);

                    node.edges[iEdge] += nodeWShift;

                    // node.edges[iEdge] +=
                    // (node.edges[iEdge] + nodeWShift) % altSize;

                    // node.edges[iEdge] += altSize * iAlt;
                }
                // console.log(nodeWShift);
            }

            network[iLayer][iNode] = node;
        }
    }

    return network;
}
