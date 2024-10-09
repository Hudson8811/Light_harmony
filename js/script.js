$(document).ready(function () {
  $(".up-click").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  function manageBigItemsClass() {
    if ($(window).width() < 1280) {
      $(".projects-page__item").each(function (index) {
        if ((index + 1) % 3 === 0) {
          $(this).addClass("projects-page__item--big");
        } else {
          $(this).removeClass("projects-page__item--big");
        }
      });
    }
  }

  manageBigItemsClass();

  $(window).resize(function () {
    manageBigItemsClass();
  });
});
