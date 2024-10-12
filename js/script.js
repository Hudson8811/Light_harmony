$(document).ready(function () {
  $(".up-click").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  $(window).on("scroll", function () {
    $(".item-banners__image").each(function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop() - 200;
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("visible");
      }
    });
  });

  var count = 0;
  var interval = setInterval(function() {
    if (count <= 100) {
      $('#load-number span').text(count);
      count++;
    } else {
      clearInterval(interval); 
    }
  }, 3000);
});
