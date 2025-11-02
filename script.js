document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const cartButton = document.getElementById("cartButton");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.getElementById("closeCart");
  const cartItemsList = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let cart = [];
  let productsData = [];

  // Load products
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      productsData = data;
      displayProducts(data);
    });

  function displayProducts(products) {
    grid.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>₹${product.price}</strong></p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      `;

      grid.appendChild(card);
    });
  }

  // Search
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = productsData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
  });

  // Add to Cart
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const name = e.target.getAttribute("data-name");
      const price = parseFloat(e.target.getAttribute("data-price"));

      cart.push({ name, price });
      updateCart();
    }
  });

  function updateCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      total += item.price;
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      cartItemsList.appendChild(li);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
  }

  // Cart toggle
  cartButton.addEventListener(
    "click",
    () => (cartOverlay.style.display = "flex")
  );
  closeCart.addEventListener(
    "click",
    () => (cartOverlay.style.display = "none")
  );
  checkoutBtn.addEventListener("click", () => alert("Checkout successful!"));
});
