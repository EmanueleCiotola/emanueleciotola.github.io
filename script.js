// ScrollSpy (Highlight active link in Navbar)
const sections = document.querySelectorAll('.section-spy');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= (sectionTop - 150)) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current))link.classList.add('active');
  });
});

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal-on-scroll, .timeline-item, .btn-icon-text');
const isLowEndDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
                       (navigator.deviceMemory && navigator.deviceMemory <= 4);

if (!isLowEndDevice) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}

// Smooth Scroll
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, //? Navbar height offset
        behavior: 'smooth'
      });
    }
  });
});

// Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinksMobile = document.querySelectorAll('.nav-link');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
});

navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('no-scroll');
  });
});

// Logo Click Logic
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.classList.remove('no-scroll');
});

// Touch Interaction for Image Frame Logic
const imageFrame = document.querySelector('.image-frame');
// Quando inizi a toccare
imageFrame.addEventListener('touchstart', function() {
  this.classList.add('is-touching');
}, { passive: true });
// Quando smetti di toccare
imageFrame.addEventListener('touchend', function() {
  this.classList.remove('is-touching');
});
// Gestisce il caso in cui il tocco viene interrotto (es. scrolling)
imageFrame.addEventListener('touchcancel', function() {
  this.classList.remove('is-touching');
});
