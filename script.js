const root = document.documentElement;
const body = document.body;

// Scroll progress
const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = `${percent}%`;
});

// Cursor glow
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.main-nav a');
navToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('rishi-theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '☾' : '☀';
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  if (current === 'dark') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', 'light');
  localStorage.setItem('rishi-theme', current === 'dark' ? 'dark' : 'light');
  themeToggle.textContent = current === 'light' ? '☾' : '☀';
});

// Hero role typewriter
const roles = [
  'Python software',
  'SQLite apps',
  'automation tools',
  'secure logic',
  'developer projects'
];
const typedRole = document.getElementById('typed-role');
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    letterIndex++;
    typedRole.textContent = current.slice(0, letterIndex);
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1300);
      return;
    }
  } else {
    letterIndex--;
    typedRole.textContent = current.slice(0, letterIndex);
    if (letterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 46 : 78);
}
typeRole();

// Hero code animation
const heroCode = document.getElementById('hero-code');
const codeLines = [
  'class Developer:',
  '    def __init__(self):',
  '        self.name = "Rishi Shekhar"',
  '        self.stack = ["Python", "SQLite", "Git"]',
  '        self.goal = "Build useful software"',
  '',
  '    def apply(self):',
  '        return "Ready for internships"',
];
let codeText = '';
let line = 0;
let char = 0;
function typeCode() {
  if (line < codeLines.length) {
    if (char < codeLines[line].length) {
      codeText += codeLines[line][char];
      char++;
    } else {
      codeText += '\n';
      line++;
      char = 0;
    }
    heroCode.textContent = codeText + '█';
    setTimeout(typeCode, 26);
  } else {
    heroCode.textContent = codeText;
  }
}
setTimeout(typeCode, 500);

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Active nav highlighting
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.main-nav a')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => navObserver.observe(section));

// 3D tilt cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((0.5 - y / rect.height)) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// Starfield canvas
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  createStars();
}
function createStars() {
  const count = Math.floor((window.innerWidth * window.innerHeight) / 8500);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.25,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    alpha: Math.random() * 0.62 + 0.18
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  stars.forEach((star) => {
    star.x += star.vx;
    star.y += star.vy;
    if (star.x < 0 || star.x > window.innerWidth) star.vx *= -1;
    if (star.y < 0 || star.y > window.innerHeight) star.vy *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(170, 238, 255, ${star.alpha})`;
    ctx.fill();
  });
  connectStars();
  requestAnimationFrame(drawStars);
}
function connectStars() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 105) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(56, 232, 255, ${0.1 * (1 - dist / 105)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

// Command menu
const commandButton = document.querySelector('.command-button');
const commandMenu = document.querySelector('.command-menu');
const commandClose = document.querySelector('.command-close');
function openCommandMenu() {
  commandMenu.classList.add('open');
  commandMenu.setAttribute('aria-hidden', 'false');
}
function closeCommandMenu() {
  commandMenu.classList.remove('open');
  commandMenu.setAttribute('aria-hidden', 'true');
}
commandButton.addEventListener('click', openCommandMenu);
commandClose.addEventListener('click', closeCommandMenu);
commandMenu.addEventListener('click', (event) => {
  if (event.target === commandMenu) closeCommandMenu();
});
window.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openCommandMenu();
  }
  if (event.key === 'Escape') closeCommandMenu();
});

// Copy email
const copyEmail = document.querySelector('.copy-email');
copyEmail.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('rishishekhar64@gmail.com');
    const original = copyEmail.innerHTML;
    copyEmail.innerHTML = '<span>Copied</span><strong>Email copied to clipboard ✓</strong>';
    setTimeout(() => { copyEmail.innerHTML = original; }, 1800);
  } catch (error) {
    window.location.href = 'mailto:rishishekhar64@gmail.com';
  }
});

// Magnetic buttons
const magnets = document.querySelectorAll('.magnetic');
magnets.forEach((magnet) => {
  magnet.addEventListener('pointermove', (event) => {
    const rect = magnet.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    magnet.style.transform = `translate(${x * 0.08}px, ${y * 0.18}px)`;
  });
  magnet.addEventListener('pointerleave', () => {
    magnet.style.transform = '';
  });
});
