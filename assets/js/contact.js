// =========================
// Contact Form Validation (Formspree Integration)
// =========================

const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="_replyto"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    status.textContent = "⚠ Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "❌ Oops! There was a problem submitting your form.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Network error. Please try again later.";
    status.style.color = "red";
  }
});
