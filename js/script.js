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








  
});
$(document).ready(function () {
  var player;
  
  // Функция YouTube API должна быть глобальной для правильной работы
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('video', {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  };

  // Скрытие изображения и кнопки Play, запуск видео
  function hideThumbnail() {
    $('.thumbnail-container').hide();
    $('#video').show();
    player.playVideo();
  }

  // Показ изображения при паузе или остановке видео
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
      $('.thumbnail-container').show();
      $('#video').hide();
    }
  }

  // Событие при нажатии на картинку или кнопку play
  $('.thumbnail-container, .play-button').click(function () {
    hideThumbnail();
  });

  // Подключение YouTube API
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
