import { loadMaze } from './labyrinthGen/labyrinthGen.js';
import { maze } from './labyrinthGen/labyrinthGen.js';


const jsonInput = document.getElementById("jsonInput");

jsonInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      // call for loadMaze
      loadMaze(json);
      console.log("Maze object:", maze);

    } catch (err) {
      console.error("Error al parsear el archivo JSON:", err);
    }
  };

  reader.readAsText(file);
});
