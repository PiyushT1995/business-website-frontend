// =========================
// VIDEO BEHAVIOR
// =========================
const video = document.getElementById("shopVideo");

if (video) {
  // When video ends → reload (reset to poster)
  video.addEventListener("ended", () => {
    video.load();
  });

  // Allow replay on click
  video.addEventListener("click", () => {
    video.play();
  });
}

// =========================
// NAVBAR TOGGLE (Mobile)
// =========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
