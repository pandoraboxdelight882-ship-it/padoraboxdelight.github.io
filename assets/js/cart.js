const CART_KEY = "padoraCart";

const priceMap = {
  "Elite Padora Pizza": 0,
  "Chicken Shawarma": 0,
  "Beef Shawarma": 0,
  "Classic Burger": 0,
  "Chicken & Chips": 0,
  "Roasted Chicken": 0,
  "Waffles": 0,
  "Doughnuts": 0,
  "Meat Pie": 0,
  "6-Flavour Gelato": 0,
  "Parfait": 0,
  "Greek Yoghurt": 0,
  "Cotton Candy": 0,
  "Smoothie": 0,
  "Fruit Juice": 0,
  "Milkshake": 0,
  "Cocktails & Mocktails": 0,
  "Margarita": 0,
};

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, qty = 1, note = "") {
  const cart = getCart();

  const existing = cart.find(
    (item) => item.name === name && item.note === note
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: name,
      qty: qty,
      note: note,
      price: priceMap[name] || 0,
    });
  }

  saveCart(cart);
  alert(`${name} added to order list`);
}

function clearCart() {
  saveCart([]);
  renderCart();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);

  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
  });
}

function renderCart() {
  const cartBox = document.querySelector("#cartItems");
  const summary = document.querySelector("#orderSummaryText");

  if (!cartBox) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartBox.innerHTML =
      "<p>Your order list is empty. Go to the menu and add items.</p>";

    if (summary) summary.value = "";
    updateCartCount();
    return;
  }

  cartBox.innerHTML = cart
    .map(
      (item, idx) => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>Qty: ${item.qty}${item.note ? " | " + item.note : ""}</p>
        </div>
        <button class="filter" onclick="removeItem(${idx})">Remove</button>
      </div>
    `
    )
    .join("");

  const text = cart
    .map(
      (item) =>
        `${item.qty} x ${item.name}${item.note ? " (" + item.note + ")" : ""}`
    )
    .join("\n");

  if (summary) summary.value = text;

  updateCartCount();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function sendWhatsAppOrder() {
  const name = document.querySelector("#customerName")?.value || "";
  const phone = document.querySelector("#customerPhone")?.value || "";
  const address = document.querySelector("#customerAddress")?.value || "";
  const payment = document.querySelector("#paymentMethod")?.value || "";
  const notes = document.querySelector("#customerNotes")?.value || "";
  const cart = getCart();

  if (cart.length === 0) {
    alert("Please add items before sending order.");
    return;
  }

  const items = cart
    .map(
      (item) =>
        `- ${item.qty} x ${item.name}${
          item.note ? " (" + item.note + ")" : ""
        }`
    )
    .join("%0A");

  const message =
    `Hello Padora Box Delight,%0A` +
    `I want to place an order.%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Address: ${encodeURIComponent(address)}%0A` +
    `Payment: ${encodeURIComponent(payment)}%0A%0A` +
    `Items:%0A${items}%0A%0A` +
    `Notes: ${encodeURIComponent(notes)}`;

  window.open(`https://wa.me/2340000000000?text=${message}`, "_blank");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");

  if (!btn) return;

  const name = btn.dataset.add;
  const qtyInput = btn.parentElement.querySelector("input");
  const qty = Math.max(1, parseInt(qtyInput?.value || "1", 10));

  addToCart(name, qty);
});

updateCartCount();
renderCart();
