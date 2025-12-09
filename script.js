document.addEventListener('DOMContentLoaded', function () {
  const cartCountSpan = document.getElementById('cart-count');
  let cart = [];

  const cartItemsList = document.getElementById('cart-items');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  const addButtons = document.querySelectorAll('.add-to-cart');

  addButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const name = btn.getAttribute('data-name');
      const priceString = btn.getAttribute('data-price') || '0';
      const price = parseFloat(priceString);

      cart.push({ name, price });

      updateCartBadge();

      renderCartSummary();
    });
  });

  function updateCartBadge() {
    const count = cart.length;
    cartCountSpan.textContent = count;
    cartCountSpan.setAttribute('data-count', String(count));
  }

  function renderCartSummary() {
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li class="empty-cart">Tu carrito está vacío.</li>';
      cartTotalAmount.textContent = 'S/ 0.00';
      return;
    }

    cartItemsList.innerHTML = '';

    let total = 0;

    cart.forEach(function (item) {
      total += item.price;

      const li = document.createElement('li');
      li.classList.add('cart-item-row');

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('item-name');
      nameSpan.textContent = item.name;

      const priceSpan = document.createElement('span');
      priceSpan.classList.add('item-price');
      priceSpan.textContent = 'S/ ' + item.price.toFixed(2);

      li.appendChild(nameSpan);
      li.appendChild(priceSpan);
      cartItemsList.appendChild(li);
    });

    cartTotalAmount.textContent = 'S/ ' + total.toFixed(2);
  }
});
