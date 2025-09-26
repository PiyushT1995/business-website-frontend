// =========================
// Contact Form Validation & Submission
// =========================

const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.textContent = "Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  // TODO: Integrate EmailJS or Formspree here
  // Example EmailJS:
  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
  //   .then(() => { status.textContent = "Message sent!"; })
  //   .catch(() => { status.textContent = "Error sending message."; });

  status.textContent = "Message sent successfully (demo mode).";
  status.style.color = "green";
  form.reset();
});
