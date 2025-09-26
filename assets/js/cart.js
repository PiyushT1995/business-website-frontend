// cart.js
document.addEventListener('DOMContentLoaded', function () {
  loadCart();

  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      prepareOrderDetails(); // fill hidden textarea with cart summary

      // clear cart after submission
      localStorage.removeItem('cart');

      // force redirect to thankyou.html after short delay
      setTimeout(() => {
        window.location.href = "thankyou.html";
      }, 800);
    });
  }
});

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
    document.getElementById('cartTotal').innerText = 'Total: ₹0';
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="text-align:left; display:flex; gap:10px; align-items:center;">
        <img src="${item.image}" alt="${item.name}">
        <div><strong>${item.name}</strong></div>
      </td>
      <td>₹${item.price}</td>
      <td>
        <button class="small-btn" data-action="dec" data-index="${index}">-</button>
        <span style="margin:0 8px;" id="qty-${index}">${item.qty}</span>
        <button class="small-btn" data-action="inc" data-index="${index}">+</button>
      </td>
      <td>₹${subtotal}</td>
      <td><button class="small-btn" data-action="remove" data-index="${index}">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  tbody.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', handleTableClick);
  });

  updateCartTotal();
}

function handleTableClick(e) {
  const action = e.target.dataset.action;
  const index = parseInt(e.target.dataset.index, 10);
  if (action === 'inc') changeQty(index, +1);
  if (action === 'dec') changeQty(index, -1);
  if (action === 'remove') removeItem(index);
}

function changeQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[index]) return;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById('cartTotal').innerText = `Total: ₹${total}`;
}

function prepareOrderDetails() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    document.getElementById('orderDetails').value = "Cart was empty.";
    return;
  }

  const lines = cart.map(i => `${i.name} x ${i.qty} = ₹${i.price * i.qty}`);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const orderSummary = `${lines.join('\n')}\n\nTotal: ₹${total}`;
  document.getElementById('orderDetails').value = orderSummary;
}
