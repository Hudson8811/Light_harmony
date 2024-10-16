$(document).ready(function () {
  $(".up-click").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  if ($(".item-banners__image").length > 0) {
    gsap.registerPlugin(ScrollTrigger);
    const bannerImages = document.querySelectorAll(".item-banners__image");
    bannerImages.forEach((item) => {
      gsap.fromTo(
        item,
        { maxWidth: "60%" },
        {
          ease: "power1.inOut",
          maxWidth: "100%",
          scrollTrigger: {
            trigger: item,
            start: "top+=40px bottom",
            end: "bottom bottom",
            scrub: 0.7,
          },
        }
      );
    });
  }

  var countload = 0;
  interval = setInterval(function () {
    $("#load-number span").html(countload++); // Обновляем число в элементе
    if (countload > 100) clearInterval(interval); // Останавливаем, когда достигнем 100
  }, 27);

  $(".button").hover(
    function () {
      let $tooltip = $(this).find(".tooltip");
      $tooltip.show();

      // Позиционирование всплывающего элемента
      let tooltipWidth = $tooltip.outerWidth();
      let tooltipHeight = $tooltip.outerHeight();
      let buttonOffset = $(this).offset();
      let buttonWidth = $(this).outerWidth();
      let buttonHeight = $(this).outerHeight();

      // Рассчитываем начальное положение (снизу от кнопки)
      let top = buttonOffset.top + buttonHeight;
      let left = buttonOffset.left;

      // Проверяем, не выходит ли элемент за пределы экрана по горизонтали
      if (left + tooltipWidth > $(window).width()) {
        left = $(window).width() - tooltipWidth - 10; // Добавляем отступ
      }
      if (left < 0) {
        left = 10; // Если слишком слева, корректируем вправо
      }

      // Проверяем, не выходит ли элемент за пределы экрана по вертикали
      if (top + tooltipHeight > $(window).height()) {
        top = buttonOffset.top - tooltipHeight; // Отображаем сверху кнопки
      }

      // Применяем новые координаты
      $tooltip.css({
        top: top + "px",
        left: left + "px",
      });
    },
    function () {
      // Скрываем элемент при уходе курсора
      $(this).find(".tooltip").hide();
    }
  );

  var player;

  // Функция YouTube API должна быть глобальной для правильной работы
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("video", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };

  // Скрытие изображения и кнопки Play, запуск видео
  function hideThumbnail() {
    $(".thumbnail-container").hide();
    $("#video").show();
    player.playVideo();
  }

  // Показ изображения при паузе или остановке видео
  function onPlayerStateChange(event) {
    if (
      event.data == YT.PlayerState.PAUSED ||
      event.data == YT.PlayerState.ENDED
    ) {
      $(".thumbnail-container").show();
      $("#video").hide();
    }
  }

  // Событие при нажатии на картинку или кнопку play
  $(".thumbnail-container, .play-button").click(function () {
    hideThumbnail();
  });

  // Подключение YouTube API
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $(".swiper-suppliers__icon").append(
    '<div class="swiper-suppliers__icon-hovered"></div>'
  );

  $(".swiper-suppliers__icon").on("mouseenter", function (e) {
    let hoverElem = $(this).find(".swiper-suppliers__icon-hovered");
    let direction = getDirection($(this), e);

    if (direction === "left") {
      hoverElem
        .css({ left: "-100%", top: "0%" })
        .stop(true, true)
        .animate({ left: "0%" }, 300);
    } else if (direction === "right") {
      hoverElem
        .css({ left: "100%", top: "0%" })
        .stop(true, true)
        .animate({ left: "0%" }, 300);
    } else if (direction === "top") {
      hoverElem
        .css({ top: "-100%", left: "0%" })
        .stop(true, true)
        .animate({ top: "0%" }, 300);
    } else if (direction === "bottom") {
      hoverElem
        .css({ top: "100%", left: "0%" })
        .stop(true, true)
        .animate({ top: "0%" }, 300);
    }
  });

  $(".swiper-suppliers__icon").on("mouseleave", function (e) {
    let hoverElem = $(this).find(".swiper-suppliers__icon-hovered");
    let direction = getDirection($(this), e);

    if (direction === "left") {
      hoverElem.stop(true, true).animate({ left: "-100%" }, 300);
    } else if (direction === "right") {
      hoverElem.stop(true, true).animate({ left: "100%" }, 300);
    } else if (direction === "top") {
      hoverElem.stop(true, true).animate({ top: "-100%" }, 300);
    } else if (direction === "bottom") {
      hoverElem.stop(true, true).animate({ top: "100%" }, 300);
    }
  });

  function getDirection($element, event) {
    let w = $element.width(),
      h = $element.height(),
      x = (event.pageX - $element.offset().left - w / 2) * (w > h ? h / w : 1),
      y = (event.pageY - $element.offset().top - h / 2) * (h > w ? w / h : 1);
    let direction =
      Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;

    switch (direction) {
      case 0:
        return "top";
      case 1:
        return "right";
      case 2:
        return "bottom";
      case 3:
        return "left";
    }
  }

  $("*").each(function () {
    if (window.getComputedStyle(this).cursor === "pointer") {
      $(this).hover(
        function () {
          $("#followBig").addClass("active");
        },
        function () {
          $("#followBig").removeClass("active");
        }
      );
    }
  });
  /* $('.header__search').hover(
    function () {
      $("#followBig").addClass("active");
    },
    function () {
      $("#followBig").removeClass("active");
    }
  ); */
});
