$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});

$(".menu").click(function () {
  $(".sidebar").show();

  setTimeout(function () {
    $(".sidebar-box").addClass("open-slide-box");
  }, 50);
});
$(".sidebar").click(function (e) {
  if (
    !$(e.target).hasClass("menu") &&
    $(e.target).parents(".sidebar-box").length === 0
  ) {
    $(".sidebar-box").removeClass("open-slide-box");
    setTimeout(function () {
      $(".sidebar").fadeOut();
    }, 350);
  }
});


var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".product-select").style.display = "flex";
  } else {
    document.querySelector(".product-select").style.display = "none";
  }
  prevScrollpos = currentScrollPos;
};

document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const content = document.querySelector(".scroller");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      content.scrollTo({
        left: content.scrollLeft - 300,
        behavior: "smooth",
      });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      content.scrollTo({
        left: content.scrollLeft + 300,
        behavior: "smooth",
      });
    });
  }
});
