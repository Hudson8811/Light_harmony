$(document).ready(function () {
  const $darkModeToggle = $("#darkMode");
  const $orangeThemeToggle = $("#orangeTheme");

  const $headerOptions = $("#headerOptions");
  const $headerOptionsBtn1 = $("#headerOptionsBtn1");
  const $headerOptionsBtn2 = $("#headerOptionsBtn2");
  const $burderHeader = $("#burderHeader");
  $(
    ".title-h2, .internal-page .title-h1, .sec1-about-us-page__left-big-text"
  ).html(function (_, html) {
    return "<span>" + html + "</span>";
  });

  $headerOptionsBtn1.on("click", function () {
    $headerOptions.toggleClass("show");
    checkBodyScrollbar();
    $("body").toggleClass("overflow-hidden");
    $("body").toggleClass("reduce-width");
  });
  $(document).on("click", function (event) {
    if (
      !$headerOptions.is(event.target) &&
      $headerOptions.has(event.target).length === 0 &&
      !$headerOptionsBtn1.is(event.target) &&
      $headerOptionsBtn1.has(event.target).length === 0 &&
      !$headerOptionsBtn2.is(event.target) &&
      $headerOptionsBtn2.has(event.target).length === 0 &&
      !$burderHeader.is(event.target) &&
      $burderHeader.has(event.target).length === 0 
    ) {
      $headerOptions.removeClass("show");
      checkBodyScrollbar();
      $("body").removeClass("overflow-hidden");
      $("body").removeClass("reduce-width");
    }
  });
  $headerOptionsBtn2.on("click", function () {
    $headerOptions.toggleClass("show");
  });

  $darkModeToggle.on("change", function () {
    if ($darkModeToggle.is(":checked")) {
      initDark();
      uncheckAndTriggerChange("#orangeTheme");
      setCookie("option-dark", "1", 90);
      $('.js-reset-options').addClass('active');
    } else {
      disableDark();
      setCookie("option-dark", "0", 90);
    }
  });

  function initDark() {
    $("body").removeClass("orange-active");
    $("body").addClass("dark-active");
    $(".header__logo-inner img").attr("src", "images/logo-white.png");
    $(".logo-footer__inner img").attr("src", "images/logo-white.png");
    $("#headerOptionsBtn1 img").attr("src", "images/options-white.png");
    $("#headerOptionsBtn2 img").attr("src", "images/options-white.png");
    $(".header__search-btn img").attr("src", "images/arrow-white.png");
    $(".header__search-btn").css({
      width: "8px",
      height: "8px",
    });
    $(".swiper-arrow img").attr("src", "images/swiper-arrow-white.svg");
  }
  function disableDark() {
    $("body").removeClass("dark-active");
    $(".header__logo-inner img").attr("src", "images/logo.png");
    $(".logo-footer__inner img").attr("src", "images/logo.png");
    $("#headerOptionsBtn1 img").attr("src", "images/options.png");
    $("#headerOptionsBtn2 img").attr("src", "images/options.png");
    $(".header__search-btn img").attr("src", "images/arrow.png");
    $(".swiper-arrow img").attr("src", "images/swiper-arrow.svg");
  }

  $orangeThemeToggle.on("change", function () {
    if ($orangeThemeToggle.is(":checked")) {
      initOrange();
      uncheckAndTriggerChange("#darkMode");
      uncheckAndTriggerChange("#animation");
      setCookie("option-orange", "1", 90);
      $('.js-reset-options').addClass('active');
    } else {
      disableOrange();
      setCookie("option-orange", "0", 90);
    }
  });

  function initOrange() {
    $("body").addClass("orange-active");
    $(".intro__anim").addClass("orange-bg");
  }
  function disableOrange() {
    $("body").removeClass("orange-active");
    $(".intro__anim").removeClass("orange-bg");
  }

  $("#generalLight").on("input", function () {
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie("generalLight-value", value.toString(), 90);

    let rgbResult = getColor(
      value,
      [180, 180, 180],
      [226, 226, 226],
      [255, 255, 255]
    );
    setRootStyle("--light-theme-bg", rgbResult);
    setCookie("color-light-theme-bg", rgbResult, 90);

    let rgbResult2 = getColor(value, [50, 50, 50], [33, 33, 33], [0, 0, 0]);
    setRootStyle("--dark-theme-bg", rgbResult2);
    setCookie("dark-theme-bg", rgbResult2, 90);
    $('.js-reset-options').addClass('active');
  });

  $("#accentLight").on("input", function () {
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie("accentLight-value", value.toString(), 90);

    let rgbResult = getColor(
      value,
      [255, 186, 160],
      [245, 95, 36],
      [255, 72, 0]
    );
    setRootStyle("--orange-theme", rgbResult);
    setCookie("color-orange-theme", rgbResult, 90);
    $('.js-reset-options').addClass('active');
  });

  $("#fontBrightness").on("input", function () {
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie("fontBrightness-value", value.toString(), 90);

    let rgbResult = getColor(value, [150, 150, 150], [33, 33, 33], [0, 0, 0]);
    setRootStyle("--light-theme-dark-text", rgbResult);
    setCookie("color-light-theme-dark-text", rgbResult, 90);

    let rgbResult2 = getColor(
      value,
      [100, 100, 100],
      [219, 219, 219],
      [255, 255, 255]
    );
    setRootStyle("--dark-theme-light-text", rgbResult2);
    setCookie("color-dark-theme-light-text", rgbResult2, 90);
    $('.js-reset-options').addClass('active');
  });

  let darkOption = getCookie("option-dark");
  if (darkOption === "0") {
    $darkModeToggle.prop("checked", false);
    disableDark();
  } else if (darkOption != null) {
    $darkModeToggle.prop("checked", true);
    initDark();
    $('.js-reset-options').addClass('active');
  }

  let orangeOption = getCookie("option-orange");
  if (orangeOption === "0") {
    $orangeThemeToggle.prop("checked", false);
    disableOrange();
  } else if (orangeOption != null) {
    $orangeThemeToggle.prop("checked", true);
    initOrange();
    $('.js-reset-options').addClass('active');
  }

  let generalLightValue = getCookie("generalLight-value");
  if (generalLightValue) {
    $("#generalLight").val(parseInt(generalLightValue));
  }

  let accentColorValue = getCookie("accentLight-value");
  if (accentColorValue) {
    $("#accentLight").val(parseInt(accentColorValue));
  }

  let fontColorValue = getCookie("fontBrightness-value");
  if (fontColorValue) {
    $("#fontBrightness").val(parseInt(fontColorValue));
  }

  let generalLight1 = getCookie("color-light-theme-bg");
  if (generalLight1) {
    setRootStyle("--light-theme-bg", generalLight1);
    $('.js-reset-options').addClass('active');
  }
  let generalLight2 = getCookie("dark-theme-bg");
  if (generalLight2) {
    setRootStyle("--dark-theme-bg", generalLight2);
    $('.js-reset-options').addClass('active');
  }

  let accentColor = getCookie("color-orange-theme");
  if (accentColor) {
    setRootStyle("--orange-theme", accentColor);
    $('.js-reset-options').addClass('active');
  }

  let fontColor1 = getCookie("color-light-theme-dark-text");
  if (fontColor1) {
    setRootStyle("--light-theme-dark-text", fontColor1);
    $('.js-reset-options').addClass('active');
  }
  let fontColor2 = getCookie("color-dark-theme-light-text");
  if (fontColor2) {
    setRootStyle("--dark-theme-light-text", fontColor2);
    $('.js-reset-options').addClass('active');
  }


  $('.js-reset-options').on('click',function (){
    $(this).removeClass('active');
    uncheckAndTriggerChange("#darkMode");
    checkAndTriggerChange("#animation");

    $("#fontBrightness, #generalLight, #accentLight").val(50);

    deleteCookie('option-animate');
    deleteCookie('option-orange');
    deleteCookie('option-dark');
    deleteCookie('generalLight-value');
    deleteCookie('accentLight-value');
    deleteCookie('fontBrightness-value');
    deleteCookie('color-light-theme-bg');
    deleteCookie('dark-theme-bg');
    deleteCookie('color-orange-theme');
    deleteCookie('color-light-theme-dark-text');
    deleteCookie('color-dark-theme-light-text');

    removeRootStyle("--dark-theme-light-text");
    removeRootStyle("--light-theme-dark-text");
    removeRootStyle("--orange-theme");
    removeRootStyle("--dark-theme-bg");
    removeRootStyle("--light-theme-bg");
  });
});

