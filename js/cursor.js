$(document).ready(function() {
    $(document).mousemove(function(e) {
        $('#followBig, #followSmall').css({
            left: e.pageX,
            top: e.pageY
        });
    });
});