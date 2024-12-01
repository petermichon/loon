import { parse } from "./parser.ts";

export default function main() {
    const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

    const fileContent = parse(fileAsString);

    console.log(fileContent);
}
