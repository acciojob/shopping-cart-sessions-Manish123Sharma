// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");
clearCartBtn.addEventListener("click", clearCart);

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
	// Add event listeners for buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render cart list
function renderCart() {
	cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
	const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();

  // Check if the product is already in the cart
  const alreadyInCart = cart.some((item) => item.id === productId);
  
  if (!alreadyInCart) {
    cart.push(product); // Add product to cart only if not already present
    saveCart(cart); // Save updated cart to session storage
    renderCart(); // Update the cart display
  }
  }
}

// Remove item from cart
function removeFromCart(productId) {
	const cart = getCart(); // Get the current cart
  const updatedCart = cart.filter(item => item.id !== productId); // Remove the item with the given productId
  saveCart(updatedCart); // Save the updated cart back to session storage
  renderCart();
}

// Clear cart
function clearCart() {
	sessionStorage.removeItem("cart"); // Clear specific cart item
  renderCart();
}

// Initial render
renderProducts();
renderCart();
