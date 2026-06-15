const navToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll("#mainNav a").forEach((a) => {
  a.addEventListener("click", () => {
    if (nav) nav.classList.remove("open");
  });
});

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll("[data-category]").forEach((card) => {
      const ok = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !ok);
    });
  });
});

function quickBotAnswer() {
  const input = document.querySelector("#botInput");
  const box = document.querySelector("#botMessages");

  if (!input || !box || !input.value.trim()) return;

  const q = input.value.trim();

  box.insertAdjacentHTML("beforeend", `<div class="msg me">${q}</div>`);

  let reply =
    "Thanks love. Please click Order or message us on WhatsApp for fast confirmation.";

  const lower = q.toLowerCase();

  if (lower.includes("price")) {
    reply =
      "You can check prices on each menu page. Replace the ₦___ placeholders with your real prices before launch.";
  }

  if (lower.includes("pizza")) {
    reply =
      "Elite Padora Pizza is on promo: Buy one, get one free. Click the Pizza page to order.";
  }

  if (lower.includes("delivery")) {
    reply =
      "Delivery will depend on your location. Add your address during checkout or WhatsApp us.";
  }

  if (lower.includes("open") || lower.includes("time")) {
    reply =
      "Opening hours shown now are 10:00 AM - 10:00 PM. Update them before launch.";
  }

  box.insertAdjacentHTML("beforeend", `<div class="msg">${reply}</div>`);
  input.value = "";
  box.scrollTop = box.scrollHeight;
}
