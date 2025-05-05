import { setScene } from "./labyrinthGen/labyrinthGen.js";
import { getSelectedAlgorithm } from "./runAlgorithm.js";

const loader = new THREE.GLTFLoader(); 
let robot; 

const gh_url = 'https://dgo45921.github.io/IA1_1S2025_P3_G2/assets/model/scene.gltf';
const local_url = '../assets/model/scene.gltf';

const modelUrl = location.hostname === 'localhost' ? local_url : gh_url;

loader.load(modelUrl, function (gltf) {
  robot = gltf.scene;
  robot.userData.type = "robot";
  scene.add(robot);

  setScene(scene, robot); 
});

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
  camera.position.set(centerX, maxDim * 1.2, centerY + 0.001);
  camera.lookAt(centerX, 0, centerY);
}

animate();

// Listener de inicio tras DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", getSelectedAlgorithm);
});
