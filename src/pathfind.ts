type Node = { weight: number; edges: number[] };
type Layer = Node[];

export function pathfind(network: Layer[]): number[] {
    let altitudes: number[] = [];

    const path: number[] = [];

    for (const layer of network) {
        let bestNodes: Node[] = [];
        let bestWeight = 0;

        // Find the best nodes
        for (const node of layer) {
            if (node.weight == bestWeight) {
                bestNodes.push(node);
            }
            if (node.weight > bestWeight) {
                bestWeight = node.weight;
                bestNodes = [];
                bestNodes.push(node);
            }
        }
        console.log(bestNodes);

        // Check if
        // for (const bestEdge of bestNodes) {
        //     console.log(bestEdge);
        // }

        path.push();
    }

    altitudes = path;

    return altitudes;
}
