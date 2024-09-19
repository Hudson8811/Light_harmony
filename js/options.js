$(document).ready(function () {
  const $darkModeToggle = $("#darkMode");
  const $orangeThemeToggle = $("#orangeTheme");
  const $animationToggle = $("#animation");

  const $headerOptions = $("#headerOptions");
  const $headerOptionsBtn1 = $("#headerOptionsBtn1");
  const $headerOptionsBtn2 = $("#headerOptionsBtn2");

  $headerOptionsBtn1.on("click", function () {
    $headerOptions.toggleClass("show");
  });
  $headerOptionsBtn2.on("click", function () {
    $headerOptions.toggleClass("show");
  });

  $darkModeToggle.on("change", function () {
    if ($darkModeToggle.is(":checked")) {
      $("body").css({
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
      });
    } else {
      $("body").css({
        backgroundColor: "#fff",
        color: "#212121",
      });
    }
  });

  $orangeThemeToggle.on("change", function () {
    if ($orangeThemeToggle.is(":checked")) {
      $(".intro__anim").css({
        backgroundColor: "#F55F23",
      });
    } else {
      $(".intro__anim").css({
        backgroundColor: "transparent",
      });
    }
  });

  $animationToggle.on("change", function () {
    if ($animationToggle.is(":checked")) {
      alert("Animation Enabled");
    } else {
      alert("Animation Disabled");
    }
  });
});
