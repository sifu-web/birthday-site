/* =========================================================
   Happy Birthday — Kaniz Fatema Mowmita
   Vanilla JS — no frameworks
   ========================================================= */

/* ---------- 1. VERIFICATION PAGE (original logic, untouched) ---------- */
const verifyBtn = document.getElementById('verify-btn');
const loadingBox = document.getElementById('loading-box');
const verifyResult = document.getElementById('verify-result');

verifyBtn.addEventListener('click', function () {
  verifyBtn.style.display = 'none';
  loadingBox.style.display = 'flex';

  // 4 second por Verified status dekhabe
  setTimeout(function () {
    loadingBox.style.display = 'none';
    verifyResult.style.display = 'block';

    // ---- NEW: after verification succeeds, hand off to the birthday site ----
    setTimeout(startCinematicTransition, 1300);
  }, 4000);
});

/* ---------- 2. CINEMATIC TRANSITION: verify -> loader -> birthday site ---------- */
function startCinematicTransition() {
  const verifyScreen = document.getElementById('verify-screen');
  const loader = document.getElementById('cinematic-loader');

  verifyScreen.classList.add('fade-out');

  setTimeout(() => {
    verifyScreen.classList.add('hidden');
    loader.classList.remove('hidden');
    buildLoaderSparkles();

    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.classList.add('hidden');
        revealBirthdaySite();
      }, 700);
    }, 2600);
  }, 650);
}

function buildLoaderSparkles() {
  const wrap = document.getElementById('loader-sparkles');
  if (!wrap || wrap.childElementCount) return;
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('span');
    const angle = Math.random() * 360;
    const radius = 70 + Math.random() * 50;
    const x = 130 + radius * Math.cos(angle * Math.PI / 180);
    const y = 130 + radius * Math.sin(angle * Math.PI / 180);
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.animationDelay = (Math.random() * 2) + 's';
    wrap.appendChild(s);
  }
}

function revealBirthdaySite() {
  const site = document.getElementById('birthday-site');
  site.classList.remove('hidden');
  site.classList.add('fade-in');
  initBirthdaySite();
}

/* ---------- 3. BIRTHDAY SITE INIT (runs once, after reveal) ---------- */
let siteInitialised = false;

function initBirthdaySite() {
  if (siteInitialised) return;
  siteInitialised = true;

  buildStars();
  buildFireflies();
  buildBalloons();
  setupScrollReveal();
  startTypingMessage();
  startCountdown();
  buildCandles();
  setupBlowButton();
  buildGallery();
  setupEnvelope();
  setupMusicToggle();
  setupCanvases();
}

/* ---------- Ambient background: stars & fireflies ---------- */
function buildStars() {
  const wrap = document.getElementById('bg-stars');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 3) + 's';
    s.style.opacity = (0.3 + Math.random() * 0.6).toFixed(2);
    frag.appendChild(s);
  }
  wrap.appendChild(frag);
}

function buildFireflies() {
  const wrap = document.getElementById('bg-fireflies');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = 50 + Math.random() * 45 + '%';
    s.style.animationDelay = (Math.random() * 8) + 's';
    s.style.animationDuration = (7 + Math.random() * 5) + 's';
    frag.appendChild(s);
  }
  wrap.appendChild(frag);
}

/* ---------- Floating balloons in hero ---------- */
function buildBalloons() {
  const wrap = document.getElementById('hero-balloons');
  const frag = document.createDocumentFragment();
  const colors = ['#ff5d8f', '#ffb703', '#7ee8fa', '#b98cf2', '#ff9fc0'];
  for (let i = 0; i < 9; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (5 + i * 10.5) + '%';
    b.style.background = `radial-gradient(circle at 35% 30%, #fff8, ${colors[i % colors.length]})`;
    b.style.animationDuration = (10 + Math.random() * 8) + 's';
    b.style.animationDelay = (Math.random() * 6) + 's';
    frag.appendChild(b);
  }
  wrap.appendChild(frag);
}

/* ---------- Scroll reveal ---------- */
function setupScrollReveal() {
  const targets = document.querySelectorAll('.reveal-on-scroll');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => io.observe(t));
}

