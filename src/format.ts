export function formatContent(content: number[]): string {
    const str = content.toString().replace(/,/g, "\n") + "\n";
    return str;
}
