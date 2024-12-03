// import { extractContent } from "./extract.ts";
import { generateNetwork } from "./network.ts";
// import { formatContent } from "./format.ts";

export default function main() {
    // const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

    // const fileContent = extractContent(fileAsString);

    // console.log(fileContent);

    const fileContent = {
        grid: { rows: 2, columns: 3, altitudes: 3 },
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
                [{ r: 1, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 0 }],
                [{ r: 1, c: 0 }, { r: 1, c: 0 }, { r: 1, c: 0 }],
            ],
            // Altitude 3 winds
            [
                [{ r: 1, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 1 }],
                [{ r: 1, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 1 }],
            ],
        ],
    };

    const network = generateNetwork(fileContent);

    console.log(network);

    // const altitudeAdjustments = [1, 1, 1, 0, 0];

    // const outputContent = formatContent(altitudeAdjustments);

    // Deno.writeTextFileSync("./src/output/a_example.out", outputContent);
}
