// Estructura del laberinto
export let maze = {
    grid: [],
    start: null,
    end: null
};

// Referencias externas
let sceneRef = null;
export let robotRef = null;


export function setScene(scene, robot) {
    sceneRef = scene;
    robotRef = robot;
}

// Limpia paredes, inicio y fin de la escena
function clearScene() {
    if (!sceneRef) return;
    for (let i = sceneRef.children.length - 1; i >= 0; i--) {
        const obj = sceneRef.children[i];
        if (["wall", "start", "end"].includes(obj.userData.type)) {
            sceneRef.remove(obj);
        }
    }
}


export function loadMaze(json) {
    if (!sceneRef) {
        console.error("Escena no seteada");
        return;
    }

    clearScene();

    const { ancho, alto, inicio, fin, paredes } = json;

    // Crear la grilla base: filas = alto, columnas = ancho
    maze.grid = Array.from({ length: alto }, () => Array(ancho).fill(0));
    maze.start = inicio;
    maze.end = fin;

    // Marcar paredes como 1
    paredes.forEach(([x, y]) => {
        if (y < alto && x < ancho) maze.grid[y][x] = 1;
    });

    // Materiales
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const startMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const endMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // Dibujar paredes
    for (let y = 0; y < alto; y++) {
        for (let x = 0; x < ancho; x++) {
            if (maze.grid[y][x] === 1) {
                const wall = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), wallMaterial);
                wall.position.set(x, 0.5, y);
                wall.userData.type = "wall";
                sceneRef.add(wall);
            }
        }
    }

    // Dibujar punto de inicio
    const start = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), startMaterial);
    start.position.set(inicio[0], 0.5, inicio[1]);
    start.userData.type = "start";
    sceneRef.add(start);

    // Dibujar punto de fin
    const end = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), endMaterial);
    end.position.set(fin[0], 0.5, fin[1]);
    end.userData.type = "end";
    sceneRef.add(end);
}
