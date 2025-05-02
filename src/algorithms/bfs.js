
export function bfs(maze, start, end) {
    const queue = [start];
    const visited = new Set();
    const parent = new Map();

    visited.add(start.toString());

    while (queue.length > 0) {
        const current = queue.shift();

        if (current[0] === end[0] && current[1] === end[1]) {
            return reconstructPath(parent, start, end);
        }

        for (const neighbor of getNeighbors(current, maze)) {
            if (!visited.has(neighbor.toString())) {
                visited.add(neighbor.toString());
                queue.push(neighbor);
                parent.set(neighbor.toString(), current);
            }
        }
    }

    return null; 
}

function getNeighbors(node, maze) {
    const [x, y] = node;
    const neighbors = [];

    if (x > 0 && maze[x - 1][y] === 0) neighbors.push([x - 1, y]);
    if (x < maze.length - 1 && maze[x + 1][y] === 0) neighbors.push([x + 1, y]);
    if (y > 0 && maze[x][y - 1] === 0) neighbors.push([x, y - 1]);
    if (y < maze[0].length - 1 && maze[x][y + 1] === 0) neighbors.push([x, y + 1]);

    return neighbors;
}
function reconstructPath(parent, start, end) {
    const path = [];
    let current = end;

    while (current) {
        path.unshift(current);
        current = parent.get(current.toString());
    }

    return path;
}