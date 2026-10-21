import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './PortfolioPage.css';

interface Project {
  num: string;
  title: string;
  desc: string;
  date: string;
  url: string;
  category: 'fullstack' | 'ai' | 'systems' | 'frontend';
}

const projectsList: Project[] = [
  {
    num: 'PROJ-01',
    title: 'TheCustomNest - Crochet E-Commerce Storefront',
    desc: 'Built a crochet e-commerce storefront using React, TypeScript, Vite, Tailwind CSS, and Framer Motion, with a login-gated cart and wishlist, a role-protected admin dashboard, and order tracking.',
    date: 'SEPT 2026 – OCT 2026',
    url: 'https://www.thecustomnest.shop/',
    category: 'frontend'
  },
  {
    num: 'PROJ-02',
    title: 'EduSphere - AI-Powered Student Lifecycle Management Ecosystem',
    desc: 'Currently developing a modular AI/ML-driven student lifecycle platform unifying academic learning, coding assessments, and placement readiness, with an ML engine for performance prediction, risk detection, and personalized recommendations, plus an AI assistant for summarization and study planning.',
    date: 'JUL 2026 – SEPT 2026',
    url: 'https://github.com/Kabil-8',
    category: 'ai'
  },
  {
    num: 'PROJ-03',
    title: 'TalentAI ATS - Enterprise AI-Powered Applicant Tracking System',
    desc: 'Architected a modular, enterprise-ready ATS with a Docker-orchestrated stack (MongoDB, Node.js/Express, Python FastAPI AI microservice, React 19), automating recruitment workflows and cutting recruiter workload by over 80%.',
    date: 'JUN – JUL 2026',
    url: 'https://github.com/Kabil-8',
    category: 'ai'
  },
  {
    num: 'PROJ-04',
    title: 'EmoLearn - AI Powered Emotion based learning system',
    desc: 'An AI-powered emotion-based learning platform using the MERN stack, FastAPI, OpenCV, and DeepFace, enabling real-time emotion detection and adaptive content personalization with secure JWT authentication and live analytics.',
    date: 'MAR – MAY 2026',
    url: 'https://github.com/Kabil-8/EmoLearn---Averexis',
    category: 'ai'
  },
  {
    num: 'PROJ-05',
    title: 'SpendWise AI',
    desc: 'An AI-powered startup spend audit platform using Next.js 15, TypeScript, Tailwind CSS, Zustand, and Anthropic Claude, delivering personalized cost-saving recommendations, lead capture, and shareable audit reports.',
    date: 'MAY – JUN 2026',
    url: 'https://github.com/Kabil-8/SpendWise-AI',
    category: 'ai'
  },
  {
    num: 'PROJ-06',
    title: 'RealTime Collaborative Workspace',
    desc: 'Developed a MERN-based real-time collaborative workspace application featuring secure JWT authentication, role-based access control, workspace and Kanban board management, invitation-based collaboration with RESTful APIs.',
    date: 'JUN – JUL 2026',
    url: 'https://github.com/Kabil-8/Real-Time-Collaborative-Workspace',
    category: 'fullstack'
  },
  {
    num: 'PROJ-07',
    title: 'HireFlow - Resume Shortlisting Platform',
    desc: 'Designed and implemented a Resume Shortlisting Platform to streamline candidate screening, automate resume filtering, facilitate interview scheduling, and provide comprehensive admin controls.',
    date: 'AUG – SEPT 2025',
    url: 'https://github.com/Kabil-8/Resume-Tracker---Frontend',
    category: 'fullstack'
  },
  {
    num: 'PROJ-08',
    title: 'LivePresence - HR Management System',
    desc: 'An HR solution to manage employee attendance, leave, payroll, and profiles. Centralizes workforce data for easier monitoring and reporting.',
    date: 'JUN – AUG 2025',
    url: 'https://github.com/Kabil-8/Gen-AI-HRMS-Frontend',
    category: 'systems'
  }
];

