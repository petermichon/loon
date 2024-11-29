const _input = {
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
};
