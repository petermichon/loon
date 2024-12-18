import { extractContent } from "./extract.ts";
import { generateNetwork } from "./network.ts";
import { pathfind } from "./pathfind.ts";
import { formatContent } from "./format.ts";

export default function main() {
    const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

    const fileContent = extractContent(fileAsString);
    // console.log(fileContent);

    const network = generateNetwork(fileContent);
    // console.log(network);

    const altitudes = pathfind(network);
    // console.log(altitudes);

    const outputContent = formatContent(altitudes);
    // console.log(outputContent);

    Deno.writeTextFileSync("./src/output/a_example.out", outputContent);
}
