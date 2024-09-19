$(document).ready(function () {
  const $projectItems = $(".list-projects__name");

  $projectItems.on("mouseover", function () {
    const $currentProject = $(this);
    $projectItems.removeClass("hovered");
    $currentProject.addClass("hovered");
  });
});
