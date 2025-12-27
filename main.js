// --- CONFIGURATION ---
let scene, camera, renderer, controls;
const objects = []; 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const textureLoader = new THREE.TextureLoader();

// --- INITIALIZATION ---
function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    
    // Load Galaxy Background
    const bgTexture = textureLoader.load('/static/assets/2k_stars_milky_way.jpg');
    scene.background = bgTexture;

    // 2. Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 70); 

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); 
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); 
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 400); 
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 5. Create the Sun (With Texture)
    const sunGeo = new THREE.SphereGeometry(12, 64, 64);
    const sunTex = textureLoader.load('/static/assets/2k_sun.jpg');
    // Using BasicMaterial so the sun glows (unaffected by shadows)
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex }); 
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.name = "sun";
    scene.add(sun);
    objects.push(sun);

    // --- PLANET FACTORY ---
    function createPlanet(size, textureName, distance, name) {
        const geometry = new THREE.SphereGeometry(size, 64, 64);
        const texture = textureLoader.load(`/static/assets/${textureName}`);
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.7
        });
        
        const planet = new THREE.Mesh(geometry, material);
        
        const pivot = new THREE.Object3D();
        pivot.add(planet);
        scene.add(pivot);
        
        planet.position.x = distance;
        planet.name = name;
        objects.push(planet);

        // Orbit Line
        const pathGeo = new THREE.RingGeometry(distance - 0.2, distance + 0.2, 128);
        const pathMat = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, side: THREE.DoubleSide, opacity: 0.05, transparent: true 
        });
        const path = new THREE.Mesh(pathGeo, pathMat);
        path.rotation.x = Math.PI / 2;
        scene.add(path);

        return { mesh: planet, pivot: pivot, speed: 0.002 + Math.random() * 0.01 };
    }

    // 6. Spawn Planets
    const mercury = createPlanet(2.5, '2k_mercury.jpg', 25, "mercury");
    const venus   = createPlanet(3.5, '2k_venus_surface.jpg', 40, "venus");
    const earth   = createPlanet(4,   '2k_earth_daymap.jpg', 60, "earth");
    const mars    = createPlanet(3,   '2k_mars.jpg', 80, "mars");

    window.planets = [mercury, venus, earth, mars];

    // 7. Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;

    // 8. Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    renderer.domElement.addEventListener('pointerdown', onDocumentMouseDown, false);
    
    // Hide Loader
    document.getElementById('loader').style.display = 'none';
}

// --- INTERACTION ---
function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        fetchPlanetData(intersects[0].object.name);
    }
}

// --- API FETCH ---
async function fetchPlanetData(planetName) {
    try {
        const response = await fetch(`/api/info/${planetName}`);
        const data = await response.json();
        document.getElementById('info-title').innerText = data.title;
        document.getElementById('info-fact').innerText = data.fact;
        document.getElementById('info-activity').innerText = data.activity;
        document.getElementById('info-panel').classList.remove('hidden');
    } catch (err) { console.error(err); }
}

function closePanel() { document.getElementById('info-panel').classList.add('hidden'); }
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    const sun = scene.getObjectByName('sun');
    if(sun) sun.rotation.y += 0.001;
    window.planets.forEach(p => {
        p.pivot.rotation.y += p.speed;
        p.mesh.rotation.y += 0.005;
    });
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();
window.closePanel = closePanel;