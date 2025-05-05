export function astar(maze, start, end) {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start, end));

    while (openSet.length > 0) {
        // Get the node in openSet with the lowest fScore
        openSet.sort((a, b) => fScore.get(a.toString()) - fScore.get(b.toString()));
        const current = openSet.shift();

        if (current[0] === end[0] && current[1] === end[1]) {
            return reconstructPath(cameFrom, start, end);
        }

        for (const neighbor of getNeighbors(current, maze)) {
            const tentativeGScore = gScore.get(current.toString()) + 1;

            if (tentativeGScore < (gScore.get(neighbor.toString()) || Infinity)) {
                cameFrom.set(neighbor.toString(), current);
                gScore.set(neighbor.toString(), tentativeGScore);
                fScore.set(neighbor.toString(), tentativeGScore + heuristic(neighbor, end));

                if (!openSet.some(node => node.toString() === neighbor.toString())) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return null; // No path found
}

function heuristic(node, goal) {
    // Manhattan distance heuristic
    return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
}

function getNeighbors(node, maze) {
    const [x, y] = node;
    const neighbors = [];

    if (y > 0 && maze[y - 1][x] === 0) neighbors.push([x, y - 1]);
    if (y < maze.length - 1 && maze[y + 1][x] === 0) neighbors.push([x, y + 1]);
    if (x > 0 && maze[y][x - 1] === 0) neighbors.push([x - 1, y]);
    if (x < maze[0].length - 1 && maze[y][x + 1] === 0) neighbors.push([x + 1, y]);

    return neighbors;
}

function reconstructPath(cameFrom, start, end) {
    const path = [];
    let current = end;

    while (current.toString() !== start.toString()) {
        const currentKey = Array.isArray(current) ? current.toString() : current;
        path.unshift(currentKey.split(',').map(Number));
        current = cameFrom.get(currentKey);
    }
    path.unshift(start);
    return path;
}