/* ---------- Typing welcome message ---------- */
function startTypingMessage() {
  const el = document.getElementById('typing-message');
  const message =
`Dear Apu,

Happy 19th Birthday!

May every moment of your life be filled with happiness, peace, success and endless blessings.

We sincerely pray that Allah grants you a long, healthy, joyful and beautiful life.

May every dream you have come true.
May your future be bright and successful.

Stay happy. Stay healthy. Stay blessed.

Happy Birthday once again.

With lots of prayers and respect,
Your Family ❤️`;

  // rAF-driven typing, throttled by elapsed time instead of setTimeout,
  // so it stays in sync with the browser's paint cycle and doesn't
  // stack up timers (this was the main cause of the stutter/glitch
  // while the message was appearing).
  const msPerChar = 22;
  let i = 0;
  let start = null;

  function frame(ts) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const target = Math.min(message.length, Math.floor(elapsed / msPerChar));
    if (target > i) {
      i = target;
      el.textContent = message.slice(0, i);
    }
    if (i < message.length) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- Countdown & live age ---------- */
function startCountdown() {
  const birthMonth = 8, birthDay = 16; // 16 August
  const timerEl = document.getElementById('countdown-timer');

  function nextBirthday() {
    const now = new Date();
    let next = new Date(now.getFullYear(), birthMonth - 1, birthDay, 0, 0, 0);
    if (next < now) next = new Date(now.getFullYear() + 1, birthMonth - 1, birthDay, 0, 0, 0);
    return next;
  }

  function tick() {
    const now = new Date();
    const diff = nextBirthday() - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    timerEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Cake candles ---------- */
const CANDLE_COUNT = 19;

function buildCandles() {
  const row = document.getElementById('candles-row');
  const colors = ['#ff5d8f', '#7ee8fa', '#ffb703', '#b98cf2'];
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.background = colors[i % colors.length];
    const flame = document.createElement('div');
    flame.className = 'flame';
    c.appendChild(flame);
    row.appendChild(c);
  }
}

function setupBlowButton() {
  const btn = document.getElementById('blow-btn');
  const wishText = document.getElementById('wish-text');
  let blown = false;

  btn.addEventListener('click', () => {
    if (blown) return;
    blown = true;

    document.querySelectorAll('.candle').forEach((c, idx) => {
      setTimeout(() => c.classList.add('out'), idx * 60);
    });

    setTimeout(() => {
      wishText.classList.remove('hidden');
      launchConfettiBurst();
      launchFireworks();
      playMusic();
    }, CANDLE_COUNT * 60 + 200);

    btn.style.opacity = '.6';
    btn.style.pointerEvents = 'none';
  });
}

/* ---------- Photo gallery ---------- */
function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  const photos = [
    'assets/images/photo1.jpg',
    'assets/images/photo2.jpg',
    'assets/images/photo3.jpg',
    'assets/images/photo4.jpg',
    'assets/images/photo5.jpg',
    'assets/images/photo6.jpg',
    'assets/images/photo7.jpg',
    'assets/images/photo8.jpg',
    'assets/images/photo9.jpg',
    'assets/images/photo10.jpg',
    'assets/images/photo11.jpg',
    'assets/images/photo12.jpg',
    'assets/images/photo13.jpg',
    'assets/images/photo14.jpg'
  ];
  const frag = document.createDocumentFragment();
  photos.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Memory photo ' + (i + 1);
    img.decoding = 'async';
    img.width = 600;
    img.height = 600;
    card.appendChild(img);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

/* ---------- Envelope / memory letter ---------- */
function setupEnvelope() {
  const envelope = document.getElementById('envelope');
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
  });
}

/* ---------- Music toggle ---------- */
function setupMusicToggle() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  btn.addEventListener('click', () => {
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      btn.classList.remove('playing');
    }
  });
}

function playMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  audio.play().then(() => btn.classList.add('playing')).catch(() => {
    /* autoplay blocked until user interacts — fine, button still works */
  });
}

/* ---------- Confetti & Fireworks canvases ---------- */
let confettiCtx, fireworkCtx, confettiCanvas, fireworkCanvas;
let confettiParticles = [];
let fireworkParticles = [];

function setupCanvases() {
  confettiCanvas = document.getElementById('confetti-canvas');
  fireworkCanvas = document.getElementById('firework-canvas');
  confettiCtx = confettiCanvas.getContext('2d');
  fireworkCtx = fireworkCanvas.getContext('2d');
  resizeCanvases();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvases, 150);
  }, { passive: true });
  requestAnimationFrame(animateCanvases);
}

function resizeCanvases() {
  [confettiCanvas, fireworkCanvas].forEach(c => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
}

function launchConfettiBurst() {
  const colors = ['#ffb703', '#ff5d8f', '#7ee8fa', '#b98cf2', '#3ddc97'];
  for (let i = 0; i < 90; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -10 - 4,
      size: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 10,
      life: 0
    });
  }
}

function launchFireworks() {
  const colors = ['#ffb703', '#ff5d8f', '#7ee8fa', '#b98cf2', '#3ddc97', '#ffffff'];
  let bursts = 0;
  const interval = setInterval(() => {
    const cx = window.innerWidth * (0.2 + Math.random() * 0.6);
    const cy = window.innerHeight * (0.2 + Math.random() * 0.35);
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 32; i++) {
      const angle = (Math.PI * 2 * i) / 32;
      const speed = 2.5 + Math.random() * 2.5;
      fireworkParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color, life: 0, maxLife: 60 + Math.random() * 20
      });
    }
    bursts++;
    if (bursts >= 4) clearInterval(interval);
  }, 420);
}

function animateCanvases() {
  if (document.hidden) {
    requestAnimationFrame(animateCanvases);
    return;
  }
  // confetti
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.rot += p.vrot; p.life++;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot * Math.PI / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
  });
  confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 40 && p.life < 260);

  // fireworks
  fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
  fireworkParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.045; p.life++;
    const alpha = Math.max(0, 1 - p.life / p.maxLife);
    fireworkCtx.beginPath();
    fireworkCtx.fillStyle = p.color;
    fireworkCtx.globalAlpha = alpha;
    fireworkCtx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    fireworkCtx.fill();
    fireworkCtx.globalAlpha = 1;
  });
  fireworkParticles = fireworkParticles.filter(p => p.life < p.maxLife);

  requestAnimationFrame(animateCanvases);
}
