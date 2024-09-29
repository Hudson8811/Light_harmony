$(document).ready(function(){
    $(".up-click").click(function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});