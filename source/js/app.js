$(function(){
    'use strict';

    // ------------------------------
    // Preloader
    // ------------------------------

    $(function(){

        var imgs = [];

        //$('*').each(function(){});

        $.each($('*'), function(){
            var $this = $(this),
                background = $this.css('background-image'),
                img = $this.is('img');

            if (background != 'none') {
                var path = background.replace('url("', '').replace('")', '');
                //console.log(path);

                imgs.push(path);
            }

            if (img) {
                var path = $this.attr('src');

                if (path) {
                    imgs.push(path);
                }
            }
        });

        var persents = 1;

        for (var i= 0; i<imgs.length; i++) {
            var image = $('<img>', {
                src : imgs[i],
                height : 50
            });

            image.insertBefore('.loader-images');
            //console.log(i + ' detected');

            image.load(function(){
                //console.log(persents + ' loaded');
                setPercents(imgs.length, persents);
                persents++;
            });
        }

        function setPercents(total, current) {
            var percent = Math.ceil(current / total * 100);

            if (percent >= 100) {
                $('.main-container').addClass('loaded');
            }

            $('.loader-bar').css({
                'width' : percent + '%'
            }).text(percent + '%');
        }

        //console.log(imgs.length);
        //console.log(imgs);

    });

    // ------------------------------
    // Blog
    // ------------------------------

    if ($(".blog-nav").length) {

        $(document).on('click', '#blog_nav_tggl', function(){
            $('.blog-nav').toggleClass('open');
            return false;
        });

        var lastId,
            menu = $('.blog-nav__list'),
            menuItems = menu.find('.blog-nav__link'),
            scrollItems = menuItems.map(function(){
                var id = $(this).attr("href").replace('#','');
                var item = $('.blog__item[data-id="'+id+'"]');
                if (item.length) return item;
            });

        menuItems.click(function(e){
            var id = $(this).attr("href").replace('#',''),
                offsetTop = (id === "") ? 0 : $('.blog__item[data-id="'+id+'"]').offset().top-60;

            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 700, "swing");
            e.preventDefault();
        });

        $(window).scroll(function() {
            var sidebar = $('.blog-section__left'),
                wScroll = $(window).scrollTop(),
                wHeight = $(window).height(),
                sidebarTop = sidebar.offset().top,
                current = scrollItems.map(function(){
                    if (($(this).offset().top < wScroll+wHeight/3) || ($(this).offset().top+$(this).height() < wScroll+wHeight-200))
                        return this;
                });
            console.log($('*[data-id="post1"]').offset().top)
            current = current[current.length-1];
            //var id = current && current.length ? current[0].id : "";
            var id = current && current.length ? current[0].getAttribute('data-id') : "";


            if (lastId !== id && id!='') {
                lastId = id;
                menuItems.removeClass("blog-nav__link_active").filter("[href=#"+id+"]").addClass("blog-nav__link_active");
            }

            if (wScroll > sidebarTop) {
                menu.css('top', wScroll-sidebarTop);
            } else {
                menu.css('top', 0);
            }

        });


    }

    if($(".blog-navigation").length){
        $(".blog-navigation__toggle").click(function(){
            $(".blog-navigation").toggleClass("active");
        });

        var lastId,
            menu = $(".blog-navigation"),
            menuItems = menu.find("li a"),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) return item;
            });

        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = (href === "#") ? 0 : $(href).offset().top-60;

            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 700, "swing");
            e.preventDefault();
        });

        $(window).scroll(function() {
            var fromTop = $(this).scrollTop(),
                blogNavOffset = $(".blog-navigation").offset().top,
                blogNavLimit = $(".footer__wrapper").offset().top - $(".blog-navigation__wrapper").outerHeight(),
                current = scrollItems.map(function(){
                    if ($(this).offset().top < fromTop+144)
                        return this;
                });

            current = current[current.length-1];
            var id = current && current.length ? current[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems.removeClass("active").filter("[href=#"+id+"]").addClass("active");
            }

            if(fromTop >= blogNavLimit && $(window).width() > (768 - scrollBarWidth)) {
                $(".blog-navigation__wrapper").css({"position":"absolute", "top":blogNavLimit + "px"});
            } else if (fromTop >= blogNavOffset && $(window).width() > (768 - scrollBarWidth)) {
                $(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
                $(".blog-navigation__wrapper").addClass("nav-fixed");
            } else {
                $(".blog-navigation__wrapper").css({"position":"relative"});
                $(".blog-navigation__wrapper").removeClass("nav-fixed");
            }

        });

        $(window).resize(function() {
            if($(window).width() <= (768 - scrollBarWidth)){
                $(".blog-navigation__wrapper").removeClass("nav-fixed");
                $(".blog-navigation__wrapper").css({"position":"relative"});
            } else {
                if($("body").scrollTop() >= $(".blog").offset().top){
                    $(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
                    $(".blog-navigation__wrapper").addClass("nav-fixed");
                }
            }
        });
    }

    // ------------------------------
    // Slider
    // ------------------------------

    (function () {
        var slider = $('.slider'),
            prevControls = slider.find('.slider__controls-item[data-direction="prev"]'),
            nextControls = slider.find('.slider__controls-item[data-direction="next"]'),
            activeSlideID,
            activeSlide = $('.slider__info-item.active'),
            lastSlideID = $('.slider__info-item:last-child').data('project'),
            firstSlideID = $('.slider__info-item:first-child').data('project'),
            prevSlideID = activeSlide.prev().data('project') ? activeSlide.prev().data('project') : lastSlideID,
            nextSlideID = activeSlide.next().data('project') ? activeSlide.next().data('project') : firstSlideID;

        nextControls.children('.slider__thumbs').html(prevControls.children('.slider__thumbs').html());
        prevControls.find('.slider__thumbs-item[data-project="'+prevSlideID+'"]').addClass('active');
        nextControls.find('.slider__thumbs-item[data-project="'+nextSlideID+'"]').addClass('active');

        $('.slider__controls-btn').on('click', function(e){
            e.preventDefault();

            var $this = $(this),
                direction = $this.closest('.slider__controls-item').data('direction');

            prevSlideID = $('.slider__info-item.active').prev().data('project') ? $('.slider__info-item.active').prev().data('project') : lastSlideID;
            nextSlideID = $('.slider__info-item.active').next().data('project') ? $('.slider__info-item.active').next().data('project') : firstSlideID;

            $('.slider__info-item.active').removeClass('active');
            $('.slider__thumbs-item.active').removeClass('active');

            if (direction=='prev') {
                activeSlideID = prevSlideID;
            } else {
                activeSlideID = nextSlideID;
            }

            $('.slider__info-item[data-project="'+activeSlideID+'"]').addClass('active');
            $('.slider__display-img').attr('src', $('.slider__info-item[data-project="'+activeSlideID+'"]').data('img'));

            prevSlideID = $('.slider__info-item.active').prev().data('project') ? $('.slider__info-item.active').prev().data('project') : lastSlideID;
            nextSlideID = $('.slider__info-item.active').next().data('project') ? $('.slider__info-item.active').next().data('project') : firstSlideID;

            prevControls.find('.slider__thumbs-item[data-project="'+(prevSlideID)+'"]').addClass('active');
            nextControls.find('.slider__thumbs-item[data-project="'+(nextSlideID)+'"]').addClass('active');

        });

    }());


    // ------------------------------
    // Panel blur background-position
    // ------------------------------

    function blurBg(){
        var section = $('.section-blur'),
            panel = section.find('.panel-blur'),
            posTop = $('.feedback').position().top,
            posLeft = $('.feedback .panel').offset().left;
        panel.css({
            'height' : section.innerHeight(),
            'width' : section.width(),
            'top' : - posTop,
            'left' : - posLeft,
        });
    };

    if ($('.feedback').length) {
        $(window).load(function () {
            blurBg();
        });

        $(window).resize(function () {
            blurBg();
        });
    }


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

    // ------------------------------
    // Google maps
    // ------------------------------

    if ($('#contacts_map').length) {
        function initialize() {
            // Create an array of styles.
            var styles = [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e0efef"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#1900ff"
                        },
                        {
                            "color": "#baf2ea"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 700
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#61dac9"
                        }
                    ]
                }
            ];

            var styledMap = new google.maps.StyledMapType(styles,
                {name: 'Styled Map'});
            var mapOptions = {
                zoom: 14,
                scrollwheel:false,
                center: new google.maps.LatLng(55.741429130318046,37.55778944421384),
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            var map = new google.maps.Map(document.getElementById('contacts_map'),
                mapOptions);
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            setMarkers(map, places);
        }
        var places = [
            ['me',55.742833277262136, 37.58843099999998]
        ];
        function setMarkers(map, locations) {
            //Определяем область показа маркеров
            var latlngbounds = new google.maps.LatLngBounds();
            var image = new google.maps.MarkerImage('./assets/img/icons//map_marker.svg',
                new google.maps.Size(30, 40),
                new google.maps.Point(0,0),
                new google.maps.Point(15, 40));
            for (var i = 0; i < places.length; i++) {
                var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                //Добавляем координаты маркера в область
                latlngbounds.extend(myLatLng);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    title: locations[i][0],
                });
            }
            //Центрируем и масштабируем карту
            //map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    };

});