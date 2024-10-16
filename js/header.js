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
});
