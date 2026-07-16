import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffaa00 })
);

scene.add(sun);

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("./textures/earth.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ map: earthTexture })
);

earth.position.x = 4;
scene.add(earth);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
);

moon.position.x = 5;
scene.add(moon);

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.002;
  earth.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});