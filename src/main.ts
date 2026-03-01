import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000,
);
camera.position.set(0, 0, 5);
// camera.lookAt(0, 0, 0);
// let's add a ball
const geometry = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial({
  // wireframe: true,
  color: 0xccff,
  flatShading: true,
});
const circle = new THREE.Mesh(geometry, material);
const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
wireMesh.scale.setScalar(1.001);

circle.add(wireMesh);
scene.add(circle);
// scene.add(wireMesh);

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222);
scene.add(hemiLight);

new OrbitControls(camera, renderer.domElement);
// controls.addEventListener("change", () => {
//   renderer.render(scene, camera);
// });

function animate(t = 0) {
  requestAnimationFrame(animate);
  circle.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
}
animate();
// renderer.render(scene, camera);
