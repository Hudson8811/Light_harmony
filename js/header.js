$(document).ready(function () {
  $("#burderHeader").on("click", function () {
    $("#menu").toggleClass("show");
    $("#burderHeader").toggleClass("active");
    $("body").toggleClass("overflow-hidden1");
  });
  $("#headerOptions #burderHeader1").on("click", function () {
    $("#menu").removeClass("show");
    $("#burderHeader").removeClass("active");

    $("#headerOptions").removeClass("show");
    checkBodyScrollbar();
    $('body').removeClass("overflow-hidden")
    $("body").removeClass("overflow-hidden1");;
    $('body').removeClass("reduce-width");
  });

  $('.header__search-input').click(function(){
    $('.header__news').slideDown();
  });

  $('.header__news-close').click(function(){
    $('.header__news').slideUp();
  });



  $(document).on("click", function (event) {
    if (
      !$('.header__news').is(event.target) &&
      $('.header__news').has(event.target).length === 0 &&
      !$('.header__search-input').is(event.target) &&
      $('.header__search-input').has(event.target).length === 0
    ) {
      $('.header__news').slideUp();
    }
  });
});
