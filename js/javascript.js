$(document).ready(function () {

  // Contact form
  $("#contactForm").submit(function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const message = $("#message").val().trim();
    const consent = $("#consent").is(":checked");
    const $msgEl = $("#formMessage");

    if (!name || !email || !address || !message || !consent) {
      $msgEl.text("Please fill all fields and agree to consent!").css("color", "red");
    } else {
      $msgEl.text("Message sent successfully!").css("color", "green");
      $(this)[0].reset();
    }
  });

  // Product search
  $("#searchBox").on("keyup", function () {
    const term = $(this).val().toLowerCase();
    $(".product").each(function () {
      const title = $(this).find(".card-title").text().toLowerCase();
      $(this).toggle(title.includes(term));
    });
  });

  // Cube rotation
  $(".cube-img").click(function () {
    const $img = $(this);
    $img.addClass("rotate");
    setTimeout(function () {
      $img.removeClass("rotate");
    }, 1000);
  });

  // Add to cart 
  $(".btn-add-cart").click(function() {
    const card = $(this).closest(".card");
    const name = card.find(".card-title").text();
    const price = parseFloat(card.find(".card-text").text().replace("$", ""));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
  });

  // --- CART PAGE LOGIC ---
  function loadCart() {
    if ($("#cartContainer").length === 0) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = $("#cartContainer");
    container.empty();

    if (cart.length === 0) {
      container.html("<p>Your cart is empty.</p>");
      $("#totalAmount").text("0.00");
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemHtml = `
        <div class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Price: $${item.price.toFixed(2)}</p>
              <p class="card-text">Quantity: ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      container.append(itemHtml);
    });

    $("#totalAmount").text(total.toFixed(2));
  }

  // Remove item from cart
  $(document).on("click", ".remove-item", function() {
    const index = $(this).data("index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  });

  // Purchase cart
  $(document).on("click", "#purchaseBtn", function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      alert("Thank you for your purchase!");
      localStorage.removeItem("cart");
      loadCart();
    } else {
      alert("Your cart is empty!");
    }
  });

  loadCart();
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '🌞';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌞';
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '🌙';
    }
  });
});


