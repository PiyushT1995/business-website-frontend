// =========================
// Simple Slider for Portfolio
// =========================
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  index = (i + images.length) % images.length; // loop safely
  slides.style.transform = `translateX(${-index * 100}%)`;
}

if (prev && next) {
  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', () => showSlide(index + 1));
}

// Auto-slide every 5s
setInterval(() => {
  showSlide(index + 1);
}, 5000);
