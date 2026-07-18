import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000005);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 10, 18);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const eartex = textureLoader.load(
  "./textures/earth.jpg");
const suntex = textureLoader.load(
  "./textures/sun.jpg"
);
const rintex = textureLoader.load(
  "./textures/ring.png"
);
const ambientLight = new THREE.AmbientLight(
  0x404060,
  0.8
);

scene.add(ambientLight);

const sunLight = new THREE.PointLight(
  0xffffff,
  300,
  100
);

sunLight.position.set(0, 0, 0);

scene.add(sunLight);


const sunGeometry =
  new THREE.SphereGeometry(
    2,
    64,
    64
  );

const sunMaterial = new THREE.MeshStandardMaterial({
  map: suntex,

  emissive: new THREE.Color(0xff6600),
  emissiveMap: suntex,
  emissiveIntensity: 4.5,

  roughness: 1
});

const sun =
  new THREE.Mesh(
    sunGeometry,
    sunMaterial
  );

scene.add(sun);

const sunGlowGeometry =
  new THREE.SphereGeometry(
    2.3,
    64,
    64
  );

const sunGlowMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.25,
    side: THREE.BackSide
  });

const sunGlow =
  new THREE.Mesh(
    sunGlowGeometry,
    sunGlowMaterial
  );

scene.add(sunGlow);

const geoearth =
  new THREE.SphereGeometry(
    0.8,
    64,
    64
  );

const mat1a =
  new THREE.MeshStandardMaterial({
    map: eartex,
    roughness: 0.7
  });

const earth =
  new THREE.Mesh(
    geoearth,
    mat1a
  );

scene.add(earth);
const atmosphereGeometry =
  new THREE.SphereGeometry(
    0.86,
    64,
    64
  );

const atmosphereMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  });

const atmosphere =
  new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
  );

scene.add(atmosphere);

const moonGeometry =
  new THREE.SphereGeometry(
    0.25,
    32,
    32
  );

const moonMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 1
  });

const moon =
  new THREE.Mesh(
    moonGeometry,
    moonMaterial
  );

scene.add(moon);

const marsGeometry =
  new THREE.SphereGeometry(
    0.6,
    64,
    64
  );

const marsMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xc1440e,
    roughness: 0.8
  });

const mars =
  new THREE.Mesh(
    marsGeometry,
    marsMaterial
  );

scene.add(mars);

const saturnGeometry =
  new THREE.SphereGeometry(
    1.1,
    64,
    64
  );

const saturnMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xd8c28f,
    roughness: 0.8
  });

const saturn =
  new THREE.Mesh(
    saturnGeometry,
    saturnMaterial
  );

scene.add(saturn);

const ringGeometry =
  new THREE.RingGeometry(
    1.4,
    2.2,
    64
  );

const ringMaterial =
  new THREE.MeshStandardMaterial({
    map: rintex,
    side: THREE.DoubleSide,
    transparent: true,
  });

const saturnRing =
  new THREE.Mesh(
    ringGeometry,
    ringMaterial
  );

saturnRing.rotation.x =
  Math.PI / 2.3;

scene.add(saturnRing);


function createOrbit(radius) {

  const points = [];

  for (let i = 0; i <= 128; i++) {

    const angle =
      (i / 128) *
      Math.PI *
      2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    );

  }

  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints(points);

  const material =
    new THREE.LineBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.4
    });

  const orbit =
    new THREE.Line(
      geometry,
      material
    );

  scene.add(orbit);

}

createOrbit(5);
createOrbit(8);
createOrbit(12);

const starGeometry =
  new THREE.BufferGeometry();

const starPositions = [];

for (let i = 0; i < 5000; i++) {

  const radius =
    100 +
    Math.random() * 400;

  const theta =
    Math.random() *
    Math.PI *
    2;

  const phi =
    Math.acos(
      2 * Math.random() - 1
    );

  const x =
    radius *
    Math.sin(phi) *
    Math.cos(theta);

  const y =
    radius *
    Math.sin(phi) *
    Math.sin(theta);

  const z =
    radius *
    Math.cos(phi);

  starPositions.push(
    x,
    y,
    z
  );

}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(
    starPositions,
    3
  )
);

const starMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.6
  });

const stars =
  new THREE.Points(
    starGeometry,
    starMaterial
  );

scene.add(stars);


let earthAngle = 0;
let moonAngle = 0;
let marsAngle = 1.5;
let saturnAngle = 3;

const earthDistance = 5;
const marsDistance = 8;
const saturnDistance = 12;

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
  "mousemove",
  (event) => {

    mouseX =
      (event.clientX /
        window.innerWidth -
        5.2);

    mouseY =
      (event.clientY /
        window.innerHeight -
        5.2);

  }
);


window.addEventListener(
  "wheel",
  (event) => {

    camera.position.z +=
      event.deltaY * 0.01;

    camera.position.z =
      Math.max(
        8,
        Math.min(
          35,
          camera.position.z
        )
      );

  }
);


function animate() {

  requestAnimationFrame(
    animate
  );


  sun.rotation.y +=
    0.002;

  earthAngle +=
    0.005;

  earth.position.set(

    Math.cos(
      earthAngle
    ) * earthDistance,

    0,

    Math.sin(
      earthAngle
    ) * earthDistance

  );

  earth.rotation.y +=
    0.01;


  atmosphere.position.copy(
    earth.position
  );


  moonAngle +=
    0.02;

  moon.position.set(

    earth.position.x +
    Math.cos(
      moonAngle
    ) * 1.3,

    0,

    earth.position.z +
    Math.sin(
      moonAngle
    ) * 1.3

  );

  marsAngle +=
    0.003;

  mars.position.set(

    Math.cos(
      marsAngle
    ) * marsDistance,

    0,

    Math.sin(
      marsAngle
    ) * marsDistance

  );

  mars.rotation.y +=
    0.008;


  saturnAngle +=
    0.0015;

  saturn.position.set(

    Math.cos(
      saturnAngle
    ) * saturnDistance,

    0,

    Math.sin(
      saturnAngle
    ) * saturnDistance

  );

  saturn.rotation.y +=
    0.004;


  saturnRing.position.copy(
    saturn.position
  );


  camera.position.x +=
    (
      mouseX * 5 -
      camera.position.x
    ) * 0.01;

  camera.position.y +=
    (
      10 -
      mouseY * 4 -
      camera.position.y
    ) * 0.01;

  camera.lookAt(
    0,
    0,
    0
  );


  renderer.render(
    scene,
    camera
  );

}

animate();

 
window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);