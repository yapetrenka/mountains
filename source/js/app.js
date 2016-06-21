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