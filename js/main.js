// Poem stanzas
const poemStanzas = [
  "they say being in a relationship is difficult\nand in some senses, it’s true\nbut loving you came easy.",
  "because loving you was\nsweet, patient, and kind.",
  "loving you came naturally\nlearning to love you was challenging\ngetting to know you was exciting\nand being a part of your life was a dream.",
  "we didn’t always have happy moments\nbut in the end\nwe continued to choose to love each other\nthrough the thick and thin.",
  "however, sometimes loving you was painful\nloving you came with flaws\nfalse promises, miscommunication\nand playing pretend.",
  "slowly it started to get harder\nloving you started to hurt more\nand the biggest grief is letting you go\nespecially knowing that my heart is yours."
];

// Elements
const symbols = document.querySelectorAll('.symbol');
const stanzaDisplay = document.querySelector('.stanza-display');
const stanzaText = document.querySelector('.stanza-text');
const closeButton = document.querySelector('.close-button');
const backgroundMusic = document.getElementById('background-music');

// Show stanza on symbol click
symbols.forEach((symbol, index) => {
  symbol.addEventListener('click', () => {
    stanzaText.textContent = poemStanzas[index];
    stanzaDisplay.classList.remove('hidden');
    stanzaDisplay.style.display = 'block';
  });
});

// Close button functionality
closeButton.addEventListener('click', () => {
  stanzaDisplay.classList.add('hidden');
  stanzaDisplay.style.display = 'none';
});

// Play background music and handle autoplay block
backgroundMusic.loop = true;  // Set to loop the music
backgroundMusic.play().catch(() => {
  // If autoplay fails, show a play button
  const playButton = document.createElement('button');
  playButton.textContent = 'Play Music';
  playButton.style.position = 'absolute';
  playButton.style.top = '20px';
  playButton.style.left = '20px';
  playButton.style.zIndex = '1000';
  playButton.style.padding = '10px 20px';
  playButton.style.background = '#444';
  playButton.style.color = '#fff';
  playButton.style.border = 'none';
  playButton.style.cursor = 'pointer';

  document.body.appendChild(playButton);

  playButton.addEventListener('click', () => {
    backgroundMusic.play();
    document.body.removeChild(playButton);
  });
});

// Three.js background with particle effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = [];
const colors = [];
const color = new THREE.Color(0x4a6c7c); // Dark blue-grey color for grief theme

for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 2000);
  positions.push((Math.random() - 0.5) * 2000);
  positions.push((Math.random() - 0.5) * 2000);

  colors.push(color.r, color.g, color.b);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({ size: 3, vertexColors: true, transparent: true });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Camera position
camera.position.z = 500;

// Animate particles
function animate() {
  requestAnimationFrame(animate);
  
  particleSystem.rotation.x += 0.001;
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
