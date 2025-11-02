$(document).ready(function () {
  // 🌙 Toggle Dark Mode
  $("#toggleTheme").click(function () {
    $("body").toggleClass("dark-mode");
  });

  // 🛒 Add to Cart Feature
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  $(".addCartBtn").click(function () {
    const name = $(this).closest(".card").find(".card-title").text();
    cart.push(name);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });

  // 🧾 Display Cart Items
  const $cartList = $("#cartItems");
  if ($cartList.length) {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    if (items.length === 0) {
      $cartList.html("<li class='list-group-item'>Your cart is empty.</li>");
    } else {
      items.forEach((item) => {
        $cartList.append(`<li class='list-group-item'>${item}</li>`);
      });
    }
  }

  // ✉️ Contact Form Validation
  const $form = $("#contactForm");
  if ($form.length) {
    $form.submit(function (e) {
      e.preventDefault();

      const name = $("#name").val().trim();
      const email = $("#email").val().trim();
      const message = $("#message").val().trim();
      const $msgEl = $("#formMessage");

      if (!name || !email || !message) {
        $msgEl.text("Please fill all fields!").css("color", "red");
      } else {
        $msgEl.text("Message sent successfully!").css("color", "green");
        $form[0].reset();
      }
    });
  }

  // 🔍 Product Search Filter
  $("#searchBox").on("keyup", function () {
    const term = $(this).val().toLowerCase();
    $(".product").each(function () {
      const title = $(this).find(".card-title").text().toLowerCase();
      $(this).toggle(title.includes(term));
    });
  });

  // 🧩 Cube Image Animation + Click Image Change
  const cubeImages = [
    "img/kubik.jpg",
    "img/mirror.jpg",
    "img/pyramid.jpg"
  ];
  let currentIndex = 0;
  const $cube = $(".cube-img");

  // Floating animation
  function floatCube() {
    $cube.animate({ marginTop: "-20px" }, 1000)
         .animate({ marginTop: "0px" }, 1000, floatCube);
  }
  floatCube();

  // On click: rotate and change image
  $cube.click(function () {
    currentIndex = (currentIndex + 1) % cubeImages.length;

    $(this).animate({ borderSpacing: 180 }, {
      step: function (now) {
        $(this).css("transform", `rotateY(${now}deg)`);
      },
      duration: 600,
      complete: function () {
        $(this).fadeOut(200, function () {
          $(this).attr("src", cubeImages[currentIndex]).fadeIn(200);
        });
        $(this).css("transform", "rotateY(0deg)");
      }
    });
  });
});