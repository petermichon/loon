import dijkstrajs from "dijkstrajs";

type Node = { coverage: number; edges: number[] };
type Layer = Node[];

export function pathfind(network: Layer[]): number[] {
    let path = [];
    {
        const layerSize = network[0].length;
        const networkSize = network.length * layerSize;

        const startNode = "START";
        const endNode = "END";

        const graph: { [key: string]: { [key: string]: number } } = {};

        graph[startNode] = { 0: 0 };

        for (let iLayer = 0; iLayer < network.length; iLayer++) {
            const layer = network[iLayer];

            for (let iNode = 0; iNode < layer.length; iNode++) {
                const node = iNode + iLayer * layer.length;
                graph[node] = {};

                for (const edge of layer[iNode].edges) {
                    const weight = 0 - network[iLayer][edge].coverage;
                    graph[node][edge + (iLayer + 1) * layer.length] = weight;
                }
            }
        }

        // Create a last layer to connect to the end node
        for (let node = networkSize; node < networkSize + layerSize; node++) {
            graph[node] = {};
            graph[node][endNode] = 0;
        }

        // Add end node
        graph[endNode] = {};

        // console.log(graph);

        path = dijkstrajs.find_path(graph, startNode, endNode);
    }
    // console.log(path);

    const altitudesAdjustments: number[] = [];
    // console.log(network);

    {
        const pathAltitudes = [];
        for (let i = 1; i < path.length - 1; i++) {
            const layerSize = network[0].length;
            const altitudeSize = 15; // R * C

            const altitude = path[i] % layerSize;

            // 3 = altitudeSize
            const pathAlt = Math.floor(altitude / altitudeSize);

            // console.log(network[4][11].edges);

            pathAltitudes.push(pathAlt);
        }
        // console.log(pathAltitudes);

        for (let i = 0; i < pathAltitudes.length - 1; i++) {
            const shift = pathAltitudes[i + 1] - pathAltitudes[i];
            altitudesAdjustments.push(shift);
        }
    }

    return altitudesAdjustments;
}