function getColor(value, rgbStart, rgbMid, rgbEnd) {
  let rgbResult;
  if (value <= 50) {
    const ratio = value / 50;
    rgbResult = rgbStart.map((start, index) => {
      return Math.round(start + ratio * (rgbMid[index] - start));
    });
  } else {
    const ratio = (value - 50) / 50;
    rgbResult = rgbMid.map((mid, index) => {
      return Math.round(mid + ratio * (rgbEnd[index] - mid));
    });
  }
  return `rgb(${rgbResult[0]}, ${rgbResult[1]}, ${rgbResult[2]})`;
}

function setRootStyle(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

function removeRootStyle(variable) {
  document.documentElement.style.removeProperty(variable);
}

function uncheckAndTriggerChange(checkboxId) {
  var $checkbox = $(checkboxId);
  $checkbox.prop("checked", false).trigger("change");
}

function checkAndTriggerChange(checkboxId) {
  var $checkbox = $(checkboxId);
  $checkbox.prop("checked", true).trigger("change");
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function getScrollbarWidth() {
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  return scrollbarWidth;
}

function checkBodyScrollbar() {
  let $headerOptions = $("#headerOptions");
  let optionsHeight = $headerOptions.innerHeight();
  if ($headerOptions.hasClass('show')) {
    let sideBarWidth = getScrollbarWidth();
    if (sideBarWidth) {
      $("body").css('padding-right', sideBarWidth);
    }
    if (window.innerWidth >= 1280) {
      $('.wrapper').css('transform', 'translateY('+optionsHeight+'px)').css('padding-right', sideBarWidth);
      $('.wrapper > .header').css('padding-right', sideBarWidth);
    }
  } else {
    $("body").css('padding-right', '');
    $('.wrapper').css('transform', '').css('padding-right', '');
    $('.wrapper > .header').css('padding-right', '');
  }


}