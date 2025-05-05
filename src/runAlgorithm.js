import { bfs } from "./algorithms/bfs.js";
import { dfs } from "./algorithms/dfs.js";
import { astar } from "./algorithms/astar.js";
import { maze, robotRef } from "./labyrinthGen/labyrinthGen.js";
import { simulatePath } from "./animator.js";

// Llama al algoritmo seleccionado cuando se haga click en “Iniciar”
document.getElementById("startBtn").addEventListener("click", getSelectedAlgorithm);

async function getSelectedAlgorithm() {
    const algorithmSelect = document.getElementById("algorithmSelect");
    const selectedAlgorithm = algorithmSelect.value;
    let solution = null;
    console.log("Selected algorithm:", selectedAlgorithm);

    // Ejecutar el algoritmo correspondiente
    switch (selectedAlgorithm) {
        case "bfs":
            solution = bfs(maze.grid, maze.start, maze.end);
            break;
        case "dfs":
            solution = dfs(maze.grid, maze.start, maze.end);
            break;
        case "astar":
            solution = astar(maze.grid, maze.start, maze.end);
            break;
        default:
            console.error("Algoritmo no reconocido");
            return;
    }

    console.log("Solution:", solution);

    if (solution && solution.length) {
        try {
            await simulatePath(robotRef, solution);
        } catch (err) {
            console.error("Error al simular la ruta:", err);
        }
    } else {
        alert("No se encontró ruta con el algoritmo seleccionado.");
    }
}

export { getSelectedAlgorithm };
