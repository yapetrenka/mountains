$(function(){
    'use strict';

    $(document).on('click', '#auth_flip', function(){
        $(this).addClass('auth-top__btn_hidden');
        $('.welcome').addClass('flip');
        return false;
    });

    $(document).on('click', '#menu_btn', function(){
        $(this).children().toggleClass('active');
        $('#menu').toggleClass('active');
        $('.main-container').toggleClass('one-screen');
        return false;
    });

    $(document).on('click', '#on_main', function(){
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        return false;
    });

    $(document).on('click', '#next_screen', function(){
        var scroll = $('.main').offset().top;
        $('body,html').animate({
            scrollTop: scroll
        }, 'slow');
        return false;
    });

    $(document).on('click', '#go_up', function(){
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });
    
    $(document).on('click', '#blog_nav_tggl', function(){
        $('.blog-nav').toggleClass('open');
        return false;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjYXV0aF9mbGlwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhdXRoLXRvcF9fYnRuX2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lJykuYWRkQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI21lbnVfYnRuJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNtZW51JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJy5tYWluLWNvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdvbmUtc2NyZWVuJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNvbl9tYWluJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcjYXV0aF9mbGlwJykucmVtb3ZlQ2xhc3MoJ2F1dGgtdG9wX19idG5faGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWUnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjbmV4dF9zY3JlZW4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKCcubWFpbicpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxcclxuICAgICAgICB9LCAnc2xvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjZ29fdXAnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9LCAnc2xvdycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2Jsb2dfbmF2X3RnZ2wnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy5ibG9nLW5hdicpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
