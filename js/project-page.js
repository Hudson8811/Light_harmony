$(document).ready(function () {
  $(".project-page-spoiler-btn").on("click", function () {
    $(this).toggleClass("show");
    $(this).next().slideToggle();
  });
});
