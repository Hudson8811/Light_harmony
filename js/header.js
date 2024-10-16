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

  $('.header__search').click(function(){
    $('.header__news-desktop').slideDown();
  });
  $('.header-news-btn-mobile a').click(function(){
    $('.header__news-mobile').slideDown();
  });

  $('.header__news-close').click(function(){
    $('.header__news-desktop').slideUp();
    $('.header__news-mobile').slideUp();
  });



  $(document).on("click", function (event) {
    if (
      !$('.header__news-desktop').is(event.target) &&
      $('.header__news-desktop').has(event.target).length === 0 &&
      !$('.header__search').is(event.target) &&
      $('.header__search').has(event.target).length === 0 &&
      !$('.header-news-btn-mobile a').is(event.target) &&
      $('.header-news-btn-mobile a').has(event.target).length === 0
    ) {
      $('.header__news-desktop').slideUp();
    }
  });
});
