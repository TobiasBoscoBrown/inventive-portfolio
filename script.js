// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open') ? '&#x2715;' : '&#9776;';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

// Add fade-in to all major sections
document.querySelectorAll(
  '.why-card, .skill-category, .portfolio-card, .brand-card, .process-step, .contact-card, .stat'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stagger children within grids
document.querySelectorAll('.why-grid, .skills-categories, .portfolio-grid, .brands-grid, .contact-options').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Counter animation for hero stats
function animateCounter(el, target, suffix = '', isText = false) {
  if (isText) return;
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = (suffix === '+' ? `${val}+` : (suffix === 'x' ? `${val}x` : `${val}${suffix}`));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent.trim();
        if (text === '3+') animateCounter(el, 3, '+');
        else if (text === '10+') animateCounter(el, 10, '+');
        else if (text === '4') animateCounter(el, 4, '');
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);
