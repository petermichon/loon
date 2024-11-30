type FileContent = {
    grid: { rows: number; columns: number; altitudes: number };
    elements: {
        targets: number;
        radius: number;
        balloons: number;
        turns: number;
    };
    start: { row: number; column: number };
    targets: { row: number; column: number }[];
    winds: { row: number; column: number }[][][];
};

export function parse(str: string): FileContent {
    const fileContent: FileContent = {
        grid: { rows: 0, columns: 0, altitudes: 0 },
        elements: { targets: 0, radius: 0, balloons: 0, turns: 0 },
        start: { row: 0, column: 0 },
        targets: [],
        winds: [],
    };

    const data = str.split("\n").map((line) => line.split(" "));

    // Grid 0
    fileContent.grid.rows = Number(data[0][0]);
    fileContent.grid.columns = Number(data[0][1]);
    fileContent.grid.altitudes = Number(data[0][2]);

    // Elements 1
    fileContent.elements.targets = Number(data[1][0]);
    fileContent.elements.radius = Number(data[1][1]);
    fileContent.elements.balloons = Number(data[1][2]);
    fileContent.elements.turns = Number(data[1][3]);

    // Start 2
    fileContent.start.row = Number(data[2][0]);
    fileContent.start.column = Number(data[2][1]);

    // Targets 3..4
    const nbTargets = fileContent.elements.targets;
    for (let i = 0; i < nbTargets; i++) {
        fileContent.targets.push({
            row: Number(data[3 + i][0]),
            column: Number(data[3 + i][1]),
        });
    }

    // Winds 5..5+altitudes
    const nbAltitudes = fileContent.grid.altitudes;
    const nbColumns = fileContent.grid.columns;
    const nbRows = fileContent.grid.rows;
    for (let iA = 0; iA < nbAltitudes; iA++) {
        fileContent.winds.push([]);
        for (let iR = 0; iR < nbRows; iR++) {
            fileContent.winds[iA].push([]);
            for (let iC = 0; iC < nbColumns * 2; iC += 2) {
                fileContent.winds[iA][iR].push({
                    row: Number(data[5 + iA * nbRows + iR][iC]),
                    column: Number(data[5 + iA * nbRows + iR][iC + 1]),
                });
            }
        }
    }

    return fileContent;
}
