// services.js
document.addEventListener('DOMContentLoaded', function () {
  initFilters();
  initOrderButtons();
  updateCartCount();
  // show all products initially
  filterProducts('all');
});

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // mark active
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterProducts(this.dataset.filter);
    });
  });
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  if (category === 'all') {
    products.forEach(p => p.classList.add('show'));
    return;
  }
  products.forEach(p => {
    p.classList.remove('show');
    if (p.classList.contains(category)) {
      p.classList.add('show');
    }
  });
}

function initOrderButtons() {
  const orderButtons = document.querySelectorAll('.btn-order');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.product-card');
      if (!card) return;
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const image = card.dataset.image || card.querySelector('img')?.src || '';
      addToCart({ id, name, price, image });
      // small confirmation
      showTempMessage(`${name} added to cart`);
    });
  });
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, i) => sum + (i.qty || 0), 0);
  const el = document.getElementById('cart-count');
  if (el) el.innerText = count;
}

function showTempMessage(message) {
  // simple toast using alert fallback; you can customize later
  // Using a non-blocking toast element is preferred, but to keep it simple:
  // small temporary overlay
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.right = '20px';
  toast.style.bottom = '20px';
  toast.style.background = 'rgba(0,0,0,0.8)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 14px';
  toast.style.borderRadius = '6px';
  toast.style.zIndex = 9999;
  toast.style.fontSize = '14px';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}
