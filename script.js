document.addEventListener("DOMContentLoaded", () => {

  const cart = []; // Array to hold the items in the cart

  // Add event listener to the search button
  const searchBtn = document.getElementById("searchInput");
  searchBtn.addEventListener("click", function () {
      alert("No searches at the moment.");
  });

  // Select the form and the submit button
  const form = document.getElementById('myForm');
  const submitButton = document.getElementById('commentSubmitButton');

  // Add an event listener to the submit button
  submitButton.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent the default form submission

      const formData = new FormData(form);
 // fetch data from the form and post the changes to the database.
      fetch("https://fakestoreapi.com/products", {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });

      form.reset();
      alert("submitted successfully!");
  });

  // Change document color to dark mode
  const blackMode = document.getElementById("blackModeBtn");
  blackMode.addEventListener("click", function () {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
  });

  // Change document color from dark to light mode
  const lightMode = document.getElementById("lightModeBtn");
  lightMode.addEventListener("click", function () {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
  });

  // Function to render products and add them to the cart
  function renderData() {
      fetch("https://fakestoreapi.com/products")
      .then(res => {
          return res.json();
      })
      .then(data => {
          console.log(data);
          data.forEach(product => {
              const productDiv = `
                  <div class="content">
                      <h3>${product.title}</h3>
                      <p>Price: $${product.price}</p>
                      <p>${product.description}</p>
                      <p>Category: ${product.category}</p>
                      <img src="${product.image}" alt="${product.title}">
                      <button class="addToCartBtn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
                  </div>
              `;

              const container = document.querySelector("#dataContainer");
              container.insertAdjacentHTML("beforeend", productDiv);
          });

          // Add event listeners to the "Add to Cart" buttons
          const addToCartButtons = document.querySelectorAll(".addToCartBtn");
          addToCartButtons.forEach(button => {
              button.addEventListener("click", (e) => {
                  const productId = e.target.getAttribute("data-id");
                  const productTitle = e.target.getAttribute("data-title");
                  const productPrice = e.target.getAttribute("data-price");
                  const productImage = e.target.getAttribute("data-image");

                  const product = {
                      id: productId,
                      title: productTitle,
                      price: productPrice,
                      image: productImage
                  };

                  addToCart(product);
                  updateCartDisplay();
              });
          });
      })
      .catch(error => {
          console.log(error);
      });
  }

  function addToCart(product) {
      cart.push(product);
  }

  function updateCartDisplay() {
      const cartItemsDiv = document.getElementById("cartItems");
      cartItemsDiv.innerHTML = ''; // Clear current cart display

      if (cart.length === 0) {
          cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
          return;
      }

      cart.forEach(product => {
          const cartItem = `
              <div class="cartItem">
                  <h4>${product.title}</h4>
                  <p>Price: $${product.price}</p>
                  <img src="${product.image}" alt="${product.title}" width="50">
              </div>
          `;
          cartItemsDiv.insertAdjacentHTML("beforeend", cartItem);
      });
  }

  // Add functionality to clear the cart
  const clearCartBtn = document.getElementById("clearCartBtn");
  clearCartBtn.addEventListener("click", () => {
      cart.length = 0; // Clear the cart array
      updateCartDisplay();
  });

  renderData(); // Load products and render them
});

