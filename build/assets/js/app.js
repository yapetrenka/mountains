$(function(){
    'use strict';
    $('body').on('click', '#auth_flip', function(){
        $(this).addClass('auth-top__btn_hidden');
        $('.welcome').addClass('flip');
        return false;
    });
    $('body').on('click', '#on_main', function(){
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        return false;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJyNhdXRoX2ZsaXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2F1dGgtdG9wX19idG5faGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWUnKS5hZGRDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcjb25fbWFpbicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnI2F1dGhfZmxpcCcpLnJlbW92ZUNsYXNzKCdhdXRoLXRvcF9fYnRuX2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lJykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
