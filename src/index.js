import { setScene } from "./labyrinthGen/labyrinthGen.js";
import { getSelectedAlgorithm } from "./runAlgorithm.js";

// === Inicialización de la escena Three.js ===
const container = document.getElementById("render-container");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// === Luz básica ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// === Plano base (suelo) ===
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// === Cubo de prueba ===
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0.5;
scene.add(cube);

// === Añadir robot ===
const robotMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const robot = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
  robotMaterial
);
robot.userData.type = "robot";
scene.add(robot);



// === Render Loop ===
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);           
  renderer.render(scene, camera);
}

export function adjustCamera(ancho, alto) {
  const centerX = (ancho - 1) / 2;
  const centerY = (alto - 1) / 2;

  const maxDim = Math.max(ancho, alto);
  camera.position.set(centerX, maxDim * 1.2, centerY + 0.001); // +0.001 evita dividir entre 0
  camera.lookAt(centerX, 0, centerY);
}


animate();

// Inyectamos la escena y el robot a otros módulos si lo necesitas
setScene(scene, robot); 

// Listener de inicio tras DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", getSelectedAlgorithm);
});