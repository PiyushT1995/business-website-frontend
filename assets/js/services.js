// services.js
document.addEventListener('DOMContentLoaded', function () {
  initFilters();
  initOrderButtons();
  updateCartCount();

  // show all products initially
  filterProducts('all');
});

/* ---------------------------
   FILTER BUTTONS
---------------------------- */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // remove active from all
      filterButtons.forEach(b => b.classList.remove('active'));
      // add active to clicked
      this.classList.add('active');

      // filter products
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

/* ---------------------------
   ORDER BUTTONS / CART
---------------------------- */
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

      // small confirmation toast
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
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1
    });
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

/* ---------------------------
   TEMPORARY TOAST MESSAGE
---------------------------- */
function showTempMessage(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.right = '20px';
  toast.style.bottom = '20px';
  toast.style.background = 'rgba(0,0,0,0.85)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 14px';
  toast.style.borderRadius = '6px';
  toast.style.zIndex = 9999;
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}
