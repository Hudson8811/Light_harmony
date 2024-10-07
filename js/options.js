$(document).ready(function () {
  const $darkModeToggle = $("#darkMode");
  const $orangeThemeToggle = $("#orangeTheme");

  const $headerOptions = $("#headerOptions");
  const $headerOptionsBtn1 = $("#headerOptionsBtn1");
  const $headerOptionsBtn2 = $("#headerOptionsBtn2");
  $('.title-h2, .internal-page .title-h1, .sec1-about-us-page__left-big-text').html(function(_, html) {
    return '<span>' + html + '</span>';
  });
  $headerOptionsBtn1.on("click", function () {
    $headerOptions.toggleClass("show");
  });
  $headerOptionsBtn2.on("click", function () {
    $headerOptions.toggleClass("show");
  });

  $darkModeToggle.on("change", function () {
    if ($darkModeToggle.is(":checked")) {
      initDark();
      uncheckAndTriggerChange('#orangeTheme');
      setCookie('option-dark','1',90);
    } else {
      disableDark();
      setCookie('option-dark','0',90);
    }
  });

  function initDark() {
    $("body").removeClass('orange-active');
    $("body").addClass('dark-active');
    $('.header__logo-inner img').attr('src', 'images/logo-white.png');
    $('.logo-footer__inner img').attr('src', 'images/logo-white.png');
    $('#headerOptionsBtn1 img').attr('src', 'images/options-white.png');
    $('.header__search-btn img').attr('src', 'images/arrow-white.png');
    $(".header__search-btn").css({
      width: "8px",
      height: "8px",
    });
    $('.swiper-arrow img').attr('src', 'images/swiper-arrow-white.png');
  }
  function disableDark() {
    $("body").removeClass('dark-active');
    $('.header__logo-inner img').attr('src', 'images/logo.png');
    $('.logo-footer__inner img').attr('src', 'images/logo.png');
    $('#headerOptionsBtn1 img').attr('src', 'images/options.png');
    $('.header__search-btn img').attr('src', 'images/arrow.png');
    $('.swiper-arrow img').attr('src', 'images/swiper-arrow.png');
  }

  $orangeThemeToggle.on("change", function () {
    if ($orangeThemeToggle.is(":checked")) {
      initOrange();
      uncheckAndTriggerChange('#darkMode');
      uncheckAndTriggerChange('#animation');
      setCookie('option-orange','1',90);
    } else {
      disableOrange();
      setCookie('option-orange','0',90);
    }
  });

  function initOrange() {
    $("body").addClass('orange-active');
    $(".intro__anim").addClass('orange-bg');
  }
  function disableOrange() {
    $("body").removeClass('orange-active');
    $(".intro__anim").removeClass('orange-bg');
  }



  $('#generalLight').on('input', function (){
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie('generalLight-value',value.toString(),90);

    let rgbResult = getColor(value, [180, 180, 180], [226, 226, 226], [255, 255, 255]);
    setRootStyle('--light-theme-bg', rgbResult);
    setCookie('color-light-theme-bg',rgbResult,90);

    let rgbResult2 = getColor(value, [50, 50, 50], [33, 33, 33], [0, 0, 0]);
    setRootStyle('--dark-theme-bg', rgbResult2);
    setCookie('dark-theme-bg',rgbResult2,90);
  });

  $('#accentLight').on('input', function (){
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie('accentLight-value',value.toString(),90);

    let rgbResult = getColor(value, [255, 186, 160], [245, 95, 36], [255, 72, 0]);
    setRootStyle('--orange-theme', rgbResult);
    setCookie('color-orange-theme',rgbResult,90);
  });

  $('#fontBrightness').on('input', function (){
    let value = Math.max(0, Math.min(100, $(this).val()));
    setCookie('fontBrightness-value',value.toString(),90);

    let rgbResult = getColor(value, [150, 150, 150], [33, 33, 33], [0, 0, 0]);
    setRootStyle('--light-theme-dark-text', rgbResult);
    setCookie('color-light-theme-dark-text',rgbResult,90);

    let rgbResult2 = getColor(value, [100, 100, 100], [219, 219, 219], [255, 255, 255]);
    setRootStyle('--dark-theme-light-text', rgbResult2);
    setCookie('color-dark-theme-light-text',rgbResult2,90);
  });


  let darkOption = getCookie('option-dark');
  if (darkOption && darkOption === '0') {
    $darkModeToggle.prop('checked', false);
    disableDark();
  } else {
    $darkModeToggle.prop('checked', true);
    initDark();
  }

  let orangeOption = getCookie('option-orange');
  if (orangeOption && orangeOption === '0') {
    $orangeThemeToggle.prop('checked', false);
    disableOrange();
  } else {
    $orangeThemeToggle.prop('checked', true);
    initOrange();
  }

  let generalLightValue = getCookie('generalLight-value');
  if (generalLightValue) {
    $('#generalLight').val(parseInt(generalLightValue));
  }

  let accentColorValue = getCookie('accentLight-value');
  if (accentColorValue) {
    $('#accentLight').val(parseInt(accentColorValue));
  }

  let fontColorValue = getCookie('fontBrightness-value');
  if (fontColorValue) {
    $('#fontBrightness').val(parseInt(fontColorValue));
  }


  let generalLight1 = getCookie('color-light-theme-bg');
  if (generalLight1) {
    setRootStyle('--light-theme-bg', generalLight1);
  }
  let generalLight2 = getCookie('dark-theme-bg');
  if (generalLight2) {
    setRootStyle('--dark-theme-bg', generalLight2);
  }

  let accentColor = getCookie('color-orange-theme');
  if (accentColor) {
    setRootStyle('--orange-theme', accentColor);
  }

  let fontColor1 = getCookie('color-light-theme-dark-text');
  if (fontColor1) {
    setRootStyle('--light-theme-dark-text', fontColor1);
  }
  let fontColor2 = getCookie('color-dark-theme-light-text');
  if (fontColor2) {
    setRootStyle('--dark-theme-light-text', fontColor2);
  }

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
  return`rgb(${rgbResult[0]}, ${rgbResult[1]}, ${rgbResult[2]})`;
}

function setRootStyle(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

function uncheckAndTriggerChange(checkboxId) {
  var $checkbox = $(checkboxId);
  $checkbox.prop('checked', false).trigger('change');
}


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}