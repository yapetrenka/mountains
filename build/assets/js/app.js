$(function(){
    'use strict';

    $('body').on('click', '#auth_flip', function(){
        $(this).addClass('auth-top__btn_hidden');
        $('.welcome').addClass('flip');
        return false;
    });

    $('body').on('click', '#menu_btn', function(){
        $(this).children().toggleClass('active');
        $('#menu').toggleClass('active');
        $('.main-container').toggleClass('one-screen');
        return false;
    });

    $('body').on('click', '#on_main', function(){
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        return false;
    });

    $('body').on('click', '#next_screen', function(){
        var scroll = $('.main').offset().top;
        $('body,html').animate({
            scrollTop: scroll
        }, 'slow');
        return false;
    });

    $('body').on('click', '#go_up', function(){
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcjYXV0aF9mbGlwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhdXRoLXRvcF9fYnRuX2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lJykuYWRkQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJyNtZW51X2J0bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjbWVudScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcubWFpbi1jb250YWluZXInKS50b2dnbGVDbGFzcygnb25lLXNjcmVlbicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnI29uX21haW4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJyNhdXRoX2ZsaXAnKS5yZW1vdmVDbGFzcygnYXV0aC10b3BfX2J0bl9oaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZScpLnJlbW92ZUNsYXNzKCdmbGlwJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcjbmV4dF9zY3JlZW4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKCcubWFpbicpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxcclxuICAgICAgICB9LCAnc2xvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnI2dvX3VwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSwgJ3Nsb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
