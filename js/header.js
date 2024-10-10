$(document).ready(function () {
  $("#burderHeader").on("click", function () {
    $("#menu").toggleClass("show");
    $("#burderHeader").toggleClass("active");
    $("body").toggleClass("overflow-hidden");
  });
  $("#headerOptions #burderHeader1").on("click", function () {
    $("#menu").removeClass("show");
    $("#burderHeader").removeClass("active");

    $("#headerOptions").removeClass("show");
    $('body').removeClass("overflow-hidden");
    $('body').removeClass("reduce-width");
  });
});
