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
    $('body').removeClass("overflow-hidden");
    $("body").removeClass("overflow-hidden1");
    $('body').removeClass("reduce-width");
  });


  $('.js-show-news').on('click',function (){
    $("body").addClass("side-hide");
    checkBodyScrollbar();
    $("body").addClass("overflow-hidden");

    let btn = $('.header__widget--btn');
    let news = $('.header__widget--news');
    let newsInner = news.find('.header__news-wrapper');
    let overlay = $('.header__widget-background');
    let offset = btn.offset();
    let scrollTop = $(window).scrollTop();
    let scrollLeft = $(window).scrollLeft();
    let btnWidth = btn.outerWidth();
    let btnHeight = btn.outerHeight();

    let windowInner = $(window).width();
    let windowOuter = window.innerWidth;

    let windowCenter = windowInner / 2;
    let offsetFromCenter = (offset.left + btnWidth/2 - windowCenter + (windowOuter - windowInner)/2)*2;

    let position = {
      top: offset.top - scrollTop,
      left: offset.left - scrollLeft
    };

    news.data('left', offsetFromCenter);
    gsap.set(news, {
      display: 'flex',
      paddingLeft: offsetFromCenter,
      paddingTop: position.top,
    });

    gsap.set(newsInner, {
      width: btnWidth,
      height: btnHeight
    });

    gsap.set(overlay, {
      opacity: 1
    });

    const tl = gsap.timeline();

    tl.to(news, {
      duration: 0.3,
      paddingLeft: 0
    })
    .to(newsInner, {
      duration: 0.3,
      width: 'min(474px, 100vw)',
      height: '100%'
    }, "<")
    .to('.header__news', {
      display: 'block',
      opacity: 1,
      duration: 0,
    });
  });

  $(document).on('click', '.js-close-news', function (){
    $("body").removeClass("side-hide");
    checkBodyScrollbar();
    $("body").removeClass("overflow-hidden");

    let btn = $('.header__widget--btn');
    let news = $('.header__widget--news');
    let newsInner = news.find('.header__news-wrapper');
    let overlay = $('.header__widget-background');
    let btnWidth = btn.outerWidth();
    let btnHeight = btn.outerHeight();

    let offsetFromCenter = news.data('left');

    $('.header__news').hide();

    gsap.set(overlay, {
      opacity: 0
    });

    const tl = gsap.timeline();
    tl.to(newsInner, {
      duration: 0.3,
      width: btnWidth,
      height: btnHeight
    })
    .to(news, {
      duration: 0.3,
      paddingLeft: offsetFromCenter
    }, "<")
    .to(news, {
      duration: 0,
      display: 'none',
      opacity: 1
    });
  });
});
