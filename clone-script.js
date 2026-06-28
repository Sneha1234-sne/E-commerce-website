const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");

// Cart array to store items
let cart = [];

// Function to add item to cart
function addToCart(name, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    // Update cart count
    updateCartCount();
    // Display cart popup
    showCartPopup();
}

// Function to update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to show cart popup with total
function showCartPopup() {
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Create popup element
    const popup = document.createElement("div");
    popup.classList.add("cart-popup");
    popup.innerHTML = `
<h3>Cart Summary</h3>
<ul>
    ${cart.map(item => `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
</ul>
<p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
<button onclick="closePopup()">Close</button>
`;

    document.body.appendChild(popup);

    // Remove popup after a few seconds
    setTimeout(() => closePopup(), 5000);
}

// Function to close popup
function closePopup() {
    const popup = document.querySelector(".cart-popup");
    if (popup) {
        popup.remove();
    }
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price);
    });
});


// Function to add item to cart and save to session storage
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ name, price, quantity: 1 });
  }

  // Save cart to session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount();
  showCartPopup();
}
