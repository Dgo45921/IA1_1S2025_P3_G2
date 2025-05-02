import { bfs } from "./algorithms/bfs.js";
import { dfs } from "./algorithms/dfs.js";
import { astar } from "./algorithms/astar.js";
import { maze } from './labyrinthGen/labyrinthGen.js';


// get the selected algorithm from the dropdown 
window.getSelectedAlgorithm = getSelectedAlgorithm;


function getSelectedAlgorithm() {
    const algorithmSelect = document.getElementById("algorithmSelect");
    const selectedAlgorithm = algorithmSelect.value;
    let solution = null;

    // Call the corresponding algorithm function
    switch (selectedAlgorithm) {
        case "bfs":
            solution = bfs(maze.grid, maze.start, maze.end)
            break;
        case "dfs":
            solution = dfs(maze.grid, maze.start, maze.end)
            break;
        case "astar":
            solution = astar(maze.grid, maze.start, maze.end)
            break;
        default:
            console.error("Algoritmo no reconocido");
    }
    // Handle the solution (e.g., display it, visualize it, etc.)
    console.log("Solution:", solution);
}

