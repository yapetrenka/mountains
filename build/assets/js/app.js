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

    $(document).click(function(e){
        if($(e.target).closest('.welcome').hasClass('flip')) return;
        $('#auth_flip').removeClass('auth-top__btn_hidden');
        $('.welcome').removeClass('flip');
        e.stopPropagation();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUHJlbG9hZGVyXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgICAgIC8vJCgnKicpLmVhY2goZnVuY3Rpb24oKXt9KTtcclxuXHJcbiAgICAgICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGltZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcGVyc2VudHMgPSAxO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpPSAwOyBpPGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICBzcmMgOiBpbWdzW2ldLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0IDogNTBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5pbnNlcnRCZWZvcmUoJy5sb2FkZXItaW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSArICcgZGV0ZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLmxvYWQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGVyc2VudHMgKyAnIGxvYWRlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcnNlbnRzKTtcclxuICAgICAgICAgICAgICAgIHBlcnNlbnRzKys7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLm1haW4tY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcubG9hZGVyLWJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnIDogcGVyY2VudCArICclJ1xyXG4gICAgICAgICAgICB9KS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdzLmxlbmd0aCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpbWdzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEJsb2dcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGlmICgkKFwiLmJsb2ctbmF2XCIpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2Jsb2dfbmF2X3RnZ2wnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcuYmxvZy1uYXYnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBsYXN0SWQsXHJcbiAgICAgICAgICAgIG1lbnUgPSAkKCcuYmxvZy1uYXZfX2xpc3QnKSxcclxuICAgICAgICAgICAgbWVudUl0ZW1zID0gbWVudS5maW5kKCcuYmxvZy1uYXZfX2xpbmsnKSxcclxuICAgICAgICAgICAgc2Nyb2xsSXRlbXMgPSBtZW51SXRlbXMubWFwKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpLnJlcGxhY2UoJyMnLCcnKTtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gJCgnLmJsb2dfX2l0ZW1bZGF0YS1pZD1cIicraWQrJ1wiXScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGVuZ3RoKSByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lbnVJdGVtcy5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKS5yZXBsYWNlKCcjJywnJyksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAoaWQgPT09IFwiXCIpID8gMCA6ICQoJy5ibG9nX19pdGVtW2RhdGEtaWQ9XCInK2lkKydcIl0nKS5vZmZzZXQoKS50b3AtNjA7XHJcblxyXG4gICAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldFRvcFxyXG4gICAgICAgICAgICB9LCA3MDAsIFwic3dpbmdcIik7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNpZGViYXIgPSAkKCcuYmxvZy1zZWN0aW9uX19sZWZ0JyksXHJcbiAgICAgICAgICAgICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgIHNpZGViYXJUb3AgPSBzaWRlYmFyLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzY3JvbGxJdGVtcy5tYXAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKCQodGhpcykub2Zmc2V0KCkudG9wIDwgd1Njcm9sbCt3SGVpZ2h0LzMpIHx8ICgkKHRoaXMpLm9mZnNldCgpLnRvcCskKHRoaXMpLmhlaWdodCgpIDwgd1Njcm9sbCt3SGVpZ2h0LTIwMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQoJypbZGF0YS1pZD1cInBvc3QxXCJdJykub2Zmc2V0KCkudG9wKVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtjdXJyZW50Lmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgLy92YXIgaWQgPSBjdXJyZW50ICYmIGN1cnJlbnQubGVuZ3RoID8gY3VycmVudFswXS5pZCA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGN1cnJlbnQgJiYgY3VycmVudC5sZW5ndGggPyBjdXJyZW50WzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpIDogXCJcIjtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdElkICE9PSBpZCAmJiBpZCE9JycpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RJZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1zLnJlbW92ZUNsYXNzKFwiYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpLmZpbHRlcihcIltocmVmPSNcIitpZCtcIl1cIikuYWRkQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh3U2Nyb2xsID4gc2lkZWJhclRvcCkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5jc3MoJ3RvcCcsIHdTY3JvbGwtc2lkZWJhclRvcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZigkKFwiLmJsb2ctbmF2aWdhdGlvblwiKS5sZW5ndGgpe1xyXG4gICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX190b2dnbGVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25cIikudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBsYXN0SWQsXHJcbiAgICAgICAgICAgIG1lbnUgPSAkKFwiLmJsb2ctbmF2aWdhdGlvblwiKSxcclxuICAgICAgICAgICAgbWVudUl0ZW1zID0gbWVudS5maW5kKFwibGkgYVwiKSxcclxuICAgICAgICAgICAgc2Nyb2xsSXRlbXMgPSBtZW51SXRlbXMubWFwKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9ICQoJCh0aGlzKS5hdHRyKFwiaHJlZlwiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZW5ndGgpIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVudUl0ZW1zLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIiksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgPSAoaHJlZiA9PT0gXCIjXCIpID8gMCA6ICQoaHJlZikub2Zmc2V0KCkudG9wLTYwO1xyXG5cclxuICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXRUb3BcclxuICAgICAgICAgICAgfSwgNzAwLCBcInN3aW5nXCIpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmcm9tVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgIGJsb2dOYXZPZmZzZXQgPSAkKFwiLmJsb2ctbmF2aWdhdGlvblwiKS5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICBibG9nTmF2TGltaXQgPSAkKFwiLmZvb3Rlcl9fd3JhcHBlclwiKS5vZmZzZXQoKS50b3AgLSAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHNjcm9sbEl0ZW1zLm1hcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLm9mZnNldCgpLnRvcCA8IGZyb21Ub3ArMTQ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGN1cnJlbnQgJiYgY3VycmVudC5sZW5ndGggPyBjdXJyZW50WzBdLmlkIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0SWQgIT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0SWQgPSBpZDtcclxuICAgICAgICAgICAgICAgIG1lbnVJdGVtcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5maWx0ZXIoXCJbaHJlZj0jXCIraWQrXCJdXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihmcm9tVG9wID49IGJsb2dOYXZMaW1pdCAmJiAkKHdpbmRvdykud2lkdGgoKSA+ICg3NjggLSBzY3JvbGxCYXJXaWR0aCkpIHtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLmNzcyh7XCJwb3NpdGlvblwiOlwiYWJzb2x1dGVcIiwgXCJ0b3BcIjpibG9nTmF2TGltaXQgKyBcInB4XCJ9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmcm9tVG9wID49IGJsb2dOYXZPZmZzZXQgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAoNzY4IC0gc2Nyb2xsQmFyV2lkdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwidG9wXCI6MH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikuYWRkQ2xhc3MoXCJuYXYtZml4ZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCJ9KTtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwibmF2LWZpeGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8PSAoNzY4IC0gc2Nyb2xsQmFyV2lkdGgpKXtcclxuICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLnJlbW92ZUNsYXNzKFwibmF2LWZpeGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5ibG9nLW5hdmlnYXRpb25fX3dyYXBwZXJcIikuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwifSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZigkKFwiYm9keVwiKS5zY3JvbGxUb3AoKSA+PSAkKFwiLmJsb2dcIikub2Zmc2V0KCkudG9wKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmJsb2ctbmF2aWdhdGlvbl9fd3JhcHBlclwiKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwidG9wXCI6MH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYmxvZy1uYXZpZ2F0aW9uX193cmFwcGVyXCIpLmFkZENsYXNzKFwibmF2LWZpeGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBTbGlkZXJcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNsaWRlciA9ICQoJy5zbGlkZXInKSxcclxuICAgICAgICAgICAgcHJldkNvbnRyb2xzID0gc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2NvbnRyb2xzLWl0ZW1bZGF0YS1kaXJlY3Rpb249XCJwcmV2XCJdJyksXHJcbiAgICAgICAgICAgIG5leHRDb250cm9scyA9IHNsaWRlci5maW5kKCcuc2xpZGVyX19jb250cm9scy1pdGVtW2RhdGEtZGlyZWN0aW9uPVwibmV4dFwiXScpLFxyXG4gICAgICAgICAgICBhY3RpdmVTbGlkZUlELFxyXG4gICAgICAgICAgICBhY3RpdmVTbGlkZSA9ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgbGFzdFNsaWRlSUQgPSAkKCcuc2xpZGVyX19pbmZvLWl0ZW06bGFzdC1jaGlsZCcpLmRhdGEoJ3Byb2plY3QnKSxcclxuICAgICAgICAgICAgZmlyc3RTbGlkZUlEID0gJCgnLnNsaWRlcl9faW5mby1pdGVtOmZpcnN0LWNoaWxkJykuZGF0YSgncHJvamVjdCcpLFxyXG4gICAgICAgICAgICBwcmV2U2xpZGVJRCA9IGFjdGl2ZVNsaWRlLnByZXYoKS5kYXRhKCdwcm9qZWN0JykgPyBhY3RpdmVTbGlkZS5wcmV2KCkuZGF0YSgncHJvamVjdCcpIDogbGFzdFNsaWRlSUQsXHJcbiAgICAgICAgICAgIG5leHRTbGlkZUlEID0gYWN0aXZlU2xpZGUubmV4dCgpLmRhdGEoJ3Byb2plY3QnKSA/IGFjdGl2ZVNsaWRlLm5leHQoKS5kYXRhKCdwcm9qZWN0JykgOiBmaXJzdFNsaWRlSUQ7XHJcblxyXG4gICAgICAgIG5leHRDb250cm9scy5jaGlsZHJlbignLnNsaWRlcl9fdGh1bWJzJykuaHRtbChwcmV2Q29udHJvbHMuY2hpbGRyZW4oJy5zbGlkZXJfX3RodW1icycpLmh0bWwoKSk7XHJcbiAgICAgICAgcHJldkNvbnRyb2xzLmZpbmQoJy5zbGlkZXJfX3RodW1icy1pdGVtW2RhdGEtcHJvamVjdD1cIicrcHJldlNsaWRlSUQrJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBuZXh0Q29udHJvbHMuZmluZCgnLnNsaWRlcl9fdGh1bWJzLWl0ZW1bZGF0YS1wcm9qZWN0PVwiJytuZXh0U2xpZGVJRCsnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAkKCcuc2xpZGVyX19jb250cm9scy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICR0aGlzLmNsb3Nlc3QoJy5zbGlkZXJfX2NvbnRyb2xzLWl0ZW0nKS5kYXRhKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIHByZXZTbGlkZUlEID0gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLnByZXYoKS5kYXRhKCdwcm9qZWN0JykgPyAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJykucHJldigpLmRhdGEoJ3Byb2plY3QnKSA6IGxhc3RTbGlkZUlEO1xyXG4gICAgICAgICAgICBuZXh0U2xpZGVJRCA9ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5uZXh0KCkuZGF0YSgncHJvamVjdCcpID8gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLm5leHQoKS5kYXRhKCdwcm9qZWN0JykgOiBmaXJzdFNsaWRlSUQ7XHJcblxyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX190aHVtYnMtaXRlbS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uPT0ncHJldicpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlSUQgPSBwcmV2U2xpZGVJRDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlSUQgPSBuZXh0U2xpZGVJRDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9faW5mby1pdGVtW2RhdGEtcHJvamVjdD1cIicrYWN0aXZlU2xpZGVJRCsnXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19kaXNwbGF5LWltZycpLmF0dHIoJ3NyYycsICQoJy5zbGlkZXJfX2luZm8taXRlbVtkYXRhLXByb2plY3Q9XCInK2FjdGl2ZVNsaWRlSUQrJ1wiXScpLmRhdGEoJ2ltZycpKTtcclxuXHJcbiAgICAgICAgICAgIHByZXZTbGlkZUlEID0gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLnByZXYoKS5kYXRhKCdwcm9qZWN0JykgPyAkKCcuc2xpZGVyX19pbmZvLWl0ZW0uYWN0aXZlJykucHJldigpLmRhdGEoJ3Byb2plY3QnKSA6IGxhc3RTbGlkZUlEO1xyXG4gICAgICAgICAgICBuZXh0U2xpZGVJRCA9ICQoJy5zbGlkZXJfX2luZm8taXRlbS5hY3RpdmUnKS5uZXh0KCkuZGF0YSgncHJvamVjdCcpID8gJCgnLnNsaWRlcl9faW5mby1pdGVtLmFjdGl2ZScpLm5leHQoKS5kYXRhKCdwcm9qZWN0JykgOiBmaXJzdFNsaWRlSUQ7XHJcblxyXG4gICAgICAgICAgICBwcmV2Q29udHJvbHMuZmluZCgnLnNsaWRlcl9fdGh1bWJzLWl0ZW1bZGF0YS1wcm9qZWN0PVwiJysocHJldlNsaWRlSUQpKydcIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIG5leHRDb250cm9scy5maW5kKCcuc2xpZGVyX190aHVtYnMtaXRlbVtkYXRhLXByb2plY3Q9XCInKyhuZXh0U2xpZGVJRCkrJ1wiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSgpKTtcclxuXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQYW5lbCBibHVyIGJhY2tncm91bmQtcG9zaXRpb25cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGZ1bmN0aW9uIGJsdXJCZygpe1xyXG4gICAgICAgIHZhciBzZWN0aW9uID0gJCgnLnNlY3Rpb24tYmx1cicpLFxyXG4gICAgICAgICAgICBwYW5lbCA9IHNlY3Rpb24uZmluZCgnLnBhbmVsLWJsdXInKSxcclxuICAgICAgICAgICAgcG9zVG9wID0gJCgnLmZlZWRiYWNrJykucG9zaXRpb24oKS50b3AsXHJcbiAgICAgICAgICAgIHBvc0xlZnQgPSAkKCcuZmVlZGJhY2sgLnBhbmVsJykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICBwYW5lbC5jc3Moe1xyXG4gICAgICAgICAgICAnaGVpZ2h0JyA6IHNlY3Rpb24uaW5uZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgJ3dpZHRoJyA6IHNlY3Rpb24ud2lkdGgoKSxcclxuICAgICAgICAgICAgJ3RvcCcgOiAtIHBvc1RvcCxcclxuICAgICAgICAgICAgJ2xlZnQnIDogLSBwb3NMZWZ0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoJCgnLmZlZWRiYWNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBibHVyQmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGJsdXJCZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2F1dGhfZmxpcCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYXV0aC10b3BfX2J0bl9oaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZScpLmFkZENsYXNzKCdmbGlwJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNtZW51X2J0bicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjbWVudScpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcubWFpbi1jb250YWluZXInKS50b2dnbGVDbGFzcygnb25lLXNjcmVlbicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjb25fbWFpbicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnI2F1dGhfZmxpcCcpLnJlbW92ZUNsYXNzKCdhdXRoLXRvcF9fYnRuX2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lJykucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBpZigkKGUudGFyZ2V0KS5jbG9zZXN0KCcud2VsY29tZScpLmhhc0NsYXNzKCdmbGlwJykpIHJldHVybjtcclxuICAgICAgICAkKCcjYXV0aF9mbGlwJykucmVtb3ZlQ2xhc3MoJ2F1dGgtdG9wX19idG5faGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWUnKS5yZW1vdmVDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI25leHRfc2NyZWVuJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2Nyb2xsID0gJCgnLm1haW4nKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsXHJcbiAgICAgICAgfSwgJ3Nsb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2dvX3VwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSwgJ3Nsb3cnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEdvb2dsZSBtYXBzXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBpZiAoJCgnI2NvbnRhY3RzX21hcCcpLmxlbmd0aCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBzdHlsZXMuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNlMGVmZWZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHVlXCI6IFwiIzE5MDBmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYmFmMmVhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LmxpbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDcwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MWRhYzlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiAnU3R5bGVkIE1hcCd9KTtcclxuICAgICAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB6b29tOiAxNCxcclxuICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc0MTQyOTEzMDMxODA0NiwzNy41NTc3ODk0NDQyMTM4NCksXHJcbiAgICAgICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXBUeXBlSWRzOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdtYXBfc3R5bGUnXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdHNfbWFwJyksXHJcbiAgICAgICAgICAgICAgICBtYXBPcHRpb25zKTtcclxuICAgICAgICAgICAgbWFwLm1hcFR5cGVzLnNldCgnbWFwX3N0eWxlJywgc3R5bGVkTWFwKTtcclxuICAgICAgICAgICAgbWFwLnNldE1hcFR5cGVJZCgnbWFwX3N0eWxlJyk7XHJcbiAgICAgICAgICAgIHNldE1hcmtlcnMobWFwLCBwbGFjZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGxhY2VzID0gW1xyXG4gICAgICAgICAgICBbJ21lJyw1NS43NDI4MzMyNzcyNjIxMzYsIDM3LjU4ODQzMDk5OTk5OTk4XVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0TWFya2VycyhtYXAsIGxvY2F0aW9ucykge1xyXG4gICAgICAgICAgICAvL9Ce0L/RgNC10LTQtdC70Y/QtdC8INC+0LHQu9Cw0YHRgtGMINC/0L7QutCw0LfQsCDQvNCw0YDQutC10YDQvtCyXHJcbiAgICAgICAgICAgIHZhciBsYXRsbmdib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZSgnLi9hc3NldHMvaW1nL2ljb25zLy9tYXBfbWFya2VyLnN2ZycsXHJcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgzMCwgNDApLFxyXG4gICAgICAgICAgICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsMCksXHJcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMTUsIDQwKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXlMYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXVsxXSwgbG9jYXRpb25zW2ldWzJdKTtcclxuICAgICAgICAgICAgICAgIC8v0JTQvtCx0LDQstC70Y/QtdC8INC60L7QvtGA0LTQuNC90LDRgtGLINC80LDRgNC60LXRgNCwINCyINC+0LHQu9Cw0YHRgtGMXHJcbiAgICAgICAgICAgICAgICBsYXRsbmdib3VuZHMuZXh0ZW5kKG15TGF0TG5nKTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbXlMYXRMbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGxvY2F0aW9uc1tpXVswXSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v0KbQtdC90YLRgNC40YDRg9C10Lwg0Lgg0LzQsNGB0YjRgtCw0LHQuNGA0YPQtdC8INC60LDRgNGC0YNcclxuICAgICAgICAgICAgLy9tYXAuc2V0Q2VudGVyKCBsYXRsbmdib3VuZHMuZ2V0Q2VudGVyKCksIG1hcC5maXRCb3VuZHMobGF0bG5nYm91bmRzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0aWFsaXplKTtcclxuICAgIH07XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
