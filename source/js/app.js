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