export const PortfolioPage: React.FC = () => {
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridScanCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const fnumsRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Filter tabs state
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'ai' | 'systems' | 'frontend'>('all');

  // Typing carousel state
  const [typedText, setTypedText] = useState<string>('Full Stack Developer');

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formErrors, setFormErrors] = useState({ name: false, email: false, msg: false });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse Coordinates for Custom Cursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // 1. TYPING CAROUSEL
  useEffect(() => {
    const words = [
      'AI/ML Full Stack Developer',
      'Computer Vision & LLM Integrator',
      'Backend Engineer & System Designer',
      'REST API & Microservice Architect',
      'MERN & FastAPI Specialist'
    ];
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wi];
      if (!deleting) {
        ci++;
        setTypedText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1400);
          return;
        }
        timer = setTimeout(tick, 60);
      } else {
        ci--;
        setTypedText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 28);
      }
    }

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  // 2. SCROLL PROGRESS & MOUSE LISTENER
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 3. FLOATING NUMBERS BACKGROUND GENERATION
  useEffect(() => {
    const container = fnumsRef.current;
    if (!container) return;

    container.innerHTML = '';
    const chars = '01アイウエオカキクケコサシスセソ';
    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.className = 'pf-fn';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.animationDuration = `${8 + Math.random() * 12}s`;
      el.style.animationDelay = `-${Math.random() * 12}s`;
      el.textContent = chars[Math.floor(Math.random() * chars.length)];

      const interval = setInterval(() => {
        el.textContent = chars[Math.floor(Math.random() * chars.length)];
      }, 300 + Math.random() * 400);

      container.appendChild(el);
      elements.push(el);

      // Clean up interval when unmounted
      el.dataset.intervalId = interval.toString();
    }

    return () => {
      elements.forEach((el) => {
        if (el.dataset.intervalId) clearInterval(parseInt(el.dataset.intervalId, 10));
      });
      container.innerHTML = '';
    };
  }, []);

  // 4. GRIDSCAN CANVAS BACKGROUND
  useEffect(() => {
    const canvas = gridScanCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const cfg = {
      linesColor: 'rgba(212,175,106,0.16)',
      scanColor: 'rgba(47,224,196,0.55)',
      gridScale: 46,
      scanWidth: 140,
      scanGlow: 22,
      scanDuration: 4200,
      lineJitter: 0.4
    };

    const start = performance.now();

    const frame = (t: number) => {
      animId = requestAnimationFrame(frame);
      const elapsed = t - start;
      ctx.clearRect(0, 0, w, h);

      // Grid lines with subtle jitter
      ctx.strokeStyle = cfg.linesColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= w; x += cfg.gridScale) {
        const jitter = Math.sin(x + elapsed * 0.02) * cfg.lineJitter;
        ctx.beginPath();
        ctx.moveTo(x + jitter, 0);
        ctx.lineTo(x + jitter, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += cfg.gridScale) {
        const jitter = Math.cos(y + elapsed * 0.02) * cfg.lineJitter;
        ctx.beginPath();
        ctx.moveTo(0, y + jitter);
        ctx.lineTo(w, y + jitter);
        ctx.stroke();
      }

      // Pingpong scan line (vertical sweep)
      const phase = (elapsed % (cfg.scanDuration * 2)) / cfg.scanDuration;
      const p = phase <= 1 ? phase : 2 - phase;
      const scanX = p * (w + cfg.scanWidth) - cfg.scanWidth / 2;

      const grad = ctx.createLinearGradient(scanX - cfg.scanWidth, 0, scanX + cfg.scanWidth, 0);
      grad.addColorStop(0, 'rgba(47,224,196,0)');
      grad.addColorStop(0.5, cfg.scanColor);
      grad.addColorStop(1, 'rgba(47,224,196,0)');

      ctx.save();
      ctx.shadowColor = 'rgba(47,224,196,0.8)';
      ctx.shadowBlur = cfg.scanGlow;
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - cfg.scanWidth, 0, cfg.scanWidth * 2, h);
      ctx.restore();
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 5. THREE.JS 3D PARTICLES & MORPHING CANVAS
  useEffect(() => {
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 12);

    // Nebula Particles
    const pCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const colors = [
      [0.83, 0.69, 0.42], // Gold
      [0.18, 0.88, 0.77], // Cyan
      [0.69, 0.55, 0.31], // Accent
      [0.92, 0.94, 0.97]  // White
    ];

    for (let i = 0; i < pCount; i++) {
      const r = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
      const c = colors[Math.floor(Math.random() * colors.length)];
      pCol[i * 3] = c[0];
      pCol[i * 3 + 1] = c[1];
      pCol[i * 3 + 2] = c[2];
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Inner Ring
    const rCount = 1800;
    const rGeo = new THREE.BufferGeometry();
    const rPos = new Float32Array(rCount * 3);
    for (let i = 0; i < rCount; i++) {
      const angle = (i / rCount) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 1.5;
      const r = 5 + spread;
      rPos[i * 3] = r * Math.cos(angle);
      rPos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      rPos[i * 3 + 2] = r * Math.sin(angle);
    }
    rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
    const rMat = new THREE.PointsMaterial({ size: 0.025, color: 0xD4AF6A, transparent: true, opacity: 0.5 });
    const ring = new THREE.Points(rGeo, rMat);
    scene.add(ring);

    // Central Morphing Geometry
    const morphGeos = [
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.TetrahedronGeometry(2.8, 0)
    ];

    const mainMat = new THREE.MeshPhongMaterial({
      color: 0x0d0d25,
      wireframe: true,
      emissive: 0xD4AF6A,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.7
    });
    const mainMesh = new THREE.Mesh(morphGeos[0], mainMat);
    scene.add(mainMesh);

    // Outer Shell
    const shellGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x2FE0C4,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shell);

    // Floating Polyhedra
    function createFloater(geo: THREE.BufferGeometry, x: number, y: number, z: number, color: number, op = 0.25) {
      const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: op });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    }

    const floaters = [
      createFloater(new THREE.OctahedronGeometry(0.6), -7, 3, -4, 0xD4AF6A, 0.35),
      createFloater(new THREE.TetrahedronGeometry(0.8), 8, -2, -5, 0x2FE0C4, 0.28),
      createFloater(new THREE.IcosahedronGeometry(0.5, 0), -6, -4, -3, 0xB08D50, 0.3),
      createFloater(new THREE.OctahedronGeometry(0.4), 6, 4, -6, 0x2FE0C4, 0.28)
    ];

    // Torus Rings
    function createTorus(r: number, t: number, color: number, rx = 0, ry = 0) {
      const geo = new THREE.TorusGeometry(r, t, 8, 60);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rx;
      mesh.rotation.y = ry;
      scene.add(mesh);
      return mesh;
    }

    const torus1 = createTorus(4.5, 0.015, 0xD4AF6A, Math.PI / 2, 0);
    const torus2 = createTorus(6, 0.01, 0x2FE0C4, 0.4, 0.8);
    const torus3 = createTorus(7.5, 0.008, 0xB08D50, 0.2, 1.2);

    // Lights
    const ambLight = new THREE.AmbientLight(0x1a1840, 2);
    scene.add(ambLight);

    const ptLight1 = new THREE.PointLight(0xD4AF6A, 2.5, 30);
    ptLight1.position.set(5, 5, 5);
    scene.add(ptLight1);

    const ptLight2 = new THREE.PointLight(0x2FE0C4, 1.8, 25);
    ptLight2.position.set(-5, -3, 3);
    scene.add(ptLight2);

    // Mouse Tracking for 3D Camera Follow
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const onDocMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onDocMouseMove);

    // Animation Loop
    let animId: number;
    let time = 0;
    let morphPhase = 0;
    let morphIdx = 0;

    function getMorphedPositions(geoA: THREE.BufferGeometry, geoB: THREE.BufferGeometry, t: number) {
      const posA = geoA.attributes.position.array as Float32Array;
      const posB = geoB.attributes.position.array as Float32Array;
      const result = new Float32Array(Math.min(posA.length, posB.length));
      for (let i = 0; i < result.length; i++) {
        result[i] = posA[i] * (1 - t) + posB[i % posB.length] * t;
      }
      return result;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.005;

      // Smooth camera lerp
      tx += (mx * 0.8 - tx) * 0.04;
      ty += (my * 0.5 - ty) * 0.04;
      camera.position.x = tx;
      camera.position.y = ty;
      camera.lookAt(scene.position);

      // Rotations
      mainMesh.rotation.x += 0.004;
      mainMesh.rotation.y += 0.006;
      mainMesh.rotation.z += 0.002;

      shell.rotation.x -= 0.002;
      shell.rotation.y -= 0.003;

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      ring.rotation.y += 0.004;

      torus1.rotation.x += 0.003;
      torus2.rotation.y += 0.004;
      torus3.rotation.z += 0.002;

      floaters.forEach((f, i) => {
        f.rotation.x += 0.005 + i * 0.003;
        f.rotation.y += 0.007 + i * 0.002;
        f.position.y += Math.sin(time + i * 1.3) * 0.005;
      });

      // Point light pulsing
      ptLight1.intensity = 1.5 + Math.sin(time * 1.3) * 0.5;
      ptLight2.intensity = 1.2 + Math.cos(time * 0.9) * 0.4;

      // Main mesh scaling breath
      const s = 1 + Math.sin(time * 0.7) * 0.04;
      mainMesh.scale.set(s, s, s);

      // Morphing geometry
      morphPhase += 0.005;
      if (morphPhase > Math.PI) {
        morphPhase = 0;
        morphIdx = (morphIdx + 1) % morphGeos.length;
      }
      const t = (Math.sin(morphPhase) + 1) / 2;
      const nextIdx = (morphIdx + 1) % morphGeos.length;
      const newPos = getMorphedPositions(morphGeos[morphIdx], morphGeos[nextIdx], t);
      const mainPos = mainMesh.geometry.attributes.position.array as Float32Array;
      mainPos.set(newPos.slice(0, mainPos.length));
      mainMesh.geometry.attributes.position.needsUpdate = true;
      mainMesh.geometry.computeVertexNormals();

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onDocMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // 6. 3D HERO CARD TILT
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardWrap = e.currentTarget;
    const card = heroCardRef.current;
    if (!card) return;

    const rect = cardWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 15}deg) translateZ(20px)`;
  };

  const handleCardMouseLeave = () => {
    if (heroCardRef.current) {
      heroCardRef.current.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    }
  };

  // 7. CONTACT FORM SUBMIT HANDLER
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameOk = formName.trim().length > 1;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim());
    const msgOk = formMsg.trim().length >= 10;

    setFormErrors({ name: !nameOk, email: !emailOk, msg: !msgOk });

    if (!nameOk || !emailOk || !msgOk) {
      setFormStatus('Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Opening your email client...');

    const subject = encodeURIComponent(`Portfolio contact from ${formName.trim()}`);
    const body = encodeURIComponent(`${formMsg.trim()}\n\n— ${formName.trim()} (${formEmail.trim()})`);

    setTimeout(() => {
      window.location.href = `mailto:kabilk2023@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setFormStatus('Message ready in your email app. Looking forward to connecting!');
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 600);
  };

  const filteredProjects = projectsList.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <div
      ref={rootRef}
      className={`pf-root ${isHovering ? 'pf-hov' : ''}`}
      onMouseEnter={() => setIsHovering(false)}
    >
      {/* Dynamic Cursor Elements */}
      <div
        className="pf-cursor-1"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className="pf-cursor-2"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className="pf-cursor-3"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Top Scroll Progress Bar */}
      <div className="pf-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Cyberpunk Scanlines & Floating Numerals Background */}
      <div className="pf-scanlines" />
      <div className="pf-float-nums" ref={fnumsRef} />

      {/* Background Three.js 3D WebGL Canvas */}
      <canvas ref={threeCanvasRef} className="pf-canvas" />

      {/* Sub Navigation Strip Docked Under Main Navbar */}
      <nav className="pf-nav" aria-label="Founder Profile Navigation">
        <div className="flex items-center gap-3">
          <span className="pf-nav-logo">
            <span>KABIL</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-widest hidden sm:inline-block">
            AI/ML FULL STACK DEVELOPER
          </span>
        </div>

        <ul className="pf-nav-links">
          <li>
            <a href="#education" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Education
            </a>
          </li>
          <li>
            <a href="#skills" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Arsenal
            </a>
          </li>
          <li>
            <a href="#projects" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Journey
            </a>
          </li>
          <li>
            <a href="#certifications" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Credentials
            </a>
          </li>
          <li>
            <a href="#leadership" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Leadership
            </a>
          </li>
          <li>
            <a href="#contact" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Contact
            </a>
          </li>
        </ul>

        <div className="pf-nav-dot">
          <span className="pf-live" />
          <span>AVAILABLE TO WORK</span>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="pf-hero" id="home">
        <div className="pf-gridscan-wrap">
          <canvas ref={gridScanCanvasRef} />
        </div>

        <div className="pf-hero-inner">
          <div>
            <div className="pf-h-chip">AI/ML Full Stack Developer · Systems &amp; Applied AI</div>
            <h1 className="pf-h-name">
              <span className="pf-grd">Kabil</span>
            </h1>
            <p className="pf-h-type">
              <span>{typedText}</span>
              <span className="pf-ty-cursor" />
            </p>
            <p className="pf-h-desc">
              Versatile Full Stack Developer with hands-on experience building AI/ML-powered web applications, integrating computer vision, predictive models, and LLM-driven features into production-grade systems. Seeking an AI/ML Full Stack Developer role to build intelligent, scalable products that combine strong system design with applied machine learning.
            </p>

            {/* Area of Interest */}
            <div className="my-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                Areas of Interest
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Full Stack Web Development',
                  'Backend Development',
                  'Scalable System Design',
                  'REST API Development',
                  'Machine Learning & AI Integration'
                ].map((interest, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#0A1024] border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
                  >
                    • {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Contact Info Strip */}
            <div className="flex flex-wrap items-center gap-4 py-2 text-xs font-mono text-slate-300">
              <a href="mailto:kabilk2023@gmail.com" className="hover:text-amber-300 transition-colors">
                ✉ kabilk2023@gmail.com
              </a>
              <span className="text-slate-600">|</span>
              <a href="tel:+918667452487" className="hover:text-amber-300 transition-colors">
                ☎ +91 86674 52487
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://linkedin.com/in/k-kabil-091233325/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                in linkedin.com/in/k-kabil
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://github.com/kabil-8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                ⌥ github.com/kabil-8
              </a>
            </div>

            <div className="pf-h-btns pt-2">
              <a
                href="#projects"
                className="pf-btn-glow"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                View 8 Projects
              </a>
              <a
                href="#contact"
                className="pf-btn-outline2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Get in Touch
              </a>
              <a
                href="mailto:kabilk2023@gmail.com?subject=Resume%20Inquiry%20-%20Kabil"
                className="pf-btn-resume"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span>⬇</span> Request Resume
              </a>
            </div>
          </div>

          {/* Interactive 3D Hero Card */}
          <div
            className="pf-hero-card-wrap"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="pf-hero-card" ref={heroCardRef}>
              <div className="pf-card-scan" />
              <div className="pf-orb-wrap">
                <div className="pf-orb-core" />
                <div className="pf-orb-ring1" />
                <div className="pf-orb-ring2" />
                <div className="pf-orb-particle" style={{ top: '50%', left: '50%', margin: '-2px' }} />
              </div>

              <div className="pf-card-avatar">
                <div className="pf-avatar-ph">KABIL</div>
                <div className="pf-avatar-ring" />
                <div className="pf-avatar-ring2" />
              </div>

              <div className="pf-card-name">KABIL</div>
              <div className="pf-card-title">AI/ML Full Stack Engineer</div>

              <div className="pf-card-stats">
                <div className="pf-cs">
                  <div className="pf-cs-n">08</div>
                  <div className="pf-cs-l">Projects</div>
                </div>
                <div className="pf-cs">
                  <div className="pf-cs-n">03</div>
                  <div className="pf-cs-l">Internships</div>
                </div>
                <div className="pf-cs">
                  <div className="pf-cs-n">8.49</div>
                  <div className="pf-cs-l">CGPA</div>
                </div>
              </div>

              <div className="pf-card-tags">
                <span className="pf-ctag">Java</span>
                <span className="pf-ctag">Python</span>
                <span className="pf-ctag">React.js</span>
                <span className="pf-ctag">FastAPI</span>
                <span className="pf-ctag">Node.js</span>
                <span className="pf-ctag">OpenCV</span>
                <span className="pf-ctag">MongoDB</span>
                <span className="pf-ctag">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION SECTION ═══ */}
      <section className="pf-panel" id="education">
        <div className="pf-slabel">01 — Foundation</div>
        <h2 className="pf-stitle">
          Academic <span className="pf-accent">Education</span>
        </h2>

        <div className="pf-edu-grid">
          {/* Engineering */}
          <div
            className="pf-edu-card"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="pf-edu-period">EXPECTED GRADUATION: MAY 2027</div>
            <div className="pf-edu-degree">Bachelor of Engineering in Computer Science</div>
            <div className="pf-edu-school">Dr. Mahalingam College of Engineering and Technology, Pollachi</div>
            <div className="pf-edu-score">
              <span>CGPA:</span>
              <b className="text-white">8.49</b>
            </div>
          </div>

          {/* HSC */}
          <div
            className="pf-edu-card"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="pf-edu-period">COMPLETED: MARCH 2023</div>
            <div className="pf-edu-degree">Higher School Certificate – CBSE</div>
            <div className="pf-edu-school">Honey Bunch School, Pollachi</div>
            <div className="pf-edu-score">
              <span>Percentage:</span>
              <b className="text-white">72.6%</b>
            </div>
          </div>

          {/* SSLC */}
          <div
            className="pf-edu-card"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="pf-edu-period">COMPLETED: MARCH 2021</div>
            <div className="pf-edu-degree">Secondary School Leaving Certificate – CBSE</div>
            <div className="pf-edu-school">Honey Bunch School, Pollachi</div>
            <div className="pf-edu-score">
              <span>Percentage:</span>
              <b className="text-white">90.0%</b>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ARSENAL ═══ */}
      <section className="pf-panel" id="skills">
        <div className="pf-slabel">02 — Arsenal</div>
        <h2 className="pf-stitle">
          Technical <span className="pf-accent">Skills</span>
        </h2>

        <div className="pf-skills-hex">
          {[
            { icon: '☕', name: 'Java' },
            { icon: '🐍', name: 'Python' },
            { icon: '⚡', name: 'C / C++' },
            { icon: '🌐', name: 'HTML/CSS' },
            { icon: '📜', name: 'JavaScript' },
            { icon: '⚛️', name: 'React.js' },
            { icon: '🟢', name: 'Node.js' },
            { icon: '🚂', name: 'Express.js' },
            { icon: '⚡', name: 'FastAPI' },
            { icon: '👁️', name: 'OpenCV' },
            { icon: '🍃', name: 'MongoDB' },
            { icon: '🗄️', name: 'MySQL' },
            { icon: '⚡', name: 'Redis' },
            { icon: '🐳', name: 'Docker' },
            { icon: '🔀', name: 'Git' },
            { icon: '📮', name: 'Postman' }
          ].map((skill, idx) => (
            <div
              key={idx}
              className="pf-skill-hex"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-hex-bg">
                <div className="pf-hex-glow" />
                <div className="pf-hex-icon">{skill.icon}</div>
                <div className="pf-hex-name">{skill.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Categorized Skills Breakdown Grid */}
        <div className="pf-skill-cats">
          {/* Programming Languages */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>☕</span> Programming Languages
            </div>
            <div className="pf-scat-pills">
              {['Java', 'Python', 'C', 'C++'].map((s, i) => (
                <span key={i} className="pf-spill accent">{s}</span>
              ))}
            </div>
          </div>

          {/* AI/ML & Computer Vision */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>🤖</span> AI/ML &amp; Computer Vision
            </div>
            <div className="pf-scat-pills">
              {[
                'OpenCV',
                'DeepFace',
                'scikit-learn',
                'Random Forest',
                'CNN',
                'Pandas',
                'NumPy',
                'LLM API Integration'
              ].map((s, i) => (
                <span key={i} className="pf-spill accent">{s}</span>
              ))}
            </div>
          </div>

          {/* Frameworks & Runtime */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>⚛️</span> Frameworks &amp; Runtime
            </div>
            <div className="pf-scat-pills">
              {['React.js', 'Node.js', 'Express.js', 'FastAPI', 'HTML', 'CSS', 'JavaScript'].map((s, i) => (
                <span key={i} className="pf-spill">{s}</span>
              ))}
            </div>
          </div>

          {/* Database Management */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>🗄️</span> Database Management
            </div>
            <div className="pf-scat-pills">
              {['MySQL', 'MongoDB', 'Redis'].map((s, i) => (
                <span key={i} className="pf-spill">{s}</span>
              ))}
            </div>
          </div>

          {/* Tools & DevOps */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>🛠️</span> Tools &amp; Technologies
            </div>
            <div className="pf-scat-pills">
              {['Postman', 'Docker', 'Git', 'RESTful APIs'].map((s, i) => (
                <span key={i} className="pf-spill">{s}</span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="pf-skill-cat">
            <div className="pf-scat-title">
              <span>🧠</span> Soft Skills
            </div>
            <div className="pf-scat-pills">
              {[
                'Strong Communication',
                'Problem-Solving',
                'Analytical and Critical Thinking'
              ].map((s, i) => (
                <span key={i} className="pf-spill accent">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Proficiency Bars */}
        <div className="pf-prof-wrap">
          {[
            { label: 'AI/ML & Computer Vision Integration', level: 93 },
            { label: 'Full Stack Web Development (MERN + FastAPI)', level: 95 },
            { label: 'Backend Development & REST APIs', level: 92 },
            { label: 'Scalable System Design', level: 88 },
            { label: 'Database Architecture (MongoDB, MySQL, Redis)', level: 90 },
            { label: 'Docker Containerization & Tooling', level: 86 }
          ].map((bar, idx) => (
            <div key={idx} className="pf-prof-row">
              <div className="pf-prof-head">
                <b>{bar.label}</b>
                <span>{bar.level}%</span>
              </div>
              <div className="pf-prof-track">
                <div className="pf-prof-fill" style={{ width: `${bar.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="pf-panel" id="projects">
        <div className="pf-slabel">03 — Work</div>
        <h2 className="pf-stitle">
          Selected <span className="pf-accent">Projects</span>
        </h2>

        {/* Filter Tabs */}
        <div className="pf-filter-tabs">
          {[
            { key: 'all', label: 'All' },
            { key: 'fullstack', label: 'Full-Stack' },
            { key: 'ai', label: 'AI / ML' },
            { key: 'systems', label: 'Systems' },
            { key: 'frontend', label: 'Frontend' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`pf-ftab ${activeFilter === tab.key ? 'pf-active' : ''}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="pf-proj-grid">
          {filteredProjects.map((p, idx) => (
            <div
              key={idx}
              className="pf-pcard"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-p-corner" />
              <div className="pf-pnum">{p.num}</div>
              <div className="pf-ptitle">{p.title}</div>
              <p className="pf-pdesc">{p.desc}</p>
              <div className="pf-pdate">{p.date}</div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-parr"
                aria-label={`View ${p.title} repository`}
              >
                View project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ EXPERIENCE JOURNEY ═══ */}
      <section className="pf-panel" id="experience">
        <div className="pf-slabel">04 — Experience</div>
        <h2 className="pf-stitle">
          Professional <span className="pf-accent">Journey</span>
        </h2>

        <div className="pf-exp-grid">
          {/* Averexis Solutions */}
          <div className="pf-ecard" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-e-period">FEB 2026 – MAY 2026</div>
            <div>
              <div className="pf-e-company">Averexis Solutions</div>
              <div className="pf-e-role">Full Stack Developer Intern</div>
              <p className="pf-e-desc">
                Built responsive full-stack web applications with designing RESTful APIs, implementing secure authentication, performing CRUD operations, and optimizing relational database schema for performance and scalability.
              </p>
            </div>
            <div className="pf-e-badge pf-active">COMPLETED</div>
          </div>

          {/* Genhub Innovations */}
          <div className="pf-ecard" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-e-period">JUN 2025 – SEPT 2025</div>
            <div>
              <div className="pf-e-company">Genhub Innovations</div>
              <div className="pf-e-role">Software Developer Intern</div>
              <p className="pf-e-desc">
                Contributed to the development of 5 scalable web solutions and built 10+ RESTful APIs, enhancing application performance and user experience, resulting in a 30% reduction in load times.
              </p>
            </div>
            <div className="pf-e-badge pf-active">COMPLETED</div>
          </div>

          {/* DataConquest */}
          <div className="pf-ecard" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-e-period">INTERNSHIP</div>
            <div>
              <div className="pf-e-company">DataConquest</div>
              <div className="pf-e-role">Data Analyst Intern</div>
              <p className="pf-e-desc">
                Collected, cleaned, and analyzed datasets to identify trends, and prepared reports and visualizations for real-world projects. Collaborated with team members within professional workflows and business requirements, strengthening technical, analytical, communication, and teamwork skills.
              </p>
            </div>
            <div className="pf-e-badge pf-active">COMPLETED</div>
          </div>
        </div>
      </section>

      {/* ═══ CREDENTIALS & CERTIFICATIONS ═══ */}
      <section className="pf-panel" id="certifications">
        <div className="pf-slabel">05 — Credentials</div>
        <h2 className="pf-stitle">
          Verified <span className="pf-accent">Certifications</span>
        </h2>

        <div className="pf-cert-grid">
          {[
            {
              num: '01',
              name: 'Environment & Development, Environmental Impact Assessment, and Psychology of Learning',
              by: 'NPTEL'
            },
            {
              num: '02',
              name: 'Cyber Security Fundamentals Certification',
              by: 'Cisco Networking Academy'
            },
            {
              num: '03',
              name: 'Introductory Level MongoDB Credential',
              by: 'MongoDB University'
            },
            {
              num: '04',
              name: 'Certified in C, C++, and Python & Oracle Certification in Java',
              by: 'Kalvi Institute & Oracle'
            },
            {
              num: '05',
              name: 'Completed 8 Hindi Exams',
              by: 'DBHPS (Dakshina Bharat Hindi Prachar Sabha)'
            }
          ].map((cert, idx) => (
            <div
              key={idx}
              className="pf-cert"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-cert-num">{cert.num}</div>
              <div className="pf-cert-name">{cert.name}</div>
              <div className="pf-cert-by">{cert.by}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LEADERSHIP, ACHIEVEMENTS & ACTIVITIES ═══ */}
      <section className="pf-panel" id="leadership">
        <div className="pf-slabel">06 — Impact &amp; Community</div>
        <h2 className="pf-stitle">
          Leadership &amp; <span className="pf-accent">Achievements</span>
        </h2>

        <div className="pf-lead-grid">
          {/* President - DigiFlash */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">President</div>
            <div className="pf-lead-org">CSE Association “DigiFlash”</div>
            <p className="pf-lead-desc">
              Leading the association by setting strategic goals, overseeing department activities, and driving extracurricular engagement across computer science students.
            </p>
          </div>

          {/* Vice President - DigiFlash */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">Vice President</div>
            <div className="pf-lead-org">CSE Association “DigiFlash”</div>
            <p className="pf-lead-desc">
              Led student initiatives, coordinated technical and cultural committees, and represented the student association in faculty alignment meetings.
            </p>
          </div>

          {/* Event Coordinator */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">Event Coordinator</div>
            <div className="pf-lead-org">CSE Association “DigiFlash”</div>
            <p className="pf-lead-desc">
              Planned and executed departmental symposiums and technical events while managing volunteers, venue logistics, technical registrations, and judging criteria.
            </p>
          </div>

          {/* Placement Coordinator */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">Placement Coordinator</div>
            <div className="pf-lead-org">Department of Computer Science &amp; Engineering</div>
            <p className="pf-lead-desc">
              Liaised between students and enterprise recruiters, organized campus placement drives, and managed technical interview schedules.
            </p>
          </div>

          {/* Industrial Visit Coordinator */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">Industrial Visit (IV) Coordinator</div>
            <div className="pf-lead-org">Academic &amp; Corporate Relations</div>
            <p className="pf-lead-desc">
              Organized enterprise company visits by coordinating executive approvals, student travel logistics, and technical interaction sessions.
            </p>
          </div>

          {/* Team Leadership & Achievements */}
          <div className="pf-lead-card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="pf-lead-role">Key Achievements &amp; Projects Lead</div>
            <div className="pf-lead-org">Technical Symposiums &amp; Systems</div>
            <p className="pf-lead-desc">
              Organized multiple symposiums and technical events as Vice President and Event Coordinator over 2 years. Led multiple engineering projects as a Team Lead, managing team coordination and ensuring on-schedule delivery.
            </p>
          </div>
        </div>

        {/* Languages and Hobbies Quick Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px] w-full mt-6 text-left">
          <div className="p-5 rounded-xl bg-[#0E1420] border border-[var(--pf-gborder)]">
            <span className="font-['Orbitron'] text-xs uppercase tracking-wider text-amber-400 block mb-2">
              🌐 Languages Known
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-cyan-300">Tamil</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-cyan-300">English</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-cyan-300">Hindi [Read &amp; Write]</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0E1420] border border-[var(--pf-gborder)]">
            <span className="font-['Orbitron'] text-xs uppercase tracking-wider text-amber-400 block mb-2">
              🏏 Hobbies &amp; Interests
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-amber-300">Playing Cricket</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800 text-amber-300">Fitness &amp; Outdoor Activities</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT SECTION ═══ */}
      <section className="pf-panel" id="contact">
        <div className="pf-contact-inner">
          <div>
            <div className="pf-slabel">07 — Connect</div>
            <h2 className="pf-contact-big">
              Let's<br />
              <span className="pf-glitch">Build</span>
              Together.
            </h2>
            <p className="pf-contact-note">
              Open to AI/ML Full Stack Developer roles, scalable system design, and technical collaborations. Founder &amp; CEO at Alpha Encoders. Based in Pollachi, Tamil Nadu.
            </p>

            <form className="pf-cform" onSubmit={handleContactSubmit} noValidate>
              <div className={`pf-cf-field ${formErrors.name ? 'pf-error' : ''}`}>
                <input
                  type="text"
                  id="cfName"
                  placeholder=" "
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (formErrors.name) setFormErrors({ ...formErrors, name: false });
                  }}
                  autoComplete="name"
                />
                <label htmlFor="cfName">Your Name</label>
                <div className="pf-cf-msg">Please enter your name.</div>
              </div>

              <div className={`pf-cf-field ${formErrors.email ? 'pf-error' : ''}`}>
                <input
                  type="email"
                  id="cfEmail"
                  placeholder=" "
                  value={formEmail}
                  onChange={(e) => {
                    setFormEmail(e.target.value);
                    if (formErrors.email) setFormErrors({ ...formErrors, email: false });
                  }}
                  autoComplete="email"
                />
                <label htmlFor="cfEmail">Your Email</label>
                <div className="pf-cf-msg">Please enter a valid email address.</div>
              </div>

              <div className={`pf-cf-field ${formErrors.msg ? 'pf-error' : ''}`}>
                <textarea
                  id="cfMsg"
                  placeholder=" "
                  value={formMsg}
                  onChange={(e) => {
                    setFormMsg(e.target.value);
                    if (formErrors.msg) setFormErrors({ ...formErrors, msg: false });
                  }}
                />
                <label htmlFor="cfMsg">Message</label>
                <div className="pf-cf-msg">Message should be at least 10 characters.</div>
              </div>

              <button
                type="submit"
                className="pf-cf-submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isSubmitting ? 'Transmitting...' : 'Send Direct Message'}
              </button>

              {formStatus && <div className="pf-cf-status">{formStatus}</div>}
            </form>
          </div>

          <div className="pf-clinks">
            <a
              href="mailto:kabilk2023@gmail.com"
              className="pf-clink"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-cl-icon">✉</div>
              <div>
                <div className="pf-cl-label">Email</div>
                <div className="pf-cl-val">kabilk2023@gmail.com</div>
              </div>
              <div className="pf-cl-arr">↗</div>
            </a>

            <a
              href="tel:+918667452487"
              className="pf-clink"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-cl-icon">☎</div>
              <div>
                <div className="pf-cl-label">Phone</div>
                <div className="pf-cl-val">+91 86674 52487</div>
              </div>
              <div className="pf-cl-arr">↗</div>
            </a>

            <a
              href="https://linkedin.com/in/k-kabil-091233325/"
              target="_blank"
              rel="noopener noreferrer"
              className="pf-clink"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-cl-icon">in</div>
              <div>
                <div className="pf-cl-label">LinkedIn</div>
                <div className="pf-cl-val">linkedin.com/in/k-kabil</div>
              </div>
              <div className="pf-cl-arr">↗</div>
            </a>

            <a
              href="https://github.com/kabil-8"
              target="_blank"
              rel="noopener noreferrer"
              className="pf-clink"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="pf-cl-icon">⌥</div>
              <div>
                <div className="pf-cl-label">GitHub</div>
                <div className="pf-cl-val">github.com/kabil-8</div>
              </div>
              <div className="pf-cl-arr">↗</div>
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Signature */}
      <div className="pf-footer">
        <p>© 2026 KABIL — AI/ML Full Stack Developer · Founder &amp; CEO of Alpha Encoders · Available to Work</p>
        <p>Pollachi, Tamil Nadu · India</p>
      </div>
    </div>
  );
};

export default PortfolioPage;
