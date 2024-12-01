import { extractContent } from "./extract.ts";

export default function main() {
    const fileAsString = Deno.readTextFileSync("./src/input/a_example.in");

    const fileContent = extractContent(fileAsString);

    console.log(fileContent);
}
