// ── UNIVERSE BACKGROUND ──
(function() {
    const canvas = document.getElementById('universe');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 600 : 1400;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        pos[i*3]   = (Math.random() - 0.5) * 32;
        pos[i*3+1] = (Math.random() - 0.5) * 32;
        pos[i*3+2] = (Math.random() - 0.5) * 32;
        const b = Math.random() < 0.6 ? 1 : 0.7;
        col[i*3] = b; col[i*3+1] = b; col[i*3+2] = b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.048, vertexColors: true,
        transparent: true, opacity: 1,
        blending: THREE.AdditiveBlending
    });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth) - 0.5;
        my = -(e.clientY / window.innerHeight) + 0.5;
    });

    (function animate() {
        requestAnimationFrame(animate);
        stars.rotation.y += 0.0003 + mx * 0.008;
        stars.rotation.x += 0.0002 + my * 0.008;
        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// ── MOBILE NAV ──
(function() {
    const toggle = document.getElementById('mobileToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });
})();

// ── SCROLL TO TOP ──
(function() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── ACTIVE NAV LINK ──
(function() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();