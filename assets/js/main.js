// main.js

document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     Mobile Navbar Toggle
  ================================ */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Update aria-expanded for accessibility
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
  });

  /* ===============================
     Sticky Navbar on Scroll
  ================================ */
  const navbar = document.getElementById('navbar');
  const sticky = navbar.offsetTop;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  /* ===============================
     Smooth Scroll for Anchor Links
  ================================ */
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Close mobile menu after clicking
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  });

});
