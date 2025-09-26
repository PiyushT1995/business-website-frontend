// =========================
// FAQ Accordion Toggle
// =========================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.faq-question span').forEach(s => s.textContent = '+');

    if (!isOpen) {
      answer.style.display = 'block';
      btn.querySelector('span').textContent = '-';
    }
  });
});
