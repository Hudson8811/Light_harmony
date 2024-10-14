$(document).ready(function () {
  const $projectItems = $(".list-projects__name");

  if ($projectItems.length > 0) {
    $projectItems.on("mouseover", function () {
      const $currentProject = $(this);
      $projectItems.removeClass("hovered");
      $currentProject.addClass("hovered");

      checkProjectImagePos();
    });

    /*$(window).on('scroll', function () {
      checkProjectImagePos();
    });*/

    function checkProjectImagePos() {
      let $image = $('.list-projects__name.hovered + .list-projects__image');
      if ($image.length > 0) {
        let imageHeight = $image.outerHeight();
        let windowHeight = $(window).height();
        let scrollTop = $(window).scrollTop();
        let titleHeight = $('.list-projects__name.hovered').outerHeight();
        let titleOffset = $('.list-projects__name.hovered').offset();
        if ($(window).width() >= 1920) {
          if (Math.floor(titleOffset.top + imageHeight) > Math.floor(scrollTop + windowHeight) ) {
            let overflow = Math.floor(titleOffset.top + imageHeight) - Math.floor(scrollTop + windowHeight);
            $image.css('transform', 'translateY(-' + overflow + 'px)').css('top', '').css('bottom','');
          } else {
            $image.css('top', '').css('bottom','').css('transform', '');
          }
        } else if ($(window).width() >= 1280)  {
          if (Math.floor(titleOffset.top + titleHeight + 25 + imageHeight) > Math.floor(scrollTop + windowHeight) ) {
            $image.css('top', 'auto').css('bottom','calc(100% + 25px)').css('transform', '');
          }  else {
            $image.css('top', '').css('bottom','').css('transform', '');
          }
        } else {
          $image.css('transform', '').css('top', '').css('bottom','');
        }
      }
    }
  }

});
