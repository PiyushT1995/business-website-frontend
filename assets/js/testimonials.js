// =========================
// Testimonials Slider
// =========================
const testimonialSlides = document.querySelector('.testimonial-slides');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let tIndex = 0;

function showTestimonial(i) {
  tIndex = (i + testimonialCards.length) % testimonialCards.length;
  testimonialSlides.style.transform = `translateX(${-tIndex * 100}%)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => showTestimonial(tIndex - 1));
  nextBtn.addEventListener('click', () => showTestimonial(tIndex + 1));
}

// Auto-slide every 6s
setInterval(() => {
  showTestimonial(tIndex + 1);
}, 6000);
