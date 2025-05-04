
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

    if (y > 0 && maze[y - 1][x] === 0) neighbors.push([x, y - 1]);
    if (y < maze.length - 1 && maze[y + 1][x] === 0) neighbors.push([x, y + 1]);
    if (x > 0 && maze[y][x - 1] === 0) neighbors.push([x - 1, y]);
    if (x < maze[0].length - 1 && maze[y][x + 1] === 0) neighbors.push([x + 1, y]);

    return neighbors;
}


function reconstructPath(parent, start, end) {
    const path = [];
    let current = end;
  
    while (current.toString() !== start.toString()) {
      const currentKey = Array.isArray(current) ? current.toString() : current;
      path.unshift(currentKey.split(',').map(Number));
      current = parent.get(currentKey);
    }
    path.unshift(start);
    return path;
  }
  