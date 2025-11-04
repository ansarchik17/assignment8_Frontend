$(document).ready(function () {

  $("#contactForm").submit(function (e) {
    e.preventDefault();
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();
    const $msgEl = $("#formMessage");

    if (!name || !email || !message) {
      $msgEl.text("Please fill all fields!").css("color", "red");
    } else {
      $msgEl.text("Message sent successfully!").css("color", "green");
      $(this)[0].reset();
    }
  });

  $("#searchBox").keyup(function () {
    const term = $(this).val().toLowerCase();
    $(".product").each(function () {
      const title = $(this).find(".card-title").text().toLowerCase();
      $(this).toggle(title.includes(term));
    });
  });

  $(".cube-img").click(function () {
    const $img = $(this);
    $img.addClass("rotate");
    setTimeout(function () {
      $img.removeClass("rotate");
    }, 1000);
  });

});
